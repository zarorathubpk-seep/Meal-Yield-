import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChefHat,
  Square,
} from 'lucide-react';
import { Recipe } from '../types/content';
import { getStoryForRecipe, RecipeStory } from '../data/recipeStories';
import {
  speakChefText,
  stopChefSpeech,
  pauseChefSpeech,
  resumeChefSpeech,
  isSpeechPaused,
  isChefMuted,
  setChefMuted,
  subscribeChefSpeaking,
  subscribeChefMute,
  playChefSound,
} from '../utils/chefAudio';

interface StoryAudioPlayerProps {
  recipe: Recipe;
}

export const StoryAudioPlayer: React.FC<StoryAudioPlayerProps> = ({ recipe }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(isChefMuted());
  const [isExpandedText, setIsExpandedText] = useState(false);
  const story: RecipeStory = getStoryForRecipe(recipe.slug);

  // Full narration string (~15-25 seconds)
  const fullNarration = `${story.historyText} ${story.culturalNote} ${story.funFact}`;

  useEffect(() => {
    const unsubscribeSpeaking = subscribeChefSpeaking((speaking) => {
      if (!speaking && !isSpeechPaused()) {
        setIsPlaying(false);
        setIsPaused(false);
      } else if (speaking) {
        setIsPlaying(true);
        setIsPaused(false);
      }
    });

    const unsubscribeMute = subscribeChefMute((muted) => {
      setIsMuted(muted);
    });

    return () => {
      unsubscribeSpeaking();
      unsubscribeMute();
    };
  }, []);

  // When recipe changes, stop previous narration
  useEffect(() => {
    handleStop();
  }, [recipe.slug]);

  const handleStop = () => {
    stopChefSpeech();
    setIsPlaying(false);
    setIsPaused(false);
    window.dispatchEvent(new CustomEvent('chef_action_trigger', { detail: { action: 'idle' } }));
  };

  const handlePlayPause = () => {
    if (isPlaying && !isPaused) {
      // Pause
      pauseChefSpeech();
      setIsPaused(true);
      window.dispatchEvent(new CustomEvent('chef_action_trigger', { detail: { action: 'idle' } }));
    } else if (isPaused) {
      // Resume
      resumeChefSpeech();
      setIsPaused(false);
      setIsPlaying(true);
      window.dispatchEvent(new CustomEvent('chef_action_trigger', { detail: { action: 'talk', duration: 15 } }));
    } else {
      // Start fresh
      playChefSound('tada');
      window.dispatchEvent(new CustomEvent('chef_action_trigger', { detail: { action: 'present', duration: 4 } }));
      
      speakChefText(fullNarration, {
        rate: 1.05,
        pitch: 1.2,
        onStart: () => {
          setIsPlaying(true);
          setIsPaused(false);
          window.dispatchEvent(new CustomEvent('chef_action_trigger', { detail: { action: 'talk', duration: 20 } }));
        },
        onEnd: () => {
          setIsPlaying(false);
          setIsPaused(false);
          playChefSound('delicious');
          window.dispatchEvent(new CustomEvent('chef_action_trigger', { detail: { action: 'dance', duration: 3.5 } }));
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
      });
    }
  };

  const handleReplay = () => {
    handleStop();
    playChefSound('ready');
    window.dispatchEvent(new CustomEvent('chef_action_trigger', { detail: { action: 'wave', duration: 2.5 } }));

    setTimeout(() => {
      speakChefText(fullNarration, {
        rate: 1.05,
        pitch: 1.2,
        onStart: () => {
          setIsPlaying(true);
          setIsPaused(false);
          window.dispatchEvent(new CustomEvent('chef_action_trigger', { detail: { action: 'talk', duration: 20 } }));
        },
        onEnd: () => {
          setIsPlaying(false);
          setIsPaused(false);
          playChefSound('delicious');
        },
        onError: () => {
          setIsPlaying(false);
          setIsPaused(false);
        },
      });
    }, 250);
  };

  const handleToggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    setChefMuted(newMuted);
    if (!newMuted) {
      playChefSound('pop');
    } else {
      handleStop();
    }
  };

  return (
    <div className="my-6 rounded-2xl bg-gradient-to-br from-[#143D2B] to-[#0D281C] text-white p-4 sm:p-5 shadow-lg border border-emerald-900/60 no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Branding & Story Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shrink-0 text-amber-300">
            <ChefHat className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Hear My Story</span>
              </span>
              <span className="text-xs text-emerald-200/80 font-medium">15–25s Audio Narration</span>
            </div>
            <h3 className="font-editorial text-base sm:text-lg font-bold text-white mt-0.5">
              The Heritage & Culinary Origins of {recipe.title}
            </h3>
          </div>
        </div>

        {/* Right: Audio Player Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0 bg-white/10 p-1.5 rounded-xl border border-white/15 backdrop-blur-xs">
          {/* Play / Pause Button */}
          <button
            onClick={handlePlayPause}
            className={`px-3 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              isPlaying && !isPaused
                ? 'bg-amber-400 text-[#143D2B] hover:bg-amber-300'
                : 'bg-[#C85A32] text-white hover:bg-[#a84723]'
            }`}
            title={isPlaying && !isPaused ? 'Pause narration' : 'Play narration'}
          >
            {isPlaying && !isPaused ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isPaused ? 'Resume' : 'Play Story'}</span>
              </>
            )}
          </button>

          {/* Stop Button */}
          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              className="p-1.5 rounded-lg text-red-300 hover:text-white hover:bg-red-950/40 transition-colors"
              title="Stop narration"
              aria-label="Stop narration"
            >
              <Square className="w-3.5 h-3.5 fill-current text-red-400" />
            </button>
          )}

          {/* Replay Button */}
          <button
            onClick={handleReplay}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Replay from start"
            aria-label="Replay from start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mute Button */}
          <button
            onClick={handleToggleMute}
            className={`p-1.5 rounded-lg transition-colors ${
              isMuted
                ? 'text-red-300 bg-red-950/40 hover:bg-red-950/60'
                : 'text-emerald-200 hover:text-white hover:bg-white/10'
            }`}
            title={isMuted ? 'Unmute voice' : 'Mute voice'}
            aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Audio Wave Visualizer while playing */}
      {isPlaying && !isPaused && (
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-amber-200">
          <div className="flex items-end gap-1 h-3.5">
            <span className="w-1 bg-amber-300 rounded-full animate-bounce" style={{ height: '70%', animationDuration: '600ms' }} />
            <span className="w-1 bg-amber-300 rounded-full animate-bounce" style={{ height: '100%', animationDuration: '450ms' }} />
            <span className="w-1 bg-amber-300 rounded-full animate-bounce" style={{ height: '40%', animationDuration: '750ms' }} />
            <span className="w-1 bg-amber-300 rounded-full animate-bounce" style={{ height: '90%', animationDuration: '500ms' }} />
            <span className="w-1 bg-amber-300 rounded-full animate-bounce" style={{ height: '60%', animationDuration: '650ms' }} />
          </div>
          <span className="text-[11px] font-medium tracking-wide">3D Chef is narrating... Look at your bottom-right chef!</span>
        </div>
      )}

      {/* Expandable Story Text */}
      <div className="mt-3 pt-3 border-t border-white/10 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
        <p className={isExpandedText ? '' : 'line-clamp-2'}>
          {story.historyText}
        </p>

        {isExpandedText && (
          <div className="mt-3 space-y-2 pt-2 border-t border-white/10 text-xs">
            <p>
              <strong className="text-amber-300">Cultural Tradition: </strong>
              {story.culturalNote}
            </p>
            <p>
              <strong className="text-amber-300">Culinary Fact: </strong>
              {story.funFact}
            </p>
          </div>
        )}

        <button
          onClick={() => setIsExpandedText(!isExpandedText)}
          className="mt-2 text-amber-300 hover:text-amber-200 font-semibold text-xs flex items-center gap-1 transition-colors"
        >
          <BookOpen className="w-3 h-3" />
          <span>{isExpandedText ? 'Show Less' : 'Read Full Heritage Text'}</span>
          {isExpandedText ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
};
