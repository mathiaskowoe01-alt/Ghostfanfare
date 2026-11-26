"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { PupitreId, Score } from "@/lib/types";
import { brassEngine } from "@/lib/brassAudioEngine";

interface AudioContextValue {
  currentScore: Score | null;
  activePupitre: PupitreId;
  isPlaying: boolean;
  progress: number;
  currentStep: number;
  speed: number;
  loop: boolean;
  metronome: boolean;
  playScore: (score: Score, pupitre?: PupitreId) => void;
  toggleScore: (score: Score, pupitre?: PupitreId) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setPupitre: (pupitre: PupitreId) => void;
  setSpeed: (speed: number) => void;
  toggleLoop: () => void;
  toggleMetronome: () => void;
  seek: (ratio: number) => void;
}

const AudioPlayerContext = createContext<AudioContextValue | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentScore, setCurrentScore] = useState<Score | null>(null);
  const [activePupitre, setActivePupitre] = useState<PupitreId>("ensemble");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeedState] = useState(1);
  const [loop, setLoopState] = useState(true);
  const [metronome, setMetronomeState] = useState(false);

  useEffect(() => {
    return () => {
      brassEngine.stop();
    };
  }, []);

  const startEngine = useCallback(
    (score: Score, pupitre: PupitreId, startStep = 0, spd = speed, lp = loop, met = metronome) => {
      setCurrentScore(score);
      setActivePupitre(pupitre);
      setIsPlaying(true);
      brassEngine.start(
        score,
        pupitre,
        { speed: spd, loop: lp, metronome: met, startStep },
        {
          onProgress: (prog, step) => {
            setProgress(prog);
            setCurrentStep(step);
          },
          onEnded: () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentStep(0);
          },
        }
      );
    },
    [speed, loop, metronome]
  );

  const playScore = useCallback(
    (score: Score, pupitre: PupitreId = "ensemble") => {
      startEngine(score, pupitre, 0);
    },
    [startEngine]
  );

  const pause = useCallback(() => {
    brassEngine.stop();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    if (!currentScore) return;
    startEngine(currentScore, activePupitre, currentStep);
  }, [currentScore, activePupitre, currentStep, startEngine]);

  const stop = useCallback(() => {
    brassEngine.stop();
    setIsPlaying(false);
    setCurrentScore(null);
    setProgress(0);
    setCurrentStep(0);
  }, []);

  const toggleScore = useCallback(
    (score: Score, pupitre?: PupitreId) => {
      const targetPupitre = pupitre ?? (currentScore?.id === score.id ? activePupitre : "ensemble");
      if (currentScore?.id === score.id && isPlaying) {
        if (pupitre && pupitre !== activePupitre) {
          setActivePupitre(pupitre);
          brassEngine.setPupitre(pupitre);
        } else {
          pause();
        }
      } else if (currentScore?.id === score.id && !isPlaying) {
        startEngine(score, targetPupitre, currentStep);
      } else {
        startEngine(score, targetPupitre, 0);
      }
    },
    [currentScore, isPlaying, activePupitre, currentStep, pause, startEngine]
  );

  const setPupitre = useCallback(
    (pupitre: PupitreId) => {
      setActivePupitre(pupitre);
      brassEngine.setPupitre(pupitre);
    },
    []
  );

  const setSpeed = useCallback((nextSpeed: number) => {
    setSpeedState(nextSpeed);
    brassEngine.setSpeed(nextSpeed);
  }, []);

  const toggleLoop = useCallback(() => {
    setLoopState((prev) => {
      const next = !prev;
      brassEngine.setLoop(next);
      return next;
    });
  }, []);

  const toggleMetronome = useCallback(() => {
    setMetronomeState((prev) => {
      const next = !prev;
      brassEngine.setMetronome(next);
      return next;
    });
  }, []);

  const seek = useCallback((ratio: number) => {
    const clamped = Math.max(0, Math.min(0.99, ratio));
    setProgress(clamped);
    brassEngine.seekProgress(clamped);
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        currentScore,
        activePupitre,
        isPlaying,
        progress,
        currentStep,
        speed,
        loop,
        metronome,
        playScore,
        toggleScore,
        pause,
        resume,
        stop,
        setPupitre,
        setSpeed,
        toggleLoop,
        toggleMetronome,
        seek,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}
