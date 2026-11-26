"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  FileMusic,
  Headphones,
  Sparkles,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  Star,
  CheckCircle2,
  Play,
} from "lucide-react";
import { SCORES, TESTIMONIALS } from "@/lib/catalog";
import { PartitionCard } from "./PartitionCard";
import { MultiTrackStudioPlayer } from "./MultiTrackStudioPlayer";
import { AnimatedCounter } from "./AnimatedCounter";

const ROTATING_PHRASES = [
  "Puissance Cuivres",
  "Précision Si♭",
  "Son de Fanfare",
];

export function HomeView() {
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const featuredScores = SCORES.filter((s) => s.featured);
  const demoScore = SCORES[0];

  return (
    <div className="relative overflow-x-clip">
      {/* =================================================================
          HERO SECTION — Neon War Room + Live Brass Studio Showcase
          ================================================================= */}
      <section className="relative pt-14 pb-20 sm:pt-20 sm:pb-28">
        {/* Ambient Studio Gradients */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[480px] w-[780px] rounded-full opacity-25 blur-[130px]"
          style={{
            background: "radial-gradient(circle, #22D3EE 0%, #F59E0B 48%, transparent 72%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle Animated 5-line Neon Musical Staff (Desktop only to prevent mobile text collision) */}
        <svg
          viewBox="0 0 1440 320"
          className="pointer-events-none absolute top-10 inset-x-0 w-full h-72 opacity-20 hidden md:block animate-staff-drift"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 16, 32, 48, 64].map((offset, i) => (
            <path
              key={offset}
              d={`M0 ${120 + offset} Q360 ${50 + offset} 720 ${125 + offset} T1440 ${110 + offset}`}
              stroke={i === 2 ? "#F59E0B" : "#22D3EE"}
              strokeWidth={i === 2 ? "1.6" : "1"}
              fill="none"
              strokeOpacity={i === 2 ? 0.65 : 0.45}
            />
          ))}
        </svg>

        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/35 bg-[#22D3EE]/10 px-4 py-1.5 font-mono-data text-xs font-medium text-[#22D3EE]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
              ACADÉMIE DIGITALE DES FANFARISTES &amp; TROMPETTISTES
            </motion.div>

            {/* Accessible H1 with smooth whole-phrase animation (never letter-split) */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.08 }}
              className="mt-6 font-display text-4xl sm:text-6xl lg:text-[4.6rem] font-extrabold tracking-tight text-[#FAFAFA] leading-[1.06]"
            >
              Élevez Votre
              <span className="mt-2 block min-h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING_PHRASES[phraseIdx]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="inline-block bg-gradient-to-r from-[#22D3EE] via-[#67E8F9] to-[#F59E0B] bg-clip-text text-transparent"
                  >
                    {ROTATING_PHRASES[phraseIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[#A1A1AA] leading-relaxed"
            >
              Portées PDF filigranées en <span className="font-mono-data text-[#FAFAFA]">Si♭ / Mi♭ / Fa / Ut</span> et
              pistes audio studio isolées par pupitre (<strong className="text-[#FAFAFA] font-medium">Trompette 1, Trompette 2, Cornet, Trombone, Tuba</strong>).
              Répétez à votre rythme et brillez dès la première mesure.
            </motion.p>

            {/* Dual CTAs (WCAG AA compliant: dark text on bright cyan) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                href="/boutique"
                className="btn-magnetic inline-flex h-13 items-center gap-2 rounded-xl bg-[#22D3EE] px-7 text-sm sm:text-base font-bold text-[#09090B] shadow-[0_12px_34px_-8px_rgba(34,211,238,0.55)] hover:bg-[#06B6D4]"
              >
                <span className="btn-sheen" aria-hidden="true" />
                Explorer le catalogue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <a
                href="#studio-live"
                className="btn-magnetic inline-flex h-13 items-center gap-2 rounded-xl border border-[#3F3F46] bg-[#18181B]/85 backdrop-blur-md px-6 text-sm sm:text-base font-semibold text-[#FAFAFA] hover:border-[#22D3EE]/60 hover:bg-[#27272A]"
              >
                <Play className="h-4 w-4 text-[#22D3EE] fill-current" aria-hidden="true" />
                Tester le lecteur multi-pupitres
              </a>
            </motion.div>

            {/* Clean Flex Trust Pills (zero orphan bullet on mobile wrap) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.34 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#A1A1AA]"
            >
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#4ADE80]" aria-hidden="true" />
                Téléchargement PDF &amp; MP3 instantané
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
                Paiement Mobile Money &amp; Carte
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                Vitesse d&apos;étude réglable (0.6x–1.15x)
              </span>
            </motion.div>
          </div>

          {/* Interactive Micro-UI Showcase: Live Multi-Track Brass Studio */}
          <motion.div
            id="studio-live"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.36 }}
            className="mx-auto mt-14 max-w-4xl scroll-mt-24"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
              <span className="font-mono-data text-xs uppercase tracking-widest text-[#22D3EE]">
                Démo Interactive • Cliquez sur un pupitre pour l&apos;isoler
              </span>
              <Link
                href={`/boutique/${demoScore.slug}`}
                className="link-underline text-xs font-medium text-[#A1A1AA] hover:text-[#22D3EE]"
              >
                Voir la portée complète →
              </Link>
            </div>
            <MultiTrackStudioPlayer score={demoScore} compact />
          </motion.div>

          {/* Animated Studio Metrics Strip */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: 8, suffix: "+", label: "Arrangements Studio", accent: "text-[#22D3EE]" },
              { value: 6, suffix: "", label: "Pupitres Isolés", accent: "text-[#F59E0B]" },
              { value: 2400, suffix: "+", label: "Fanfaristes Actifs", accent: "text-[#4ADE80]" },
              { value: 100, suffix: "%", label: "Livraison Instantanée", accent: "text-[#FAFAFA]" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#27272A] bg-[#121216]/90 p-5 text-center"
              >
                <p className={`text-2xl sm:text-3xl font-bold ${stat.accent}`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-[#A1A1AA]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          VALUE PROPOSITION — "Une Suite Studio pour Cuivres"
          ================================================================= */}
      <section className="py-20 border-t border-[#27272A]/70">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-[#22D3EE]">
              CONÇU PAR DES TROMPETTISTES
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
              Une Suite d&apos;Excellence pour vos Répétitions
            </h2>
            <p className="mt-4 text-base text-[#A1A1AA]">
              Tout ce qu&apos;il faut pour préparer vos pupitres deux fois plus vite, que vous soyez
              trompettiste soliste, chef de pupitre ou directeur de fanfare.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: FileMusic,
                color: "text-[#22D3EE]",
                bg: "bg-[#22D3EE]/12 border-[#22D3EE]/30",
                title: "Portées PDF Sécurisées",
                desc: "Conducteur général et parties séparées en Si♭, Mi♭, Fa ou Ut. Gravure studio ultra-lisible sur pupitre extérieur comme sur tablette.",
                cta: "Explorer les marches",
                href: "/boutique?categorie=marches",
              },
              {
                icon: Headphones,
                color: "text-[#F59E0B]",
                bg: "bg-[#F59E0B]/12 border-[#F59E0B]/30",
                title: "Audios Isolés par Pupitre",
                desc: "Écoutez l'Ensemble complet ou isolez instantanément Trompette 1, Trompette 2, Cornet, Trombone ou Tuba avec vitesse réglable et métronome.",
                cta: "Voir le répertoire moderne",
                href: "/boutique?categorie=fanfare-moderne",
              },
              {
                icon: SlidersHorizontal,
                color: "text-[#4ADE80]",
                bg: "bg-[#4ADE80]/12 border-[#4ADE80]/30",
                title: "Solos & Échauffements Aigus",
                desc: "Des routines quotidiennes de flexibilité, d'endurance d'embouchure et des solos techniques pensés pour faire grimper votre niveau.",
                cta: "Découvrir les exercices",
                href: "/boutique?categorie=echauffements",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="studio-card relative overflow-hidden rounded-2xl p-7 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${item.bg} ${item.color}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-[#FAFAFA]">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#27272A]">
                    <Link
                      href={item.href}
                      className="link-underline text-sm font-semibold text-[#22D3EE]"
                    >
                      {item.cta}
                      <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          FEATURED CATALOG — "Partitions & Arrangements à la Une"
          ================================================================= */}
      <section className="py-20 border-t border-[#27272A]/70 bg-[#0C0C10]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-3 py-1 font-mono-data text-[11px] font-semibold uppercase tracking-widest text-[#F59E0B]">
                Catalogue Officiel
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
                Partitions &amp; Arrangements à la Une
              </h2>
            </div>
            <Link
              href="/boutique"
              className="btn-magnetic inline-flex h-11 items-center gap-2 rounded-xl border border-[#3F3F46] bg-[#18181B] px-5 text-sm font-semibold text-[#FAFAFA] hover:border-[#22D3EE]/60 hover:text-[#22D3EE]"
            >
              Voir tout le catalogue ({SCORES.length})
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredScores.map((score) => (
              <PartitionCard key={score.id} score={score} />
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          HOW IT WORKS — 3-Step Horizontal Timeline
          ================================================================= */}
      <section id="comment-ca-marche" className="py-20 border-t border-[#27272A]/70 scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-[#22D3EE]">
              SIMPLICITÉ &amp; RAPIDITÉ
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
              Comment ça marche ?
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Headphones,
                title: "Écoutez & Choisissez",
                desc: "Testez chaque arrangement directement sur le site, isolez la Trompette 1 ou le Tuba et vérifiez la tonalité avant d'acheter.",
                highlight: false,
              },
              {
                step: "02",
                icon: ShieldCheck,
                title: "Paiement Sécurisé",
                desc: "Réglez en FCFA ou en Euro en quelques secondes avec vos moyens locaux et internationaux préférés.",
                highlight: true,
                badges: ["MTN MoMo", "Moov Money", "Celtiis", "Visa / Mastercard"],
              },
              {
                step: "03",
                icon: Zap,
                title: "Débloquez & Jouez",
                desc: "Téléchargez immédiatement vos portées PDF filigranées et répétez avec toutes les pistes isolées dans votre Espace Fanfariste.",
                highlight: false,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className={`rounded-2xl border p-7 ${
                    item.highlight
                      ? "border-[#22D3EE]/50 bg-gradient-to-b from-[#22D3EE]/10 to-[#18181B] shadow-[0_0_40px_-15px_rgba(34,211,238,0.3)]"
                      : "border-[#27272A] bg-[#121216]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-data text-xs font-bold text-[#22D3EE]">
                      ÉTAPE {item.step}
                    </span>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        item.highlight
                          ? "bg-[#22D3EE] text-[#09090B]"
                          : "bg-[#18181B] border border-[#27272A] text-[#F59E0B]"
                      }`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-[#FAFAFA]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                  {item.badges && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-lg border border-[#22D3EE]/30 bg-[#09090B]/80 px-2.5 py-1 font-mono-data text-[11px] font-medium text-[#FAFAFA]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =================================================================
          SOCIAL PROOF — Testimonials (Zero Truncation)
          ================================================================= */}
      <section className="py-20 border-t border-[#27272A]/70 bg-[#0C0C10]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-[#F59E0B]">
              PREUVE SOCIALE &amp; AVIS VÉRIFIÉS
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
              Adopté par les Fanfaristes &amp; Chefs de Pupitre
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="studio-card flex flex-col justify-between rounded-2xl p-7"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#F59E0B]" aria-label={`${t.rating} étoiles sur 5`}>
                    {Array.from({ length: t.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-[#E4E4E7] leading-relaxed">
                    « {t.quote} »
                  </p>
                </div>

                <footer className="mt-6 pt-4 border-t border-[#27272A] flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono-data text-sm font-bold ${
                      t.accent === "cyan"
                        ? "bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/35"
                        : t.accent === "brass"
                        ? "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/35"
                        : "bg-[#4ADE80]/15 text-[#4ADE80] border border-[#4ADE80]/35"
                    }`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#FAFAFA]">{t.name}</p>
                    <p className="text-xs text-[#A1A1AA]">
                      {t.role} • {t.city}
                    </p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================================
          FINAL CONVERSION BANNER
          ================================================================= */}
      <section className="py-20 border-t border-[#27272A]/70">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-[#22D3EE]/35 bg-gradient-to-br from-[#121923] via-[#121216] to-[#1A140A] p-10 sm:p-14 text-center shadow-[0_24px_64px_-24px_rgba(34,211,238,0.3)]">
            <div
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-56 w-96 rounded-full bg-[#22D3EE]/20 blur-[90px]"
              aria-hidden="true"
            />
            <h2 className="relative font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
              Prêt à faire sonner votre fanfare au niveau supérieur ?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base text-[#A1A1AA]">
              Accédez dès maintenant à nos portées prêtes pour la scène et nos pistes audio
              séparées pour chaque cuivre.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/boutique"
                className="btn-magnetic inline-flex h-12 items-center gap-2 rounded-xl bg-[#22D3EE] px-7 text-sm font-bold text-[#09090B] shadow-lg shadow-[#22D3EE]/30 hover:bg-[#06B6D4]"
              >
                <span className="btn-sheen" aria-hidden="true" />
                Explorer la Boutique
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#3F3F46] bg-[#18181B]/90 px-6 text-sm font-semibold text-[#FAFAFA] hover:border-[#F59E0B]/60 hover:text-[#F59E0B] transition-colors"
              >
                Demander un arrangement sur-mesure
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
