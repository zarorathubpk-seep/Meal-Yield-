// Cute, energetic, procedural audio synthesizer and Web Speech API narrator
// 100% zero-404, zero external dependencies, robust autoplay & policy fallback handling

export interface ChefSpeechOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (errorCode: string) => void;
  queueIfBlocked?: boolean;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export type SoundEffectName = 'yummy' | 'woohoo' | 'tada' | 'hehe' | 'delicious' | 'ready' | 'click' | 'pop';
export type SpeakListener = (isSpeaking: boolean, word?: string) => void;
export type MuteListener = (isMuted: boolean) => void;

let audioCtx: AudioContext | null = null;
let isMutedState = false;
let hasUserInteracted = false;
let cachedVoices: SpeechSynthesisVoice[] = [];
let isSpeechInitialized = false;

// Subscribers
const speakListeners = new Set<SpeakListener>();
const muteListeners = new Set<MuteListener>();

// Queue for audio delayed by browser autoplay restrictions
let queuedAudioAction: (() => void) | null = null;
let userInteractionListenerRegistered = false;

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

  const markInteracted = () => {
    hasUserInteracted = true;
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
  };
  ['click', 'keydown', 'touchstart', 'pointerdown'].forEach((event) => {
    window.addEventListener(event, markInteracted, { once: true, passive: true });
  });

  // Pre-initialize Speech Synthesis voices
  initSpeechSynthesis();
}

/**
 * Initializes and caches Web Speech API voices.
 * Handles browsers where getVoices() is asynchronous (Chrome, Safari, Edge).
 */
export function initSpeechSynthesis(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  if (isSpeechInitialized) return;
  isSpeechInitialized = true;

  const populateVoices = () => {
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        cachedVoices = voices;
      }
    } catch {
      // guard against restricted browser environments
    }
  };

  populateVoices();
  if (typeof window.speechSynthesis.addEventListener === 'function') {
    window.speechSynthesis.addEventListener('voiceschanged', populateVoices);
  } else {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }
}

/**
 * Cleans markdown formatting, links, backticks, and extra spacing
 * so the synthesizer receives clean, natural prose.
 */
export function cleanSpeechText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold **text**
    .replace(/\*(.*?)\*/g, '$1')     // Italic *text*
    .replace(/__(.*?)__/g, '$1')     // Bold __text__
    .replace(/_(.*?)_/g, '$1')       // Italic _text_
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // [Label](url) -> Label
    .replace(/#{1,6}\s?/g, '')       // Headers ###
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Inline code `foo`
    .replace(/^[•\-\*]\s+/gm, '')    // List bullets
    .replace(/\s+/g, ' ')            // Normalize whitespace
    .trim();
}

/**
 * Checks whether an error code indicates browser autoplay or permission policy blocking.
 */
export function isAudioBlockedError(errorCode?: string): boolean {
  if (!errorCode) return false;
  const code = errorCode.toLowerCase();
  return code === 'not-allowed' || code === 'blocked' || code === 'audio-busy';
}

/**
 * Selects the highest quality, friendly English voice available in the browser.
 */
export function selectBestChefVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  // 1. Natural, neural, or friendly expressive voices
  const naturalVoice = voices.find(
    (v) =>
      v.lang.startsWith('en') &&
      (v.name.includes('Natural') ||
        v.name.includes('Neural') ||
        v.name.includes('Google') ||
        v.name.includes('Samantha') ||
        v.name.includes('Karen') ||
        v.name.includes('Victoria') ||
        v.name.includes('Jenny') ||
        v.name.includes('Guy'))
  );
  if (naturalVoice) return naturalVoice;

  // 2. Any en-US voice
  const enUs = voices.find((v) => v.lang === 'en-US');
  if (enUs) return enUs;

  // 3. Any English voice
  const anyEnglish = voices.find((v) => v.lang.startsWith('en'));
  if (anyEnglish) return anyEnglish;

  // 4. Default system voice
  return voices[0] || null;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || !hasUserInteracted) return null;
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
      stopChefSpeech();
    }
  }
  muteListeners.forEach((l) => l(muted));
}

export function subscribeChefMute(listener: MuteListener): () => void {
  muteListeners.add(listener);
  return () => muteListeners.delete(listener);
}

export function subscribeChefSpeaking(listener: SpeakListener): () => void {
  speakListeners.add(listener);
  return () => speakListeners.delete(listener);
}

function notifySpeaking(isSpeaking: boolean, word?: string) {
  speakListeners.forEach((l) => l(isSpeaking, word));
}

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

// Procedural cute chef sound effects using Web Audio API oscillators
export function playChefSound(sound: SoundEffectName): void {
  if (isMutedState) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  try {
    switch (sound) {
      case 'yummy': {
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
  } catch (err) {
    console.error('[AI Chef Audio] Web Audio playback blocked or failed:', err);
  }
}

/**
 * Speaks text using the browser's Web Speech API SpeechSynthesis.
 * Includes fallback mechanism for blocked audio, logging, and state synchronization.
 */
export function speakChefText(text: string, options?: ChefSpeechOptions): void {
  // If muted, return immediately
  if (isMutedState) {
    options?.onEnd?.();
    return;
  }

  // Check browser support
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.error('[AI Chef Speech] Web Speech API is not supported or blocked in this browser environment.');
    options?.onError?.('unsupported');
    options?.onEnd?.();
    return;
  }

  const cleanText = cleanSpeechText(text);
  if (!cleanText) {
    options?.onEnd?.();
    return;
  }

  const performSpeak = () => {
    // If user muted between scheduling and execution, abort
    if (isMutedState) {
      options?.onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
    } catch {
      // guard against browser cancellation errors
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Get voices from cache or current API
    const currentVoices =
      cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
    if (currentVoices && currentVoices.length > 0) {
      cachedVoices = currentVoices;
    }

    const selectedVoice = selectBestChefVoice(cachedVoices);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Cute, energetic, friendly chef voice profile (slightly higher pitch, upbeat cadence)
    utterance.pitch = options?.pitch ?? 1.25;
    utterance.rate = options?.rate ?? 1.08;
    utterance.volume = options?.volume ?? 1.0;

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

    // Error handling & fallback mechanism
    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      notifySpeaking(false);
      options?.onEnd?.();

      const errorCode = event.error || 'unknown';

      // Check if browser blocked audio due to autoplay restrictions or missing activation
      if (isAudioBlockedError(errorCode)) {
        console.error(
          `[AI Chef Speech] Audio playback blocked by browser policy (error: "${errorCode}"). Falling back to queued playback on user interaction.`
        );

        if (options?.queueIfBlocked) {
          queuedAudioAction = performSpeak;
          registerAutoplayResume();
        }

        // Dispatch fallback event so visual speech bubble or UI alert can be rendered
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('chef_audio_blocked', {
              detail: { text: cleanText, errorCode, reason: 'autoplay_blocked' },
            })
          );
        }
      } else if (errorCode !== 'canceled' && errorCode !== 'interrupted') {
        console.error(`[AI Chef Speech] Speech synthesis error: "${errorCode}"`, event);
      }

      options?.onError?.(errorCode);
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err: any) {
      console.error('[AI Chef Speech] Failed to execute window.speechSynthesis.speak:', err);
      notifySpeaking(false);
      options?.onError?.(err?.message || 'speak_exception');
      options?.onEnd?.();
    }
  };

  // If voices have not loaded yet in Chromium
  if (cachedVoices.length === 0 && window.speechSynthesis.getVoices().length === 0) {
    const onVoices = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      performSpeak();
    };

    if (typeof window.speechSynthesis.addEventListener === 'function') {
      window.speechSynthesis.addEventListener('voiceschanged', onVoices, { once: true });
    } else {
      window.speechSynthesis.onvoiceschanged = onVoices;
    }

    // Safety timeout in case onvoiceschanged never fires
    setTimeout(() => {
      if (cachedVoices.length === 0) {
        performSpeak();
      }
    }, 250);
  } else {
    performSpeak();
  }

  // Register interaction listener in case browser blocked autoplay
  if (options?.queueIfBlocked) {
    queuedAudioAction = performSpeak;
    registerAutoplayResume();
  }
}

/**
 * Stops all speech synthesis and resets speaking state.
 * Directly maps to window.speechSynthesis.cancel().
 */
export function stopChefSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (err) {
      console.error('[AI Chef Speech] Error canceling speech synthesis:', err);
    }
  }
  notifySpeaking(false);
  queuedAudioAction = null;
}

/**
 * Pauses speech synthesis.
 */
export function pauseChefSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.pause();
    } catch (err) {
      console.error('[AI Chef Speech] Error pausing speech synthesis:', err);
    }
    notifySpeaking(false);
  }
}

/**
 * Resumes paused speech synthesis.
 */
export function resumeChefSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.resume();
    } catch (err) {
      console.error('[AI Chef Speech] Error resuming speech synthesis:', err);
    }
    notifySpeaking(true);
  }
}

/**
 * Checks whether speech synthesis is currently paused.
 */
export function isSpeechPaused(): boolean {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.paused;
  }
  return false;
}
