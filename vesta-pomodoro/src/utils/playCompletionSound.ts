type WindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export function playCompletionSound() {
  const AudioContextConstructor =
    window.AudioContext ??
    (window as WindowWithWebkitAudio).webkitAudioContext;

  if (!AudioContextConstructor) return;

  try {
    const audioContext = new AudioContextConstructor();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, now);
    oscillator.frequency.exponentialRampToValueAtTime(660, now + 0.18);
    oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.42);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.72);
    oscillator.addEventListener('ended', () => {
      void audioContext.close();
    });
  } catch {
    // A conclusão visual continua funcionando quando áudio não está disponível.
  }
}
