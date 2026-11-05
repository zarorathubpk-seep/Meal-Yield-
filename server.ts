import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini client on server with mandatory User-Agent
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Multi-turn Chat API endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, userMessage, modelSelection, currentRecipe } = req.body;

      if (!userMessage && (!messages || messages.length === 0)) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Model selection matching requirements:
      // gemini-3.8-flash for general tasks (default)
      // gemini-3.1-flash-lite for fast tasks
      // gemini-4-argon for complex tasks
      let targetModel = 'gemini-3.8-flash';
      if (modelSelection === 'gemini-3.1-flash-lite' || modelSelection === 'fast') {
        targetModel = 'gemini-3.1-flash-lite';
      } else if (modelSelection === 'gemini-4-argon' || modelSelection === 'complex') {
        targetModel = 'gemini-4-argon';
      } else if (modelSelection && typeof modelSelection === 'string') {
        targetModel = modelSelection.replace(/^models\//, '');
      }

      const recipeContext = currentRecipe
        ? `\nCurrent Viewing Context: The user is currently reading the recipe "${currentRecipe.title}" (${currentRecipe.cuisine} cuisine, ${currentRecipe.servings} servings, prep: ${currentRecipe.prepTimeMinutes}m, cook: ${currentRecipe.cookTimeMinutes}m). Ingredients include: ${currentRecipe.ingredients?.slice(0, 10).map((i: any) => `${i.amount} ${i.unit} ${i.name}`).join(', ')}.`
        : '';

      const systemInstruction = `You are the "Meal Yield Sous Chef & Culinary Concierge", an expert culinary advisor and nutrition assistant for Meal Yield (mealyield.com).
Your role:
1. Guide home cooks through recipe scaling, ingredient substitutions, and precise cooking timing.
2. Demystify cooking science (the Maillard reaction, dum pukht steam trapping, starch gelatinization, oil vs water solubility of spices).
3. Offer practical, supportive nutrition and dietary advice (DASH low-sodium flavor tricks, diabetic-friendly resistant starch and plate balancing, protein optimization, halal, dairy-free, vegetarian).
4. Recommend delicious pairings and recipes from Meal Yield's 30 global recipes (Pakistani, Indian, Bangladeshi, Italian, British, American, and International cuisines).
${recipeContext}
Formatting:
- Be clear, friendly, and culinary-literate.
- Use clean Markdown with bullet points and bold highlights for temperatures, measurements, and key steps.
- Keep answers scannable and practical for someone actively cooking in the kitchen.`;

      // Build conversation history
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(messages)) {
        for (const msg of messages) {
          if (msg.role === 'user' || msg.role === 'model') {
            contents.push({
              role: msg.role,
              parts: [{ text: msg.content }],
            });
          }
        }
      }

      // Ensure the latest user message is at the end of the history
      const lastMsg = contents[contents.length - 1];
      if (userMessage && (!lastMsg || lastMsg.role !== 'user' || lastMsg.parts[0]?.text !== userMessage)) {
        contents.push({
          role: 'user',
          parts: [{ text: userMessage }],
        });
      }

      const callModel = async (modelName: string) => {
        return await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
      };

      let response;
      let actualModel = targetModel;

      try {
        if (targetModel === 'gemini-3.8-flash') {
          // Race against 7s timeout to gracefully recover from temporary 503 spikes
          response = await Promise.race([
            callModel('gemini-3.8-flash'),
            new Promise<never>((_, reject) =>
              setTimeout(() => reject(new Error('High demand temporary timeout')), 7000)
            ),
          ]);
        } else {
          response = await callModel(targetModel);
        }
      } catch (primaryErr: any) {
        console.warn(`Primary model ${targetModel} unavailable (${primaryErr?.message}). Falling back to gemini-3.1-flash-lite...`);
        actualModel = 'gemini-3.1-flash-lite';
        response = await callModel(actualModel);
      }

      return res.json({
        reply: response.text || 'I could not generate a response. Please try asking again.',
        modelUsed: actualModel,
      });
    } catch (err: any) {
      console.error('Gemini chat error:', err);
      const errorMessage = err?.message || 'Error communicating with Gemini';
      return res.status(500).json({ error: errorMessage });
    }
  });

  // Healthcheck
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Meal Yield server listening on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
