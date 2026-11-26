"use client";

import React from "react";
import { Play, Pause, Repeat, Gauge, Radio, Volume2, Headphones } from "lucide-react";
import { PupitreId, Score } from "@/lib/types";
import { useAudio } from "@/context/AudioContext";

interface MultiTrackStudioPlayerProps {
  score: Score;
  compact?: boolean;
}

const SPEED_OPTIONS = [0.6, 0.75, 0.85, 1, 1.15];

/**
 * Interactive Multi-Track Brass Studio Player.
 * Supports instant live pupitre isolation, speed adjustment for practice,
 * clickable waveform scrubbing, loop, and metronome overlay.
 */
export function MultiTrackStudioPlayer({ score, compact = false }: MultiTrackStudioPlayerProps) {
  const {
    currentScore,
    activePupitre,
    isPlaying,
    progress,
    speed,
    loop,
    metronome,
    toggleScore,
    setPupitre,
    setSpeed,
    toggleLoop,
    toggleMetronome,
    seek,
  } = useAudio();

  const isThisScore = currentScore?.id === score.id;
  const isThisPlaying = isThisScore && isPlaying;
  const selectedPupitre: PupitreId = isThisScore ? activePupitre : "ensemble";
  const currentPupitreMeta =
    score.pupitres.find((p) => p.id === selectedPupitre) ?? score.pupitres[0];

  const handlePupitreClick = (id: PupitreId) => {
    if (isThisScore) {
      setPupitre(id);
      if (!isPlaying) {
        toggleScore(score, id);
      }
    } else {
      toggleScore(score, id);
    }
  };

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (!isThisScore) {
      toggleScore(score, selectedPupitre);
    }
    seek(ratio);
  };

  return (
    <div className="rounded-2xl border border-[#3F3F46]/70 bg-[#121216]/95 p-5 sm:p-6 shadow-[0_20px_50px_-20px_rgba(34,211,238,0.18)]">
      {/* Studio Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#27272A]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => toggleScore(score, selectedPupitre)}
            aria-label={
              isThisPlaying
                ? `Mettre en pause ${score.title}`
                : `Lire ${score.title} sur le pupitre ${currentPupitreMeta.label}`
            }
            className="btn-magnetic flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#22D3EE] text-[#09090B] shadow-lg shadow-[#22D3EE]/30 hover:bg-[#06B6D4]"
          >
            <span className="btn-sheen" aria-hidden="true" />
            {isThisPlaying ? (
              <Pause className="h-5 w-5 fill-current" aria-hidden="true" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" aria-hidden="true" />
            )}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 font-mono-data text-[11px] uppercase tracking-wider text-[#22D3EE]">
                <Radio className={`h-3.5 w-3.5 ${isThisPlaying ? "animate-pulse" : ""}`} aria-hidden="true" />
                Lecteur Multi-Pupitres Live
              </span>
              {isThisPlaying && (
                <span className="rounded-full bg-[#4ADE80]/15 px-2 py-0.5 font-mono-data text-[10px] font-semibold text-[#4ADE80]">
                  EN LECTURE
                </span>
              )}
            </div>
            <p className="font-display text-base sm:text-lg font-bold text-[#FAFAFA] mt-0.5">
              {score.title}
              <span className="ml-2 font-mono-data text-xs font-normal text-[#F59E0B]">
                • {currentPupitreMeta.label}
              </span>
            </p>
          </div>
        </div>

        {/* Active Tempo & Key Readout */}
        <div className="flex items-center gap-2 font-mono-data text-xs">
          <span className="rounded-lg border border-[#27272A] bg-[#09090B] px-2.5 py-1.5 text-[#FAFAFA]">
            {Math.round(score.bpm * speed)} BPM
          </span>
          <span className="rounded-lg border border-[#27272A] bg-[#09090B] px-2.5 py-1.5 text-[#F59E0B]">
            {currentPupitreMeta.transposition}
          </span>
        </div>
      </div>

      {/* Interactive Scrubbable Waveform */}
      <div className="mt-5">
        <div
          role="slider"
          tabIndex={0}
          aria-label="Position de lecture audio"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round((isThisScore ? progress : 0) * 100)}
          onClick={handleWaveformClick}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") seek((isThisScore ? progress : 0) + 0.05);
            if (e.key === "ArrowLeft") seek((isThisScore ? progress : 0) - 0.05);
          }}
          className="group relative flex h-16 cursor-pointer items-center gap-[3px] rounded-xl border border-[#27272A] bg-[#09090B] px-3 py-2"
        >
          {score.waveform.map((val, idx) => {
            const ratio = (idx + 1) / score.waveform.length;
            const active = isThisScore && ratio <= progress + 0.02;
            return (
              <div
                key={idx}
                className="flex-1 rounded-full transition-all duration-150"
                style={{
                  height: `${Math.max(18, val)}%`,
                  backgroundColor: active ? currentPupitreMeta.color : "rgba(161, 161, 170, 0.25)",
                  boxShadow: active && isThisPlaying ? `0 0 10px ${currentPupitreMeta.color}66` : "none",
                }}
              />
            );
          })}
        </div>
        <div className="mt-1.5 flex items-center justify-between font-mono-data text-[11px] text-[#A1A1AA]">
          <span>Cliquez sur la forme d&apos;onde pour sauter à un passage</span>
          <span>Durée complète : {score.durationLabel}</span>
        </div>
      </div>

      {/* Pupitre Track Selector (Switch Live!) */}
      <div className="mt-5">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
            <Headphones className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
            Isoler un pupitre en direct
          </span>
          <span className="text-xs text-[#71717A] hidden sm:inline">
            {currentPupitreMeta.instrumentRole}
          </span>
        </div>

        <div className={`grid gap-2 ${compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3"}`}>
          {score.pupitres.map((track) => {
            const active = selectedPupitre === track.id;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => handlePupitreClick(track.id)}
                aria-pressed={active}
                className={`group flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                  active
                    ? "border-[#22D3EE]/70 bg-[#22D3EE]/12 text-[#FAFAFA] shadow-[0_0_20px_-8px_rgba(34,211,238,0.5)]"
                    : "border-[#27272A] bg-[#18181B]/75 text-[#A1A1AA] hover:border-[#3F3F46] hover:bg-[#27272A]/60 hover:text-[#FAFAFA]"
                }`}
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: track.color,
                      boxShadow: active ? `0 0 10px ${track.color}` : "none",
                    }}
                  />
                  <span className="truncate text-xs font-semibold">{track.label}</span>
                </span>
                <span className="font-mono-data text-[10px] text-[#71717A] shrink-0">
                  {track.clef}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Practice Controls: Speed + Metronome + Loop */}
      <div className="mt-5 pt-4 border-t border-[#27272A] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#A1A1AA] mr-1">
            <Gauge className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
            Vitesse :
          </span>
          {SPEED_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSpeed(opt)}
              aria-pressed={speed === opt}
              className={`rounded-lg px-2.5 py-1 font-mono-data text-xs font-medium transition-colors ${
                speed === opt
                  ? "bg-[#F59E0B] text-[#09090B] font-bold"
                  : "bg-[#18181B] border border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA]"
              }`}
            >
              {opt}x
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMetronome}
            aria-pressed={metronome}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              metronome
                ? "border-[#22D3EE]/60 bg-[#22D3EE]/15 text-[#22D3EE]"
                : "border-[#27272A] bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]"
            }`}
          >
            <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            Métronome
          </button>

          <button
            type="button"
            onClick={toggleLoop}
            aria-pressed={loop}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
              loop
                ? "border-[#4ADE80]/60 bg-[#4ADE80]/15 text-[#4ADE80]"
                : "border-[#27272A] bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]"
            }`}
          >
            <Repeat className="h-3.5 w-3.5" aria-hidden="true" />
            Boucle
          </button>
        </div>
      </div>
    </div>
  );
}
