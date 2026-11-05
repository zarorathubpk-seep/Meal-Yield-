// Cute, energetic, procedural audio synthesizer and Web Speech API narrator
// 100% zero-404, zero external dependencies, handles autoplay restrictions gracefully

let audioCtx: AudioContext | null = null;
let isMutedState = false;

// Check user audio preference in localStorage
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('mealyield_chef_muted');
    if (saved !== null) {
      isMutedState = saved === 'true';
    }
  } catch {
    // fallback
  }
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtxClass) return null;
  if (!audioCtx) {
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isChefMuted(): boolean {
  return isMutedState;
}

export function setChefMuted(muted: boolean): void {
  isMutedState = muted;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('mealyield_chef_muted', String(muted));
    } catch {
      // ignore
    }
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

// Procedural cute chef sound effects using Web Audio API oscillators
export type SoundEffectName = 'yummy' | 'woohoo' | 'tada' | 'hehe' | 'delicious' | 'ready' | 'click' | 'pop';

export function playChefSound(sound: SoundEffectName): void {
  if (isMutedState) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    switch (sound) {
      case 'yummy': {
        // Melodic two-note chime (upward bright glissando)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }
      case 'woohoo': {
        // Playful bounce chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(980, now + 0.28);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      }
      case 'tada': {
        // Major triad trumpet chime (C5 -> E5 -> G5)
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.18, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.4);
        });
        break;
      }
      case 'hehe': {
        // Double chuckle blip
        [600, 750].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          osc.frequency.exponentialRampToValueAtTime(freq + 100, now + idx * 0.12 + 0.08);
          gain.gain.setValueAtTime(0.18, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.1);
        });
        break;
      }
      case 'delicious': {
        // Smooth warm bell
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
        break;
      }
      case 'ready':
      case 'pop': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }
      case 'click': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }
    }
  } catch {
    // Graceful silent audio fallback
  }
}

// Global speaking state subscriber for mouth synchronization and 3D animation
type SpeakListener = (isSpeaking: boolean, word?: string) => void;
const speakListeners = new Set<SpeakListener>();

export function subscribeChefSpeaking(listener: SpeakListener): () => void {
  speakListeners.add(listener);
  return () => speakListeners.delete(listener);
}

function notifySpeaking(isSpeaking: boolean, word?: string) {
  speakListeners.forEach((l) => l(isSpeaking, word));
}

// Queue for audio delayed by browser autoplay restrictions
let queuedAudioAction: (() => void) | null = null;
let userInteractionListenerRegistered = false;

function registerAutoplayResume() {
  if (userInteractionListenerRegistered || typeof window === 'undefined') return;
  userInteractionListenerRegistered = true;

  const handleInteraction = () => {
    // Resume audio context
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    // Execute pending queued voice greeting
    if (queuedAudioAction) {
      const action = queuedAudioAction;
      queuedAudioAction = null;
      setTimeout(() => action(), 100);
    }
    // Cleanup listeners
    ['click', 'keydown', 'touchstart'].forEach((event) => {
      window.removeEventListener(event, handleInteraction);
    });
    userInteractionListenerRegistered = false;
  };

  ['click', 'keydown', 'touchstart'].forEach((event) => {
    window.addEventListener(event, handleInteraction, { once: true, passive: true });
  });
}

// Natural text-to-speech with cute, friendly chef voice characteristics
export function speakChefText(
  text: string,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
    queueIfBlocked?: boolean;
    rate?: number;
    pitch?: number;
  }
): void {
  if (isMutedState || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options?.onEnd?.();
    return;
  }

  const performSpeak = () => {
    window.speechSynthesis.cancel();

    // Clean markdown formatting before speaking
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/#{1,6}\s?/g, '')
      .replace(/`{1,3}(.*?)`{1,3}/g, '$1')
      .replace(/\n+/g, ' ')
      .trim();

    if (!cleanText) {
      options?.onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick cute, friendly, natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find(
        (v) =>
          (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Victoria'))) ||
          v.lang === 'en-US'
      ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Cute, energetic, friendly chef voice profile (slightly higher pitch, upbeat cadence)
    utterance.pitch = options?.pitch ?? 1.25;
    utterance.rate = options?.rate ?? 1.08;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      notifySpeaking(true);
      options?.onStart?.();
    };

    utterance.onboundary = (e) => {
      if (e.name === 'word') {
        const word = cleanText.substring(e.charIndex, e.charIndex + e.charLength);
        notifySpeaking(true, word);
      }
    };

    utterance.onend = () => {
      notifySpeaking(false);
      options?.onEnd?.();
    };

    utterance.onerror = () => {
      notifySpeaking(false);
      options?.onEnd?.();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      notifySpeaking(false);
      options?.onEnd?.();
    }
  };

  // If voices haven't loaded yet in Chrome
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      performSpeak();
    };
  } else {
    performSpeak();
  }

  // Register interaction listener in case browser blocked autoplay
  if (options?.queueIfBlocked) {
    queuedAudioAction = performSpeak;
    registerAutoplayResume();
  }
}

export function stopChefSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  notifySpeaking(false);
  queuedAudioAction = null;
}

export function pauseChefSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.pause();
    notifySpeaking(false);
  }
}

export function resumeChefSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.resume();
    notifySpeaking(true);
  }
}

export function isSpeechPaused(): boolean {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.paused;
  }
  return false;
}
