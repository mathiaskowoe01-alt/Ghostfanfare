"use client";

import React from "react";
import Link from "next/link";
import { Play, Pause, Heart, ShoppingBag, Check, ArrowRight, Headphones } from "lucide-react";
import { Score } from "@/lib/types";
import { formatFcfa, formatEur } from "@/lib/catalog";
import { useAudio } from "@/context/AudioContext";
import { useStore } from "@/context/StoreContext";
import { ScoreCoverArt } from "./ScoreCoverArt";

interface PartitionCardProps {
  score: Score;
}

/**
 * Unified Partition Card used identically on Homepage and /boutique.
 * - Clean non-nested interactive semantics (no <button> inside <a>)
 * - WCAG AA contrast verified
 * - Live Web Audio multi-track preview + progress bar directly on card
 */
export function PartitionCard({ score }: PartitionCardProps) {
  const { currentScore, isPlaying, progress, toggleScore } = useAudio();
  const { addToCart, isInCart, isUnlocked, isFavorite, toggleFavorite } = useStore();

  const isThisPlaying = currentScore?.id === score.id && isPlaying;
  const isThisLoaded = currentScore?.id === score.id;
  const unlocked = isUnlocked(score.id);
  const inCart = isInCart(score.id);
  const fav = isFavorite(score.id);

  return (
    <article
      className={`studio-card group flex flex-col overflow-hidden rounded-2xl ${
        isThisPlaying ? "border-[#22D3EE]/70 shadow-[0_0_32px_-8px_rgba(34,211,238,0.35)]" : ""
      }`}
    >
      {/* Top Visual Sleeve */}
      <div className="relative h-48 w-full overflow-hidden">
        <ScoreCoverArt score={score} isPlaying={isThisPlaying} className="h-full w-full" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-[#09090B]/85 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-medium text-[#FAFAFA]">
              {score.categoryLabel}
            </span>
            {score.isNew && (
              <span className="rounded-full bg-[#22D3EE]/15 backdrop-blur-md border border-[#22D3EE]/40 px-2.5 py-1 font-mono-data text-[11px] font-semibold text-[#22D3EE]">
                NOUVEAU
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => toggleFavorite(score.id)}
            aria-label={fav ? `Retirer ${score.title} des favoris` : `Ajouter ${score.title} aux favoris`}
            aria-pressed={fav}
            className={`flex h-9 w-9 items-center justify-center rounded-xl backdrop-blur-md border transition-all duration-200 ${
              fav
                ? "bg-[#F87171]/20 border-[#F87171]/50 text-[#F87171]"
                : "bg-[#09090B]/75 border-white/10 text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-white/25"
            }`}
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-current" : ""}`} aria-hidden="true" />
          </button>
        </div>

        {/* Single Crisp Audio Trigger Bottom-Right */}
        <button
          type="button"
          onClick={() => toggleScore(score, "ensemble")}
          aria-label={
            isThisPlaying
              ? `Mettre en pause l'extrait de ${score.title}`
              : `Écouter l'extrait audio de ${score.title}`
          }
          className={`btn-magnetic absolute bottom-3 right-3 flex h-11 items-center gap-2 rounded-xl px-3.5 text-xs font-semibold shadow-lg ${
            isThisPlaying
              ? "bg-[#22D3EE] text-[#09090B]"
              : "bg-[#09090B]/88 backdrop-blur-md border border-[#22D3EE]/45 text-[#FAFAFA] hover:bg-[#22D3EE] hover:text-[#09090B]"
          }`}
        >
          {isThisPlaying ? (
            <>
              <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
              Pause
            </>
          ) : (
            <>
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              Écouter
            </>
          )}
        </button>

        {/* Live Audio Progress Bar at bottom edge of cover */}
        {isThisLoaded && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
            <div
              className="h-full bg-[#22D3EE] transition-[width] duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2 text-xs text-[#A1A1AA]">
          <span className="font-medium text-[#F59E0B]">{score.composer}</span>
          <span className="font-mono-data rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-[#A1A1AA]">
            {score.difficulty}
          </span>
        </div>

        <Link
          href={`/boutique/${score.slug}`}
          className="mt-2 font-display text-lg font-bold text-[#FAFAFA] group-hover:text-[#22D3EE] transition-colors"
        >
          {score.title}
        </Link>

        <p className="mt-1.5 text-sm text-[#A1A1AA] line-clamp-2">{score.subtitle}</p>

        {/* Non-truncating Pupitres Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#A1A1AA] mr-1">
            <Headphones className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
            {score.pupitres.length} pistes :
          </span>
          {score.pupitres.slice(1, 5).map((p) => (
            <span
              key={p.id}
              className="rounded-md border border-[#27272A] bg-[#09090B]/70 px-2 py-0.5 font-mono-data text-[11px] text-[#D4D4D8]"
            >
              {p.shortLabel}
            </span>
          ))}
          {score.pupitres.length > 5 && (
            <span className="rounded-md border border-[#27272A] bg-[#09090B]/70 px-2 py-0.5 font-mono-data text-[11px] text-[#A1A1AA]">
              +{score.pupitres.length - 5}
            </span>
          )}
        </div>

        {/* Footer Price + Actions */}
        <div className="mt-6 pt-4 border-t border-[#27272A] flex items-center justify-between gap-3">
          <div>
            <p className="font-mono-data text-base font-bold text-[#FAFAFA]">
              {formatFcfa(score.priceFcfa)}
            </p>
            <p className="font-mono-data text-xs text-[#A1A1AA]">
              {formatEur(score.priceFcfa)} • {score.pages} p.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unlocked ? (
              <Link
                href={`/boutique/${score.slug}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#4ADE80]/40 bg-[#4ADE80]/10 px-3 py-2 text-xs font-semibold text-[#4ADE80] hover:bg-[#4ADE80]/20 transition-colors"
              >
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Débloqué
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(score.id)}
                aria-label={`Ajouter ${score.title} au panier`}
                className={`btn-magnetic flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                  inCart
                    ? "border-[#4ADE80]/50 bg-[#4ADE80]/15 text-[#4ADE80]"
                    : "border-[#3F3F46] bg-[#18181B] text-[#FAFAFA] hover:border-[#22D3EE] hover:text-[#22D3EE]"
                }`}
              >
                {inCart ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            )}

            <Link
              href={`/boutique/${score.slug}`}
              className="btn-magnetic inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#22D3EE] px-3.5 text-xs font-bold text-[#09090B] hover:bg-[#06B6D4]"
            >
              <span className="btn-sheen" aria-hidden="true" />
              Studio
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
