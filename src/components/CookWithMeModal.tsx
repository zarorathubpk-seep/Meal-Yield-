import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause, RotateCcw, CheckCircle2, Clock, ChefHat, Sparkles } from 'lucide-react';
import { Recipe } from '../types/content';
import { speakChefText, stopChefSpeech } from '../utils/chefAudio';

interface CookWithMeModalProps {
  recipe: Recipe;
  servings: number;
  onClose: () => void;
  onUpdateServings: (newServings: number) => void;
}

export const CookWithMeModal: React.FC<CookWithMeModalProps> = ({
  recipe,
  servings,
  onClose,
  onUpdateServings,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = recipe.instructions[currentStepIndex];
  const totalSteps = recipe.instructions.length;
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        setCurrentStepIndex(prev => prev - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, totalSteps, onClose]);

  // Timer Tick
  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setTimerRunning(false);
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            // Play audio chime
            try {
              const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.setValueAtTime(880, ctx.currentTime);
              gain.gain.setValueAtTime(0.3, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
              osc.start();
              osc.stop(ctx.currentTime + 1.2);
            } catch (e) {
              console.warn('Audio chime unsupported');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [timerRunning, timerSeconds]);

  // Stop speech when changing steps or unmounting
  useEffect(() => {
    stopChefSpeech();
    setIsSpeaking(false);
  }, [currentStepIndex]);

  useEffect(() => {
    return () => {
      stopChefSpeech();
    };
  }, []);

  // Voice Readout mapped to central chef audio with error fallback
  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopChefSpeech();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `Step ${currentStep.stepNumber}. ${currentStep.title}. ${currentStep.instruction}. ${
      currentStep.tip ? 'Chef tip: ' + currentStep.tip : ''
    }`;

    setIsSpeaking(true);
    speakChefText(textToRead, {
      rate: 1.0,
      pitch: 1.1,
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  const handleToggleCompleted = (stepIdx: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepIdx]: !prev[stepIdx],
    }));
  };

  const setTimerPreset = (minutes: number) => {
    setTimerSeconds(minutes * 60);
    setTimerRunning(true);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const servingRatio = servings / recipe.servings;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden text-white animate-fadeIn">
      {/* Top Header Bar */}
      <div className="border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-slate-900/80">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Cook With Me • Kitchen Mode
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs text-stone-300 hidden sm:inline">
                {recipe.title}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-serif font-bold text-white truncate max-w-sm sm:max-w-xl">
              Step {currentStep.stepNumber} of {totalSteps}: {currentStep.title}
            </h2>
          </div>
        </div>

        {/* Servings Adjuster & Close */}
        <div className="flex items-center gap-3">
          {/* Servings */}
          <div className="hidden md:flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1 text-xs">
            <span className="text-stone-400">Servings:</span>
            {[2, 4, 6, 8].map(s => (
              <button
                key={s}
                onClick={() => onUpdateServings(s)}
                className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                  servings === s ? 'bg-amber-400 text-slate-950' : 'text-stone-300 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors"
            aria-label="Exit Cook With Me"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5">
        <div
          className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 max-w-5xl mx-auto w-full flex flex-col justify-center">
        <div className="space-y-6">
          {/* Step Pill & Voice Readout */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs sm:text-sm font-bold">
              <span>Step {currentStepIndex + 1}</span>
              <span className="text-amber-400/50">/</span>
              <span>{totalSteps}</span>
            </div>

            <button
              onClick={handleToggleSpeech}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-950 animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  Stop Voice
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  Read Step to Me
                </>
              )}
            </button>
          </div>

          {/* Large Step Title */}
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            {currentStep.title}
          </h3>

          {/* Large Step Instruction */}
          <div className="bg-stone-900/90 rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-2xl">
            <p className="text-lg sm:text-2xl lg:text-3xl font-light text-stone-100 leading-relaxed sm:leading-loose">
              {currentStep.instruction}
            </p>

            {/* Chef Tip if available */}
            {currentStep.tip && (
              <div className="mt-6 pt-6 border-t border-stone-800/80 flex items-start gap-3 text-amber-200/90 text-sm sm:text-base bg-amber-500/10 rounded-2xl p-4 border border-amber-400/20">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block font-semibold mb-0.5">Chef's Secret:</strong>
                  {currentStep.tip}
                </div>
              </div>
            )}

            {/* Checkbox for Step Done */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => handleToggleCompleted(currentStepIndex)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  completedSteps[currentStepIndex]
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {completedSteps[currentStepIndex] ? 'Step Completed! ✓' : 'Mark Step Complete'}
              </button>
            </div>
          </div>

          {/* Integrated Kitchen Timer */}
          <div className="bg-slate-900/70 rounded-2xl p-4 sm:p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-xs uppercase font-bold text-stone-400 tracking-wider block">
                  Kitchen Timer
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-widest">
                  {formatTimer(timerSeconds)}
                </span>
              </div>
            </div>

            {/* Timer Presets */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-400 mr-1 hidden md:inline">Quick Timers:</span>
              {[1, 3, 5, 10, 15].map(m => (
                <button
                  key={m}
                  onClick={() => setTimerPreset(m)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/15 text-stone-300 border border-white/10"
                >
                  +{m}m
                </button>
              ))}

              {timerSeconds > 0 && (
                <>
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold transition-all shadow-md ml-1"
                    aria-label={timerRunning ? 'Pause timer' : 'Start timer'}
                  >
                    {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      setTimerRunning(false);
                      setTimerSeconds(0);
                    }}
                    className="p-2 rounded-xl bg-white/10 text-stone-300 hover:text-white"
                    aria-label="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Navigation */}
      <div className="border-t border-white/10 px-4 sm:px-8 py-4 bg-slate-900/90 flex items-center justify-between max-w-5xl mx-auto w-full">
        <button
          onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
          disabled={currentStepIndex === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm sm:text-base transition-all ${
            currentStepIndex === 0
              ? 'opacity-30 cursor-not-allowed bg-white/5 text-stone-400'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous Step
        </button>

        {/* Step dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {recipe.instructions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStepIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'bg-amber-400 scale-125 ring-2 ring-amber-400/40'
                  : completedSteps[idx]
                  ? 'bg-emerald-400'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Jump to step ${idx + 1}`}
            />
          ))}
        </div>

        {currentStepIndex < totalSteps - 1 ? (
          <button
            onClick={() => setCurrentStepIndex(prev => Math.min(totalSteps - 1, prev + 1))}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-500/20"
          >
            Next Step
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-emerald-500/20"
          >
            Dish Complete! 🌟
          </button>
        )}
      </div>
    </div>
  );
};
