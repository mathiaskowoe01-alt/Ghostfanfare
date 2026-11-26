"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  Heart,
  FileText,
  Lightbulb,
  ShieldCheck,
  Clock,
  Music,
  Gauge,
  Layers,
} from "lucide-react";
import { Score } from "@/lib/types";
import { SCORES, formatFcfa, formatEur } from "@/lib/catalog";
import { useStore } from "@/context/StoreContext";
import { useAudio } from "@/context/AudioContext";
import { MultiTrackStudioPlayer } from "./MultiTrackStudioPlayer";
import { SheetPreview } from "./SheetPreview";
import { PartitionCard } from "./PartitionCard";

interface ScoreDetailViewProps {
  score: Score;
}

export function ScoreDetailView({ score }: ScoreDetailViewProps) {
  const { addToCart, isInCart, isUnlocked, isFavorite, toggleFavorite } = useStore();
  const { currentScore, isPlaying, currentStep } = useAudio();

  const unlocked = isUnlocked(score.id);
  const inCart = isInCart(score.id);
  const fav = isFavorite(score.id);
  const isThisPlaying = currentScore?.id === score.id && isPlaying;

  const related = SCORES.filter((s) => s.id !== score.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-10 sm:py-14">
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-8 flex items-center gap-2 text-xs text-[#A1A1AA]">
        <Link href="/boutique" className="inline-flex items-center gap-1.5 hover:text-[#22D3EE] transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Retour au catalogue
        </Link>
        <span>/</span>
        <span className="text-[#FAFAFA]">{score.title}</span>
      </nav>

      {/* Main 2-Column Studio Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        {/* Left: Title + Multi-Track Audio Studio + Watermarked Sheet Preview */}
        <div className="space-y-8 min-w-0">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#22D3EE]/35 bg-[#22D3EE]/10 px-3 py-1 font-mono-data text-xs font-semibold text-[#22D3EE]">
                {score.categoryLabel}
              </span>
              <span className="rounded-full border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-3 py-1 font-mono-data text-xs font-semibold text-[#F59E0B]">
                {score.difficulty}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-extrabold text-[#FAFAFA]">
              {score.title}
            </h1>
            <p className="mt-2 text-base text-[#A1A1AA]">{score.subtitle}</p>
            <p className="mt-2 text-sm text-[#71717A]">
              Compositeur : <span className="text-[#FAFAFA] font-medium">{score.composer}</span> •
              Arrangement : <span className="text-[#FAFAFA] font-medium">{score.arranger}</span>
            </p>
          </div>

          {/* Interactive Multi-Track Brass Studio Player */}
          <MultiTrackStudioPlayer score={score} />

          {/* Protected Sheet Music Preview with Live Beat Cursor */}
          <div>
            <h2 className="font-display text-xl font-bold text-[#FAFAFA] mb-4">
              Aperçu de la Portée (Trompette 1 — {score.key})
            </h2>
            <SheetPreview
              score={score}
              unlocked={unlocked}
              activeStep={isThisPlaying ? currentStep : 0}
              isPlaying={isThisPlaying}
              onUnlockClick={() => addToCart(score.id)}
            />
          </div>

          {/* Practice Tip & Description */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#27272A] bg-[#121216] p-6">
              <h2 className="font-display text-lg font-bold text-[#FAFAFA]">
                À propos de l&apos;arrangement
              </h2>
              <p className="mt-3 text-sm text-[#A1A1AA] leading-relaxed">{score.description}</p>
            </div>

            <div className="rounded-2xl border border-[#F59E0B]/30 bg-gradient-to-br from-[#F59E0B]/10 to-[#121216] p-6">
              <h2 className="inline-flex items-center gap-2 font-display text-lg font-bold text-[#FAFAFA]">
                <Lightbulb className="h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
                Conseil du Chef de Pupitre
              </h2>
              <p className="mt-3 text-sm text-[#E4E4E7] leading-relaxed">{score.practiceTip}</p>
            </div>
          </div>
        </div>

        {/* Right: Sticky Purchase & Specs Card */}
        <aside className="lg:sticky lg:top-28 h-fit space-y-6">
          <div className="rounded-2xl border border-[#3F3F46]/80 bg-[#121216] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono-data text-xs uppercase tracking-wider text-[#A1A1AA]">
                  Pack Complet PDF + Audio
                </p>
                <p className="mt-1 font-mono-data text-3xl font-bold text-[#FAFAFA]">
                  {formatFcfa(score.priceFcfa)}
                </p>
                <p className="font-mono-data text-xs text-[#22D3EE] mt-0.5">
                  Équivalent {formatEur(score.priceFcfa)} • Accès à vie
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(score.id)}
                aria-label={fav ? "Retirer des favoris" : "Ajouter aux favoris"}
                aria-pressed={fav}
                className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                  fav
                    ? "border-[#F87171]/50 bg-[#F87171]/15 text-[#F87171]"
                    : "border-[#27272A] bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]"
                }`}
              >
                <Heart className={`h-5 w-5 ${fav ? "fill-current" : ""}`} aria-hidden="true" />
              </button>
            </div>

            {/* Primary Action */}
            <div className="mt-6 space-y-3">
              {unlocked ? (
                <Link
                  href="/espace"
                  className="btn-magnetic flex w-full items-center justify-center gap-2 rounded-xl bg-[#4ADE80] px-5 py-3.5 text-sm font-bold text-[#09090B]"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Débloqué — Ouvrir dans Mon Espace
                </Link>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => addToCart(score.id)}
                    className="btn-magnetic flex w-full items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-5 py-3.5 text-sm font-bold text-[#09090B] shadow-lg shadow-[#22D3EE]/25 hover:bg-[#06B6D4]"
                  >
                    <span className="btn-sheen" aria-hidden="true" />
                    <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                    {inCart
                      ? "Déjà dans votre panier"
                      : `Ajouter au panier — ${formatFcfa(score.priceFcfa)}`}
                  </button>
                  {inCart && (
                    <Link
                      href="/panier"
                      className="flex w-full items-center justify-center rounded-xl border border-[#22D3EE]/50 bg-[#22D3EE]/10 px-5 py-3 text-sm font-semibold text-[#22D3EE] hover:bg-[#22D3EE]/20 transition-colors"
                    >
                      Finaliser ma commande →
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Technical Specs Grid (Zero truncation!) */}
            <div className="mt-6 grid grid-cols-2 gap-3 pt-6 border-t border-[#27272A]">
              {[
                { icon: Music, label: "Tonalité", value: `${score.key} (${score.timeSignature})` },
                { icon: Gauge, label: "Tempo", value: `${score.bpm} BPM` },
                { icon: Clock, label: "Durée", value: score.durationLabel },
                { icon: FileText, label: "Pagination", value: `${score.pages} pages PDF` },
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="rounded-xl border border-[#27272A] bg-[#09090B]/70 p-3"
                  >
                    <p className="inline-flex items-center gap-1.5 text-[11px] text-[#A1A1AA]">
                      <Icon className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
                      {spec.label}
                    </p>
                    <p className="mt-1 font-mono-data text-sm font-semibold text-[#FAFAFA]">
                      {spec.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Complete Pupitres List (Fully visible, never truncated!) */}
            <div className="mt-5 pt-5 border-t border-[#27272A]">
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-3">
                <Layers className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                Tous les pupitres inclus ({score.pupitres.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {score.pupitres.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] bg-[#18181B] px-2.5 py-1 text-xs text-[#E4E4E7]"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: p.color }}
                      aria-hidden="true"
                    />
                    {p.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Included Files Checklist */}
            <div className="mt-5 pt-5 border-t border-[#27272A]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-3">
                Ce que vous recevez instantanément
              </p>
              <ul className="space-y-2.5 text-xs text-[#D4D4D8]">
                {score.includedFiles.map((file) => (
                  <li key={file} className="flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#4ADE80] mt-0.5" aria-hidden="true" />
                    <span>{file}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar Scores */}
      <section className="mt-20 pt-14 border-t border-[#27272A]">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
          Arrangements Similaires
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.map((item) => (
            <PartitionCard key={item.id} score={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
