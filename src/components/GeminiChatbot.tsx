import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Minimize2,
  Maximize2,
  ChefHat,
  RotateCcw,
  Copy,
  Check,
  Zap,
  Cpu,
  Flame,
  ArrowDown,
} from 'lucide-react';
import { Recipe } from '../types/content';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface GeminiChatbotProps {
  currentRecipe?: Recipe | null;
}

type ModelTier = 'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon';

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({ currentRecipe }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelTier>('gemini-3.8-flash');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const initialWelcome = currentRecipe
    ? `Hello! I'm your **Meal Yield Sous Chef**. I see you're looking at **${currentRecipe.title}**!
Ask me about ingredient substitutions, how to scale it for a crowd, spice level adjustments, or cooking techniques!`
    : `Welcome to **Meal Yield**! I'm your AI Sous Chef powered by Gemini.
I can help you:
- **Scale recipes** and calculate proper cook times
- **Substitute ingredients** you don't have on hand
- **Explain culinary science** (Maillard sear, dum pukht steaming, emulsion)
- **Suggest balanced dinners** from our 30 world recipes

What are you cooking today?`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: initialWelcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.8-flash',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Adjust suggested questions when viewing a specific recipe
  const suggestedPrompts = currentRecipe
    ? [
        `How do I make ${currentRecipe.title} for 8 people?`,
        `What can I substitute for ${currentRecipe.ingredients[0]?.name || 'ghee'}?`,
        `How can I reduce the sodium in this dish?`,
        `What side dish pairs best with this?`,
      ]
    : [
        'How do I double a curry without ruining the flavor?',
        'How to cook basmati rice so grains stay separate?',
        'What are easy low-sodium flavor tricks?',
        'Suggest a high-protein dinner for tonight',
      ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Prepare history excluding welcome message
      const historyPayload = newMessages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: historyPayload,
          userMessage: text,
          modelSelection: selectedModel,
          currentRecipe: currentRecipe
            ? {
                title: currentRecipe.title,
                cuisine: currentRecipe.cuisine,
                servings: currentRecipe.servings,
                difficulty: currentRecipe.difficulty,
                prepTimeMinutes: currentRecipe.prepTimeMinutes,
                cookTimeMinutes: currentRecipe.cookTimeMinutes,
                ingredients: currentRecipe.ingredients.map((i) => ({
                  name: i.name,
                  amount: i.amount,
                  unit: i.unit,
                })),
              }
            : null,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply || 'Here is what I found for you.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed || selectedModel,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `I ran into an issue connecting to Gemini (${err.message || 'Network error'}). Please try again or check server logs.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content: initialWelcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel,
      },
    ]);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Render markdown formatting cleanly
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Headers (### or ##)
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-editorial font-bold text-[#143D2B] text-base mt-2 mb-1">
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-editorial font-bold text-[#143D2B] text-lg mt-3 mb-1">
            {line.replace('## ', '')}
          </h3>
        );
      }

      // Bullet items
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const cleanItem = line.trim().substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-xs sm:text-sm">
            <span className="text-[#C85A32] font-bold mt-0.5">•</span>
            <span dangerouslySetInnerHTML={{ __html: parseInlineStyles(cleanItem) }} />
          </div>
        );
      }

      // Numbered lists (e.g. 1. 2.)
      const matchNum = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (matchNum) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-xs sm:text-sm">
            <span className="text-[#C85A32] font-semibold font-mono text-xs">{matchNum[1]}.</span>
            <span dangerouslySetInnerHTML={{ __html: parseInlineStyles(matchNum[2]) }} />
          </div>
        );
      }

      // Standard paragraph
      return (
        <p
          key={idx}
          className="my-1 text-xs sm:text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parseInlineStyles(line) }}
        />
      );
    });
  };

  const parseInlineStyles = (text: string) => {
    // Bold **text**
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#143D2B]">$1</strong>');
    // Inline code `text`
    formatted = formatted.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 bg-stone-100 text-[#C85A32] font-mono text-[11px] rounded">$1</code>'
    );
    return formatted;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#143D2B] hover:bg-[#1E5E43] text-[#FAF7F2] rounded-full shadow-2xl hover:shadow-emerald-900/30 transition-all duration-300 hover:scale-105 border border-emerald-700/50"
          aria-label="Open Meal Yield AI Sous Chef"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-emerald-800/80 flex items-center justify-center border border-emerald-600/50">
              <ChefHat className="w-4 h-4 text-emerald-300" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#143D2B] animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="block text-xs font-bold tracking-wide">Meal Yield AI</span>
            <span className="block text-[10px] text-emerald-300/90 font-medium">Ask Sous Chef</span>
          </div>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className={`bg-white rounded-3xl shadow-2xl border border-[#EBE6DF] flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'fixed inset-4 sm:inset-10 z-50 rounded-2xl'
              : 'w-[92vw] sm:w-[440px] h-[580px] max-h-[85vh]'
          }`}
          style={{ boxShadow: '0 25px 50px -12px rgba(20, 61, 43, 0.25)' }}
        >
          {/* Header */}
          <div className="bg-[#143D2B] text-white px-5 py-3.5 flex items-center justify-between border-b border-emerald-800/60 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                <ChefHat className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-editorial text-base font-bold text-white tracking-wide">
                    Meal Yield Sous Chef
                  </h3>
                  <span className="px-1.5 py-0.5 bg-emerald-800 text-[9px] font-semibold uppercase tracking-wider text-emerald-200 rounded">
                    Gemini 3.8
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/80">
                  {currentRecipe ? `Context: ${currentRecipe.title.substring(0, 24)}...` : 'Culinary & Nutrition Assistant'}
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-emerald-300/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-emerald-300/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors hidden sm:block"
                title={isExpanded ? 'Restore size' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-emerald-300/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Model Selector Bar */}
          <div className="bg-[#F8F5EE] px-4 py-2 border-b border-[#EBE6DF] flex items-center justify-between text-xs text-[#52575C] shrink-0">
            <span className="font-semibold text-[11px] uppercase tracking-wider text-[#8A8F95]">Gemini Model:</span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#EBE6DF]">
              <button
                onClick={() => setSelectedModel('gemini-3.8-flash')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  selectedModel === 'gemini-3.8-flash'
                    ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                    : 'text-[#6B7280] hover:text-[#143D2B]'
                }`}
                title="General tasks (Recommended)"
              >
                Flash 3.8
              </button>
              <button
                onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  selectedModel === 'gemini-3.1-flash-lite'
                    ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                    : 'text-[#6B7280] hover:text-[#143D2B]'
                }`}
                title="Ultra-fast quick answers"
              >
                Lite
              </button>
              <button
                onClick={() => setSelectedModel('gemini-4-argon')}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium transition-all ${
                  selectedModel === 'gemini-4-argon'
                    ? 'bg-[#143D2B] text-white font-semibold shadow-xs'
                    : 'text-[#6B7280] hover:text-[#143D2B]'
                }`}
                title="Complex culinary & ratio calculations"
              >
                Argon
              </button>
            </div>
          </div>

          {/* Messages Scrollable Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#FDFBF7] to-white">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-[#143D2B] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                      <ChefHat className="w-3.5 h-3.5 text-emerald-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm transition-all shadow-xs ${
                      isUser
                        ? 'bg-[#143D2B] text-white rounded-br-xs'
                        : 'bg-[#F8F5EE] text-[#1C1E21] border border-[#EBE6DF] rounded-bl-xs'
                    }`}
                  >
                    <div className="text-[13px] sm:text-sm">
                      {isUser ? msg.content : renderFormattedContent(msg.content)}
                    </div>

                    {/* Metadata & Actions */}
                    <div
                      className={`flex items-center gap-2 mt-2 pt-1 border-t text-[10px] ${
                        isUser
                          ? 'border-white/10 text-emerald-200/80 justify-end'
                          : 'border-[#EBE6DF] text-[#8A8F95] justify-between'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <div className="flex items-center gap-2">
                          {msg.modelUsed && (
                            <span className="font-mono text-[9px] text-[#A0A5AA]">
                              {msg.modelUsed}
                            </span>
                          )}
                          <button
                            onClick={() => handleCopyMessage(msg.id, msg.content)}
                            className="hover:text-[#143D2B] transition-colors"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-stone-200 text-[#52575C] flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading / Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#143D2B] text-white flex items-center justify-center shrink-0 mt-1">
                  <ChefHat className="w-3.5 h-3.5 text-emerald-300 animate-spin" />
                </div>
                <div className="bg-[#F8F5EE] border border-[#EBE6DF] rounded-2xl rounded-bl-xs p-3.5 text-xs text-[#52575C] flex items-center gap-2 shadow-xs">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#C85A32] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C85A32] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#C85A32] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="font-medium">Sous Chef is preparing an answer...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-3 py-2 bg-[#F8F5EE] border-t border-[#EBE6DF] flex flex-wrap gap-1.5 max-h-24 overflow-y-auto shrink-0">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 bg-white hover:bg-[#F2ECE1] border border-[#E0D8CB] rounded-full text-[11px] text-[#143D2B] font-medium transition-colors text-left truncate max-w-full"
                >
                  💡 {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#EBE6DF] shrink-0">
            <div className="relative flex items-end gap-2 bg-[#F8F5EE] border border-[#E0D8CB] focus-within:border-[#143D2B] rounded-2xl px-3 py-2 transition-colors">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about ingredients, scaling, or techniques..."
                className="w-full bg-transparent resize-none outline-hidden text-xs sm:text-sm text-[#1C1E21] max-h-24 min-h-[36px] py-1 placeholder:text-[#8A8F95]"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-[#143D2B] hover:bg-[#1E5E43] disabled:opacity-40 disabled:hover:bg-[#143D2B] text-white rounded-xl transition-all shadow-xs shrink-0"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-[#8A8F95] px-1">
              <span>Press <strong>Enter</strong> to send, <strong>Shift+Enter</strong> for newline</span>
              <span className="flex items-center gap-1 font-medium text-[#52575C]">
                <Sparkles className="w-3 h-3 text-amber-500" /> Powered by Gemini
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
