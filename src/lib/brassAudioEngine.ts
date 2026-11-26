"use client";

import { PupitreId, Score } from "./types";

/**
 * GhostFanfare Studio Brass Multi-Track Engine (Web Audio API)
 * ------------------------------------------------------------
 * Plays real synthesized polyphonic brass tracks per pupitre
 * (Ensemble, Trompette 1, Trompette 2, Cornet, Trombone, Tuba)
 * with live speed control (0.6x–1.15x), metronome, seamless
 * real-time pupitre switching, and live visual level meters.
 */

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

interface BrassVoiceProfile {
  cutoffBase: number;
  cutoffPeak: number;
  attack: number;
  decay: number;
  gain: number;
  detuneCents: number;
  oscType: OscillatorType;
}

const VOICE_PROFILES: Record<Exclude<PupitreId, "ensemble">, BrassVoiceProfile> = {
  "trompette-1": {
    cutoffBase: 900,
    cutoffPeak: 3600,
    attack: 0.025,
    decay: 0.14,
    gain: 0.24,
    detuneCents: 4,
    oscType: "sawtooth",
  },
  "trompette-2": {
    cutoffBase: 750,
    cutoffPeak: 2800,
    attack: 0.03,
    decay: 0.15,
    gain: 0.19,
    detuneCents: -5,
    oscType: "sawtooth",
  },
  cornet: {
    cutoffBase: 650,
    cutoffPeak: 2100,
    attack: 0.035,
    decay: 0.18,
    gain: 0.18,
    detuneCents: 6,
    oscType: "sawtooth",
  },
  trombone: {
    cutoffBase: 480,
    cutoffPeak: 1700,
    attack: 0.04,
    decay: 0.18,
    gain: 0.22,
    detuneCents: -4,
    oscType: "sawtooth",
  },
  tuba: {
    cutoffBase: 260,
    cutoffPeak: 820,
    attack: 0.045,
    decay: 0.22,
    gain: 0.28,
    detuneCents: 0,
    oscType: "sawtooth",
  },
};

export interface EngineCallbacks {
  onProgress: (progress: number, currentStep: number, elapsedSec: number) => void;
  onEnded: () => void;
}

class BrassAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;

  private score: Score | null = null;
  private pupitre: PupitreId = "ensemble";
  private speed = 1;
  private loop = true;
  private metronome = false;
  private isPlaying = false;

  private stepIndex = 0;
  private totalSteps = 32;
  private callbacks: EngineCallbacks | null = null;

  private ensureContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.72;

      // Subtle compressor for cohesive brass section punch
      const comp = this.ctx.createDynamicsCompressor();
      comp.threshold.value = -16;
      comp.knee.value = 18;
      comp.ratio.value = 5;
      comp.attack.value = 0.006;
      comp.release.value = 0.15;

      this.masterGain.connect(comp);
      comp.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playBrassNote(
    ctx: AudioContext,
    midi: number,
    durationSec: number,
    profile: BrassVoiceProfile,
    volumeMultiplier = 1
  ) {
    if (!this.masterGain) return;
    const now = ctx.currentTime + 0.01;
    const freq = midiToFreq(midi);

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = profile.oscType;
    osc2.type = "triangle";
    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq, now);
    osc1.detune.setValueAtTime(profile.detuneCents, now);
    osc2.detune.setValueAtTime(-profile.detuneCents * 0.6, now);

    // Brass formant filter envelope ("blat" attack into warm sustain)
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 2.6;
    filter.frequency.setValueAtTime(profile.cutoffBase, now);
    filter.frequency.exponentialRampToValueAtTime(profile.cutoffPeak, now + profile.attack);
    filter.frequency.exponentialRampToValueAtTime(
      profile.cutoffBase * 1.65,
      now + Math.min(durationSec * 0.75, profile.attack + profile.decay)
    );

    const amp = ctx.createGain();
    const peakGain = profile.gain * volumeMultiplier;
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.linearRampToValueAtTime(peakGain, now + profile.attack);
    amp.gain.exponentialRampToValueAtTime(peakGain * 0.72, now + profile.attack + profile.decay * 0.6);
    amp.gain.setValueAtTime(peakGain * 0.68, Math.max(now + profile.attack + 0.02, now + durationSec - 0.04));
    amp.gain.exponentialRampToValueAtTime(0.0001, now + durationSec + 0.04);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(amp);
    amp.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + durationSec + 0.06);
    osc2.stop(now + durationSec + 0.06);
  }

  private playPercussion(ctx: AudioContext, hit: "K" | "S" | "R", gainScale = 1) {
    if (!this.masterGain) return;
    const now = ctx.currentTime + 0.01;

    if (hit === "K") {
      // Marching bass drum
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.14);
      gain.gain.setValueAtTime(0.32 * gainScale, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      // Crisp marching snare or mini-roll
      const bursts = hit === "R" ? [0, 0.045, 0.09] : [0];
      bursts.forEach((offset) => {
        const bufferSize = Math.floor(ctx.sampleRate * 0.085);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const hp = ctx.createBiquadFilter();
        hp.type = "bandpass";
        hp.frequency.value = 1800;
        hp.Q.value = 0.9;
        const g = ctx.createGain();
        g.gain.setValueAtTime((hit === "R" ? 0.14 : 0.2) * gainScale, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.085);
        noise.connect(hp);
        hp.connect(g);
        g.connect(this.masterGain!);
        noise.start(now + offset);
      });
    }
  }

  private playMetronomeClick(ctx: AudioContext, accent: boolean) {
    if (!this.masterGain) return;
    const now = ctx.currentTime + 0.005;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(accent ? 1480 : 980, now);
    g.gain.setValueAtTime(accent ? 0.18 : 0.11, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  private getStepDurationSec(): number {
    if (!this.score) return 0.25;
    // Each step = 1 eighth note (half a beat)
    return 60 / (this.score.bpm * this.speed) / 2;
  }

  private calcNoteDuration(arr: (number | null)[], index: number, stepSec: number): number {
    let steps = 1;
    let cursor = index + 1;
    while (cursor < arr.length && arr[cursor] === -1) {
      steps++;
      cursor++;
    }
    return steps * stepSec * 0.94;
  }

  private triggerStep() {
    if (!this.score || !this.isPlaying) return;
    const ctx = this.ensureContext();
    const stepSec = this.getStepDurationSec();
    const p = this.score.pattern;
    const i = this.stepIndex % this.totalSteps;

    // Optional metronome on every quarter-note beat (even 8th-note steps)
    if (this.metronome && i % 2 === 0) {
      this.playMetronomeClick(ctx, i % 8 === 0);
    }

    const voices: { id: Exclude<PupitreId, "ensemble">; arr: (number | null)[] }[] = [
      { id: "trompette-1", arr: p.trumpet1 },
      { id: "trompette-2", arr: p.trumpet2 },
      { id: "cornet", arr: p.cornet },
      { id: "trombone", arr: p.trombone },
      { id: "tuba", arr: p.tuba },
    ];

    voices.forEach(({ id, arr }) => {
      const note = arr[i];
      if (note === null || note === undefined || note === -1) return;

      // Full volume for active pupitre (or ensemble), subtle 10% guide when practicing solo
      let vol = 0;
      if (this.pupitre === "ensemble") {
        vol = 0.78;
      } else if (this.pupitre === id) {
        vol = 1.15;
      } else if (id === "tuba") {
        // Very quiet harmonic pulse reference when isolating an upper brass voice
        vol = 0.08;
      }

      if (vol > 0) {
        const dur = this.calcNoteDuration(arr, i, stepSec);
        this.playBrassNote(ctx, note, dur, VOICE_PROFILES[id], vol);
      }
    });

    const perc = p.percussion[i];
    if (perc) {
      const percVol = this.pupitre === "ensemble" ? 0.85 : 0.22;
      this.playPercussion(ctx, perc, percVol);
    }

    const elapsedSec = i * stepSec;
    const progress = (i + 1) / this.totalSteps;
    this.callbacks?.onProgress(progress, i, elapsedSec);

    this.stepIndex++;
    if (this.stepIndex >= this.totalSteps) {
      if (this.loop) {
        this.stepIndex = 0;
      } else {
        this.stop();
        this.callbacks?.onEnded();
        return;
      }
    }

    this.timerId = window.setTimeout(() => this.triggerStep(), stepSec * 1000);
  }

  public start(
    score: Score,
    pupitre: PupitreId,
    options: { speed?: number; loop?: boolean; metronome?: boolean; startStep?: number },
    callbacks: EngineCallbacks
  ) {
    this.stop();
    this.score = score;
    this.pupitre = pupitre;
    this.speed = options.speed ?? 1;
    this.loop = options.loop ?? true;
    this.metronome = options.metronome ?? false;
    this.totalSteps = score.pattern.trumpet1.length;
    this.stepIndex = options.startStep ?? 0;
    this.callbacks = callbacks;
    this.isPlaying = true;

    this.ensureContext();
    this.triggerStep();
  }

  public setPupitre(pupitre: PupitreId) {
    this.pupitre = pupitre;
  }

  public setSpeed(speed: number) {
    this.speed = speed;
  }

  public setLoop(loop: boolean) {
    this.loop = loop;
  }

  public setMetronome(metronome: boolean) {
    this.metronome = metronome;
  }

  public seekProgress(ratio: number) {
    const clamped = Math.max(0, Math.min(0.99, ratio));
    this.stepIndex = Math.floor(clamped * this.totalSteps);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

export const brassEngine = new BrassAudioEngine();
