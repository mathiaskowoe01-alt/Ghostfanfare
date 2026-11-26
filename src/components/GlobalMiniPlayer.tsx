"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, X, ExternalLink } from "lucide-react";
import { useAudio } from "@/context/AudioContext";

export function GlobalMiniPlayer() {
  const { currentScore, activePupitre, isPlaying, progress, pause, resume, stop, setPupitre } =
    useAudio();

  return (
    <AnimatePresence>
      {currentScore && (
        <motion.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-4 inset-x-4 z-40 mx-auto max-w-4xl"
        >
          <div className="overflow-hidden rounded-2xl border border-[#22D3EE]/40 bg-[#0F1014]/95 backdrop-blur-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)]">
            {/* Progress hairline */}
            <div className="h-1 w-full bg-[#27272A]">
              <div
                className="h-full bg-gradient-to-r from-[#22D3EE] to-[#F59E0B] transition-[width] duration-150"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              {/* Left: Play + Info */}
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={isPlaying ? pause : resume}
                  aria-label={isPlaying ? "Mettre en pause" : "Reprendre la lecture"}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#22D3EE] text-[#09090B] hover:bg-[#06B6D4] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
                  ) : (
                    <Play className="h-4 w-4 fill-current ml-0.5" aria-hidden="true" />
                  )}
                </button>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold text-[#FAFAFA]">
                    {currentScore.title}
                  </p>
                  <p className="truncate font-mono-data text-[11px] text-[#22D3EE]">
                    {currentScore.pupitres.find((p) => p.id === activePupitre)?.label ?? "Ensemble"} •{" "}
                    {currentScore.key} • {currentScore.bpm} BPM
                  </p>
                </div>
              </div>

              {/* Center: Quick Pupitre Switcher */}
              <div className="hidden md:flex items-center gap-1.5">
                {currentScore.pupitres.slice(0, 5).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPupitre(p.id)}
                    className={`rounded-lg px-2.5 py-1 font-mono-data text-[11px] font-medium transition-colors ${
                      activePupitre === p.id
                        ? "bg-[#22D3EE]/20 text-[#22D3EE] border border-[#22D3EE]/50"
                        : "bg-[#18181B] text-[#A1A1AA] border border-[#27272A] hover:text-[#FAFAFA]"
                    }`}
                  >
                    {p.shortLabel}
                  </button>
                ))}
              </div>

              {/* Right: Open Studio + Close */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/boutique/${currentScore.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs font-semibold text-[#FAFAFA] hover:border-[#22D3EE]/60 hover:text-[#22D3EE] transition-colors"
                >
                  Ouvrir
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={stop}
                  aria-label="Fermer le lecteur audio"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#A1A1AA] hover:bg-white/10 hover:text-[#FAFAFA]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
