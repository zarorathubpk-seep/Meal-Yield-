import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanSpeechText,
  isAudioBlockedError,
  selectBestChefVoice,
  isChefMuted,
  setChefMuted,
  subscribeChefMute,
} from './chefAudio';

test('cleanSpeechText removes markdown bold, italic, code, headers and links', () => {
  const raw = '### Recipe: **Chicken Karahi**\n\nThis is a *delicious* dish cooked with `fresh ginger`! See [More Tips](https://mealyield.com/tips). Enjoy!';
  const cleaned = cleanSpeechText(raw);
  assert.equal(
    cleaned,
    'Recipe: Chicken Karahi This is a delicious dish cooked with fresh ginger! See More Tips. Enjoy!'
  );
});

test('cleanSpeechText handles empty or whitespace input safely', () => {
  assert.equal(cleanSpeechText(''), '');
  assert.equal(cleanSpeechText('   \n  \t  '), '');
});

test('cleanSpeechText removes bullet points and collapses extra whitespace', () => {
  const input = 'Key Steps:\n- Sear the chicken\n- Add tomatoes\n• Simmer gently';
  const cleaned = cleanSpeechText(input);
  assert.equal(cleaned, 'Key Steps: Sear the chicken Add tomatoes Simmer gently');
});

test('isAudioBlockedError identifies browser policy blocked errors', () => {
  assert.equal(isAudioBlockedError('not-allowed'), true);
  assert.equal(isAudioBlockedError('NOT-ALLOWED'), true);
  assert.equal(isAudioBlockedError('blocked'), true);
  assert.equal(isAudioBlockedError('audio-busy'), true);
  assert.equal(isAudioBlockedError('canceled'), false);
  assert.equal(isAudioBlockedError('interrupted'), false);
  assert.equal(isAudioBlockedError(undefined), false);
  assert.equal(isAudioBlockedError(''), false);
});

test('selectBestChefVoice prioritizes natural and English voices', () => {
  const mockVoices = [
    { name: 'es-ES Voice', lang: 'es-ES' } as unknown as SpeechSynthesisVoice,
    { name: 'Microsoft David', lang: 'en-US' } as unknown as SpeechSynthesisVoice,
    { name: 'Google US English Natural', lang: 'en-US' } as unknown as SpeechSynthesisVoice,
  ];

  const selected = selectBestChefVoice(mockVoices);
  assert.ok(selected);
  assert.equal(selected.name, 'Google US English Natural');

  // Fallback to en-US if natural is not present
  const standardVoices = [
    { name: 'fr-FR Voice', lang: 'fr-FR' } as unknown as SpeechSynthesisVoice,
    { name: 'Standard US', lang: 'en-US' } as unknown as SpeechSynthesisVoice,
  ];
  assert.equal(selectBestChefVoice(standardVoices)?.name, 'Standard US');

  // Empty list returns null
  assert.equal(selectBestChefVoice([]), null);
});

test('subscribeChefMute triggers listener when mute state changes', () => {
  let latestMute = isChefMuted();
  const unsubscribe = subscribeChefMute((muted) => {
    latestMute = muted;
  });

  setChefMuted(true);
  assert.equal(latestMute, true);
  assert.equal(isChefMuted(), true);

  setChefMuted(false);
  assert.equal(latestMute, false);
  assert.equal(isChefMuted(), false);

  unsubscribe();
});
