import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  User,
  Trash2,
  Minimize2,
  Maximize2,
  ChefHat,
  RotateCcw,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Flame,
  Music,
  Laugh,
  Hand,
  Gift,
  HelpCircle,
  Move,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../types/content';
import { Chef3DScene, ChefAction } from './Chef3DScene';
import {
  playChefSound,
  speakChefText,
  stopChefSpeech,
  isChefMuted,
  setChefMuted,
  subscribeChefSpeaking,
} from '../utils/chefAudio';
import { RECIPE_STORIES, getStoryForRecipe } from '../data/recipeStories';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
}

interface Interactive3DChefProps {
  currentRecipe?: Recipe | null;
  activePageName?: string;
}

type ModelTier = 'gemini-3.8-flash' | 'gemini-3.1-flash-lite' | 'gemini-4-argon';

export const Interactive3DChef: React.FC<Interactive3DChefProps> = ({ currentRecipe, activePageName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(isChefMuted());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSpeechBubble, setCurrentSpeechBubble] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelTier>('gemini-3.8-flash');
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [characterAction, setCharacterAction] = useState<ChefAction>('idle');

  // Dragging character state
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; initX: number; initY: number }>({
    startX: 0,
    startY: 0,
    initX: 0,
    initY: 0,
  });

  // 3D Canvas mount
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const chefSceneRef = useRef<Chef3DScene | null>(null);

  // Initial welcome message
  const initialWelcome = currentRecipe
    ? `Hey there, food lover! I see you're exploring **${currentRecipe.title}**!
Ask me about ingredient substitutions, how to scale it for a crowd, spice level adjustments, or click **Hear My Story** to listen to its history!`
    : `Hey there, food lover!
Welcome to **Meal Yield**!
I'm your little 3D Chef!
Let's cook something delicious together!

Ask me to scale recipes, substitute ingredients, explain cooking science, or give you recipe ideas!`;

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
  const speechBubbleTimerRef = useRef<any>(null);

  // Initialize 3D Scene
  useEffect(() => {
    if (!canvasMountRef.current) return;

    try {
      const scene = new Chef3DScene(canvasMountRef.current);
      chefSceneRef.current = scene;

      // Handle window resize
      const handleResize = () => {
        if (canvasMountRef.current && chefSceneRef.current) {
          chefSceneRef.current.resize(
            canvasMountRef.current.clientWidth,
            canvasMountRef.current.clientHeight
          );
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        scene.dispose();
        chefSceneRef.current = null;
      };
    } catch (err) {
      console.warn('3D Chef WebGL initialization fallback:', err);
    }
  }, []);

  // Subscribe to speaking state
  useEffect(() => {
    const unsubscribe = subscribeChefSpeaking((speaking) => {
      setIsSpeaking(speaking);
      chefSceneRef.current?.setSpeaking(speaking);
    });

    const handleExternalStoryRequest = (e: any) => {
      const slug = e?.detail?.slug || currentRecipe?.slug;
      if (slug) {
        handleHearMyStory();
      }
    };
    const handleActionTrigger = (e: any) => {
      const action = e?.detail?.action;
      const duration = e?.detail?.duration || 3.5;
      if (action) {
        triggerChefAction(action, duration);
      }
    };
    window.addEventListener('hear_recipe_story', handleExternalStoryRequest);
    window.addEventListener('chef_action_trigger', handleActionTrigger);

    return () => {
      unsubscribe();
      window.removeEventListener('hear_recipe_story', handleExternalStoryRequest);
      window.removeEventListener('chef_action_trigger', handleActionTrigger);
    };
  }, [currentRecipe]);

  // Update speech bubble helper
  const showSpeechBubble = (text: string, durationMs = 5000) => {
    if (speechBubbleTimerRef.current) {
      clearTimeout(speechBubbleTimerRef.current);
    }
    setCurrentSpeechBubble(text);
    speechBubbleTimerRef.current = setTimeout(() => {
      setCurrentSpeechBubble('');
    }, durationMs);
  };

  // Welcome voice for new visitors (Req 3)
  const hasWelcomedRef = useRef(false);
  useEffect(() => {
    if (hasWelcomedRef.current) return;
    hasWelcomedRef.current = true;

    // Check session storage to avoid repeating full welcome on every page
    const welcomedInSession = sessionStorage.getItem('mealyield_welcomed');
    if (!welcomedInSession) {
      sessionStorage.setItem('mealyield_welcomed', 'true');
      const welcomeLine = "Hey there, food lover! Welcome to Meal Yield! I'm your little chef! Let's cook something delicious together!";
      showSpeechBubble(welcomeLine, 6000);
      triggerChefAction('wave', 4.5);
      playChefSound('tada');

      speakChefText(welcomeLine, {
        queueIfBlocked: true,
      });
    }
  }, []);

  // Automatic recipe greetings when viewing a recipe (Req 4)
  const lastRecipeSlugRef = useRef<string | null>(null);
  useEffect(() => {
    if (!currentRecipe || currentRecipe.slug === lastRecipeSlugRef.current) return;
    lastRecipeSlugRef.current = currentRecipe.slug;

    // Short, cute greetings (1-3 seconds)
    const greetings = [
      `Here's your recipe for ${currentRecipe.title}!`,
      `Ooh, ${currentRecipe.title}! My absolute favorite!`,
      `Let's make something yummy!`,
      `Your delicious meal is ready!`,
      `Bon appétit, my friend!`,
    ];
    const pickedGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    showSpeechBubble(pickedGreeting, 4500);
    triggerChefAction('present', 3.5);
    playChefSound('ready');

    speakChefText(pickedGreeting, {
      queueIfBlocked: true,
    });
  }, [currentRecipe?.slug]);

  // Trigger chef action with sound and 3D animation
  const triggerChefAction = (action: ChefAction, duration = 3.5) => {
    setCharacterAction(action);
    chefSceneRef.current?.setAction(action, duration);

    if (action === 'dance') {
      playChefSound('woohoo');
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { x: 0.85, y: 0.75 },
          colors: ['#143d2b', '#c85a32', '#d4af37'],
        });
      } catch {
        // fallback
      }
    } else if (action === 'laugh') {
      playChefSound('hehe');
    } else if (action === 'wave') {
      playChefSound('yummy');
    } else if (action === 'present') {
      playChefSound('delicious');
    }
  };

  // Toggle Mute
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setChefMuted(newMuted);
    if (!newMuted) {
      playChefSound('pop');
    } else {
      stopChefSpeech();
    }
  };

  // Dragging logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, textarea, a, .chat-window')) return;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: position.x,
      initY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.startX;
      const dy = e.clientY - dragStartRef.current.startY;
      // Boundaries
      const maxX = 120;
      const minX = -window.innerWidth + 280;
      const maxY = 50;
      const minY = -window.innerHeight + 320;
      setPosition({
        x: Math.min(maxX, Math.max(minX, dragStartRef.current.initX + dx)),
        y: Math.min(maxY, Math.max(minY, dragStartRef.current.initY + dy)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Mouse rotation for 3D character
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasMountRef.current || !chefSceneRef.current) return;
    const rect = canvasMountRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const normX = (x / rect.width) * 2 - 1;
    chefSceneRef.current.setMouseRotation(normX);
  };

  // Voice Recognition (Microphone button)
  const handleToggleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showSpeechBubble('Voice input is not supported in this browser.', 4000);
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        playChefSound('pop');
        showSpeechBubble('Listening... Tell me what you need!', 3000);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Chat message submission
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

    // Make chef wave when user speaks
    triggerChefAction('wave', 2.0);

    try {
      const historyPayload = newMessages
        .filter((m) => m.id !== 'welcome')
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        throw new Error(`Server responded with ${res.status}`);
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

      // Speak response summary and celebrate
      triggerChefAction('present', 3.0);
      playChefSound('yummy');

      // First sentence spoken aloud for warmth
      const firstSentence = (data.reply || '').split(/[.!?]/)[0] + '.';
      if (firstSentence.length > 5 && firstSentence.length < 180) {
        showSpeechBubble(firstSentence, 6000);
        speakChefText(firstSentence);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `I ran into an issue connecting to Gemini (${err.message || 'Network error'}). Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  // "Hear My Story" narration handler (Req 5)
  const handleHearMyStory = () => {
    if (!currentRecipe) return;
    const story = getStoryForRecipe(currentRecipe.slug);

    triggerChefAction('present', 6.0);
    playChefSound('tada');

    const fullNarration = `${story.historyText} ${story.funFact}`;
    showSpeechBubble(`Narrating the story of ${currentRecipe.title}...`, 8000);

    // Add story directly into chat log as well
    const storyMsg: ChatMessage = {
      id: `story-${Date.now()}`,
      role: 'model',
      content: `### The Story of ${story.title}\n\n${story.historyText}\n\n**Cultural Tradition:** ${story.culturalNote}\n\n**Culinary Fact:** ${story.funFact}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'Meal Yield Heritage Archive',
    };
    setMessages((prev) => [...prev, storyMsg]);
    setIsOpen(true);

    speakChefText(fullNarration, {
      queueIfBlocked: true,
      rate: 1.05,
      pitch: 1.2,
      onStart: () => {
        triggerChefAction('talk', 12.0);
      },
    });
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const parseInlineStyles = (text: string) => {
    let formatted = text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-semibold text-[#143D2B]">$1</strong>'
    );
    formatted = formatted.replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 bg-stone-100 text-[#C85A32] font-mono text-[11px] rounded">$1</code>'
    );
    return formatted;
  };

  const renderFormattedContent = (content: string) => {
    return content.split('\n').map((line, idx) => {
      if (!line.trim()) return <div key={idx} className="h-2" />;
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
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 text-xs sm:text-sm">
            <span className="text-[#C85A32] font-bold mt-0.5">•</span>
            <span dangerouslySetInnerHTML={{ __html: parseInlineStyles(line.trim().substring(2)) }} />
          </div>
        );
      }
      return (
        <p
          key={idx}
          className="my-1 text-xs sm:text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parseInlineStyles(line) }}
        />
      );
    });
  };

  return (
    <div
      className="fixed z-50 no-print select-none transition-transform duration-75"
      style={{
        bottom: 'max(20px, env(safe-area-inset-bottom, 20px))',
        right: 'max(20px, env(safe-area-inset-right, 20px))',
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Dynamic Animated Speech Bubble above Chef */}
      {currentSpeechBubble && !isOpen && (
        <div
          className="absolute -top-16 right-0 w-52 sm:w-60 p-2.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#143D2B]/15 text-[11px] sm:text-xs text-[#1C1E21] font-medium animate-in fade-in slide-in-from-bottom-2 duration-300 z-10 pointer-events-auto"
          style={{ transformOrigin: 'bottom right' }}
        >
          <div className="flex items-center gap-1.5 mb-1 text-[9px] font-bold uppercase tracking-wider text-[#C85A32]">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Little Chef</span>
          </div>
          <p className="line-clamp-2 leading-snug">{currentSpeechBubble}</p>
          {/* Bubble tail */}
          <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-white rotate-45 border-r border-b border-[#143D2B]/15" />
        </div>
      )}

      {/* 3D Interactive Chef Character Dock (Collapsed) */}
      {!isOpen && (
        <div className="relative flex flex-col items-end group">
          {/* Quick Action Ribbon (Hover revealed on desktop) */}
          <div className="hidden sm:flex items-center gap-1 mb-1.5 bg-white/95 backdrop-blur-md px-2 py-1 rounded-full shadow-md border border-[#EBE6DF] opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => triggerChefAction('wave')}
              className="p-1 rounded-full hover:bg-emerald-50 text-[#143D2B] transition-colors"
              title="Wave hello"
            >
              <Hand className="w-3 h-3" />
            </button>
            <button
              onClick={() => triggerChefAction('dance')}
              className="p-1 rounded-full hover:bg-amber-50 text-[#C85A32] transition-colors"
              title="Dance!"
            >
              <Music className="w-3 h-3" />
            </button>
            <button
              onClick={() => triggerChefAction('laugh')}
              className="p-1 rounded-full hover:bg-emerald-50 text-[#143D2B] transition-colors"
              title="Laugh"
            >
              <Laugh className="w-3 h-3" />
            </button>
            {currentRecipe && (
              <button
                onClick={handleHearMyStory}
                className="px-2 py-0.5 rounded-full bg-[#C85A32] text-white text-[9px] font-bold flex items-center gap-0.5 hover:bg-[#a84723] transition-colors shadow-xs"
                title="Hear My Story"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-200" />
                <span>Story</span>
              </button>
            )}
            <button
              onClick={handleToggleMute}
              className="p-1 rounded-full hover:bg-stone-100 text-[#52575C] transition-colors"
              title={isMuted ? 'Unmute chef voice' : 'Mute chef voice'}
            >
              {isMuted ? <VolumeX className="w-3 h-3 text-red-500" /> : <Volume2 className="w-3 h-3 text-emerald-600" />}
            </button>
          </div>

          {/* Interactive 3D Canvas Container - Compact standard mascot size */}
          <div
            className="relative w-[88px] h-[88px] sm:w-[125px] sm:h-[130px] cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
            onMouseMove={handleCanvasMouseMove}
            onClick={() => {
              triggerChefAction('wave');
              setIsOpen(true);
            }}
            title="Click to talk with your 3D Sous Chef! (Drag to move)"
          >
            {/* Three.js canvas mount */}
            <div ref={canvasMountRef} className="w-full h-full" />

            {/* Drag Handle indicator */}
            <div className="absolute bottom-0 right-1 p-0.5 rounded-full bg-black/30 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
              <Move className="w-2.5 h-2.5" />
            </div>

            {/* Glowing pulse ring if speaking */}
            {isSpeaking && (
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400/60 animate-ping pointer-events-none" />
            )}
          </div>
        </div>
      )}

      {/* Expanded Chat Window Panel */}
      {isOpen && (
        <div
          className={`chat-window bg-white rounded-3xl shadow-2xl border border-[#EBE6DF] flex flex-col overflow-hidden transition-all duration-300 ${
            isExpanded
              ? 'fixed inset-4 sm:inset-10 z-50 rounded-2xl'
              : 'w-[92vw] sm:w-[460px] h-[600px] max-h-[85vh]'
          }`}
          style={{ boxShadow: '0 25px 50px -12px rgba(20, 61, 43, 0.28)' }}
        >
          {/* Header */}
          <div className="bg-[#143D2B] text-white px-5 py-3.5 flex items-center justify-between border-b border-emerald-800/60 shrink-0">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => triggerChefAction('dance')}
                title="Click to make the chef dance!"
              >
                <ChefHat className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-editorial text-base font-bold text-white tracking-wide">
                    3D Chef & Sous Chef AI
                  </h3>
                  <span className="px-1.5 py-0.5 bg-emerald-800 text-[9px] font-semibold uppercase tracking-wider text-emerald-200 rounded">
                    Interactive
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/80">
                  {currentRecipe ? `Recipe: ${currentRecipe.title.substring(0, 22)}...` : 'Your Living Culinary Companion'}
                </p>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleToggleMute}
                className="p-1.5 text-emerald-300/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title={isMuted ? 'Unmute voice' : 'Mute voice'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-300" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-emerald-300/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors hidden sm:block"
                title={isExpanded ? 'Restore size' : 'Expand window'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  stopChefSpeech();
                  setIsOpen(false);
                }}
                className="p-1.5 text-emerald-300/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Character Action Bar */}
          <div className="bg-[#F8F5EE] px-4 py-2 border-b border-[#EBE6DF] flex items-center justify-between text-xs text-[#52575C] shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-[#8A8F95] uppercase tracking-wider">Chef Moves:</span>
              <button
                onClick={() => triggerChefAction('wave')}
                className="px-2 py-0.5 rounded-md bg-white border border-[#DDD5C7] text-[11px] hover:bg-emerald-50 text-[#143D2B] transition-colors"
              >
                Wave 👋
              </button>
              <button
                onClick={() => triggerChefAction('dance')}
                className="px-2 py-0.5 rounded-md bg-white border border-[#DDD5C7] text-[11px] hover:bg-amber-50 text-[#C85A32] transition-colors"
              >
                Dance 🕺
              </button>
              <button
                onClick={() => triggerChefAction('laugh')}
                className="px-2 py-0.5 rounded-md bg-white border border-[#DDD5C7] text-[11px] hover:bg-emerald-50 text-[#143D2B] transition-colors"
              >
                Laugh 😄
              </button>
            </div>

            {currentRecipe && (
              <button
                onClick={handleHearMyStory}
                className="px-2.5 py-1 rounded-lg bg-[#C85A32] hover:bg-[#a84723] text-white text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs"
              >
                <Sparkles className="w-3 h-3 text-amber-200" />
                <span>Hear My Story</span>
              </button>
            )}
          </div>

          {/* Conversation History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FBF9F5]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-[#143D2B] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <ChefHat className="w-4 h-4 text-emerald-300" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 relative group ${
                    msg.role === 'user'
                      ? 'bg-[#143D2B] text-white rounded-br-xs'
                      : 'bg-white text-[#1C1E21] border border-[#EBE6DF] shadow-xs rounded-bl-xs'
                  }`}
                >
                  {renderFormattedContent(msg.content)}

                  <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-black/5 text-[10px] opacity-70">
                    <span>{msg.timestamp}</span>
                    {msg.role === 'model' && (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            speakChefText(msg.content);
                            triggerChefAction('talk', 8.0);
                          }}
                          className="hover:opacity-100 flex items-center gap-0.5"
                          title="Read aloud"
                        >
                          <Volume2 className="w-3 h-3 text-emerald-700" />
                          <span>Speak</span>
                        </button>
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="hover:opacity-100 flex items-center gap-0.5"
                          title="Copy message"
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

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#C85A32] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#6B7280] italic">
                <div className="w-2 h-2 bg-[#143D2B] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#143D2B] rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-[#143D2B] rounded-full animate-bounce [animation-delay:0.4s]" />
                <span>Chef is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-[#F8F5EE] border-t border-[#EBE6DF] flex gap-1.5 overflow-x-auto text-[11px] text-[#143D2B] shrink-0">
            {currentRecipe ? (
              <>
                <button
                  onClick={() => handleSendMessage(`How do I scale ${currentRecipe.title} for 8 servings?`)}
                  className="px-2.5 py-1 bg-white border border-[#DDD5C7] rounded-full hover:bg-emerald-50 shrink-0"
                >
                  Scale for 8
                </button>
                <button
                  onClick={() => handleSendMessage(`What can I substitute for ${currentRecipe.ingredients[0]?.name || 'ghee'}?`)}
                  className="px-2.5 py-1 bg-white border border-[#DDD5C7] rounded-full hover:bg-emerald-50 shrink-0"
                >
                  Substitutions
                </button>
                <button
                  onClick={handleHearMyStory}
                  className="px-2.5 py-1 bg-[#C85A32] text-white font-bold rounded-full hover:bg-[#a84723] shrink-0"
                >
                  Hear My Story
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleSendMessage('How do I cook fluffy basmati rice?')}
                  className="px-2.5 py-1 bg-white border border-[#DDD5C7] rounded-full hover:bg-emerald-50 shrink-0"
                >
                  Fluffy Rice
                </button>
                <button
                  onClick={() => handleSendMessage('Suggest a high-protein dinner for tonight')}
                  className="px-2.5 py-1 bg-white border border-[#DDD5C7] rounded-full hover:bg-emerald-50 shrink-0"
                >
                  High Protein Dinner
                </button>
                <button
                  onClick={() => handleSendMessage('How to double a curry without ruining flavor?')}
                  className="px-2.5 py-1 bg-white border border-[#DDD5C7] rounded-full hover:bg-emerald-50 shrink-0"
                >
                  Doubling Curries
                </button>
              </>
            )}
          </div>

          {/* Input Bar with Voice Input */}
          <div className="p-3 bg-white border-t border-[#EBE6DF] flex items-center gap-2 shrink-0">
            <button
              onClick={handleToggleVoiceInput}
              className={`p-2 rounded-xl transition-colors ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-[#F4EFE6] text-[#52575C] hover:bg-[#EBE6DF]'
              }`}
              title={isListening ? 'Stop listening' : 'Speak into microphone'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask your 3D Chef anything..."
              rows={1}
              className="flex-1 px-3 py-2 text-sm bg-[#F8F5EE] border border-[#DDD5C7] rounded-xl focus:outline-none focus:border-[#143D2B] resize-none"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 bg-[#143D2B] hover:bg-[#1E5E43] disabled:opacity-50 text-white rounded-xl transition-colors shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
