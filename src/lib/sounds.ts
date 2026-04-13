let audioContext: AudioContext | null = null;

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.3,
  ramp?: { to: number; duration: number }
) {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime);
  if (ramp) {
    osc.frequency.linearRampToValueAtTime(ramp.to, ctx.currentTime + ramp.duration);
  }

  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

export const sounds = {
  correct() {
    // Cheerful two-note chime (major third)
    playTone(523, 0.15, 'sine', 0.25); // C5
    setTimeout(() => playTone(659, 0.3, 'sine', 0.25), 100); // E5
  },

  wrong() {
    // Low buzz
    playTone(200, 0.3, 'square', 0.15);
    setTimeout(() => playTone(180, 0.25, 'square', 0.12), 100);
  },

  tick() {
    // Short click
    playTone(800, 0.05, 'sine', 0.1);
  },

  streak() {
    // Ascending arpeggio
    playTone(523, 0.12, 'sine', 0.2);  // C5
    setTimeout(() => playTone(659, 0.12, 'sine', 0.2), 80);  // E5
    setTimeout(() => playTone(784, 0.12, 'sine', 0.2), 160); // G5
    setTimeout(() => playTone(1047, 0.3, 'sine', 0.25), 240); // C6
  },

  gameComplete() {
    // Victory fanfare
    const notes = [523, 659, 784, 1047, 784, 1047];
    const delays = [0, 120, 240, 360, 480, 600];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, i === notes.length - 1 ? 0.6 : 0.15, 'sine', 0.2), delays[i]);
    });
  },

  timerWarning() {
    // Urgent double-beep
    playTone(880, 0.08, 'sine', 0.15);
    setTimeout(() => playTone(880, 0.08, 'sine', 0.15), 150);
  },

  click() {
    // UI click
    playTone(600, 0.04, 'sine', 0.08);
  },
};
