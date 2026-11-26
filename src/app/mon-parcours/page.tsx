import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Mic2, Music2, Users, Sparkles, CheckCircle2 } from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { TESTIMONIALS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Mon Parcours & Direction Artistique",
  description:
    "Découvrez l'histoire de GhostFanfare, la méthode d'arrangement par pupitre et l'accompagnement dédié aux fanfaristes et trompettistes.",
};

const MILESTONES = [
  {
    year: "2012",
    title: "Premières scènes & Pupitre Trompette Lead",
    desc: "Formation académique en trompette Si♭ et direction de pupitre au sein des grandes fanfares de cérémonie de Cotonou.",
  },
  {
    year: "2017",
    title: "Écriture & Arrangements Cuivres Modernes",
    desc: "Création des premiers arrangements Afro-Brass et marches polyphoniques pensés pour un équilibre optimal entre aigus, médiums et soubassophones.",
  },
  {
    year: "2022",
    title: "Méthode d'Entraînement Multi-Pupitres",
    desc: "Mise au point d'un système d'enregistrement par piste isolée qui réduit par deux le temps de mise en place en répétition collective.",
  },
  {
    year: "2026",
    title: "Lancement de GhostFanfare Studio",
    desc: "Première académie digitale francophone dédiée aux fanfaristes et trompettistes avec portées protégées et lecteur multi-pupitres interactif.",
  },
];

const SERVICES = [
  {
    icon: Music2,
    title: "Arrangements Fanfare Sur-Mesure",
    desc: "Adaptation de n'importe quel titre (marche, cantique, afro-pop, générique) pour l'effectif exact de votre fanfare avec conducteur + parties séparées.",
    tag: "Livraison 5–7 jours",
  },
  {
    icon: Mic2,
    title: "Coaching Trompette & Registre Aigu",
    desc: "Sessions individuelles ou en groupe : colonne d'air, placement d'embouchure, endurance en parade et détaché rapide.",
    tag: "Présentiel & Visio",
  },
  {
    icon: Users,
    title: "Direction & Stage d'Ensemble",
    desc: "Audit sonore de votre fanfare, équilibre des pupitres, préparation de grands défilés, concerts et concours officiels.",
    tag: "Sur devis",
  },
];

export default function MonParcoursPage() {
  return (
    <div className="overflow-x-clip">
      {/* Hero Section — 100% unified with GhostFanfare Neon Studio Design System */}
      <section className="relative py-16 sm:py-24 border-b border-[#27272A]/70">
        <div
          className="pointer-events-none absolute top-0 right-1/4 h-80 w-80 rounded-full bg-[#22D3EE]/15 blur-[120px]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-3.5 py-1.5 font-mono-data text-xs font-semibold uppercase tracking-widest text-[#F59E0B]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Direction Artistique &amp; Pédagogie
              </span>

              <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAFAFA] leading-[1.08]">
                Façonner des Cuivres{" "}
                <span className="bg-gradient-to-r from-[#22D3EE] to-[#F59E0B] bg-clip-text text-transparent">
                  Précis &amp; Puissants
                </span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                GhostFanfare est né d&apos;un constat simple sur le terrain : trop de fanfaristes
                talentueux perdent des heures à déchiffrer à l&apos;oreille faute de portées propres et
                de guides audio par pupitre. Notre mission est de mettre un studio d&apos;arrangement
                professionnel dans la poche de chaque trompettiste.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/boutique"
                  className="btn-magnetic inline-flex h-12 items-center gap-2 rounded-xl bg-[#22D3EE] px-6 text-sm font-bold text-[#09090B] shadow-lg shadow-[#22D3EE]/25 hover:bg-[#06B6D4]"
                >
                  <span className="btn-sheen" aria-hidden="true" />
                  Découvrir mes partitions
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#3F3F46] bg-[#18181B] px-6 text-sm font-semibold text-[#FAFAFA] hover:border-[#22D3EE]/60 hover:text-[#22D3EE] transition-colors"
                >
                  Réserver un coaching
                </Link>
              </div>
            </div>

            {/* Editorial Studio Card (Replaces amateur clipart with precision studio card) */}
            <div className="relative rounded-2xl border border-[#3F3F46]/70 bg-gradient-to-br from-[#141A24] via-[#121216] to-[#1A140B] p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#27272A] pb-5">
                <div>
                  <p className="font-mono-data text-xs uppercase tracking-wider text-[#22D3EE]">
                    Fondateur &amp; Arrangeur
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-bold text-[#FAFAFA]">
                    Maître Kossi Agbessi
                  </h2>
                  <p className="text-sm text-[#A1A1AA]">Trompettiste Lead • Chef de Fanfare</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F59E0B]/40 bg-[#F59E0B]/15 text-[#F59E0B]">
                  <Award className="h-7 w-7" aria-hidden="true" />
                </div>
              </div>

              {/* Stylized Acoustic Brass Illustration */}
              <div className="my-6 rounded-xl border border-[#27272A] bg-[#09090B] p-5">
                <svg viewBox="0 0 400 140" className="w-full h-auto" aria-hidden="true">
                  {[30, 48, 66, 84, 102].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#22D3EE" strokeOpacity="0.18" />
                  ))}
                  <path
                    d="M32 76 H176 L264 32 V114 L176 76"
                    stroke="#22D3EE"
                    strokeWidth="3"
                    fill="#22D3EE"
                    fillOpacity="0.08"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M110 76 V96 C110 103 116 108 123 108 H155 C162 108 168 103 168 96 V76"
                    stroke="#F59E0B"
                    strokeWidth="2.8"
                    fill="none"
                  />
                  {[122, 139, 156].map((cx) => (
                    <g key={cx}>
                      <line x1={cx} y1="54" x2={cx} y2="76" stroke="#F59E0B" strokeWidth="3" />
                      <circle cx={cx} cy="50" r="4.5" fill="#F59E0B" />
                    </g>
                  ))}
                  <path d="M284 44 C308 58 308 88 284 102" stroke="#22D3EE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M306 32 C340 54 340 92 306 114" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.7" fill="none" strokeLinecap="round" />
                  <path d="M328 22 C370 50 370 96 328 124" stroke="#22D3EE" strokeWidth="1.5" strokeOpacity="0.4" fill="none" strokeLinecap="round" />
                </svg>
              </div>

              <ul className="space-y-2.5 text-sm text-[#D4D4D8]">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#4ADE80]" aria-hidden="true" />
                  Spécialiste des transpositions cuivres Si♭, Mi♭, Fa &amp; Ut
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#22D3EE]" aria-hidden="true" />
                  Direction musicale de fanfares de parade &amp; brass bands
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                  Plus de 120 arrangements joués en Afrique de l&apos;Ouest &amp; Europe
                </li>
              </ul>
            </div>
          </div>

          {/* Animated Counters */}
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: 14, suffix: "+", label: "Années de scène cuivres" },
              { value: 120, suffix: "+", label: "Arrangements écrits" },
              { value: 45, suffix: "+", label: "Fanfares accompagnées" },
              { value: 2400, suffix: "+", label: "Musiciens formés" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[#27272A] bg-[#121216] p-6 text-center"
              >
                <p className="text-3xl font-bold text-[#22D3EE]">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-1.5 text-xs text-[#A1A1AA]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-b border-[#27272A]/70">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-[#22D3EE]">
              CHRONOLOGIE
            </span>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
              De la Parade au Studio Digital
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {MILESTONES.map((m) => (
              <div key={m.year} className="studio-card rounded-2xl p-6">
                <span className="inline-block rounded-lg border border-[#F59E0B]/35 bg-[#F59E0B]/10 px-3 py-1 font-mono-data text-xs font-bold text-[#F59E0B]">
                  {m.year}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-[#FAFAFA]">{m.title}</h3>
                <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 border-b border-[#27272A]/70 bg-[#0C0C10]">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-[#F59E0B]">
                ACCOMPAGNEMENT PRO
              </span>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
                Services pour Fanfares &amp; Solistes
              </h2>
            </div>
            <Link
              href="/contact"
              className="link-underline text-sm font-semibold text-[#22D3EE]"
            >
              Demander un devis personnalisé →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {SERVICES.map((srv) => {
              const Icon = srv.icon;
              return (
                <div key={srv.title} className="studio-card flex flex-col justify-between rounded-2xl p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#22D3EE]/35 bg-[#22D3EE]/12 text-[#22D3EE]">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-[#27272A] bg-[#09090B] px-3 py-1 font-mono-data text-[11px] text-[#A1A1AA]">
                        {srv.tag}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-xl font-bold text-[#FAFAFA]">
                      {srv.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#A1A1AA] leading-relaxed">{srv.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#27272A]">
                    <Link
                      href="/contact"
                      className="link-underline text-sm font-semibold text-[#22D3EE]"
                    >
                      En savoir plus
                      <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAFA] text-center">
            Retours de la Communauté Cuivres
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="rounded-2xl border border-[#27272A] bg-[#121216] p-6">
                <p className="text-sm text-[#E4E4E7] leading-relaxed">« {t.quote} »</p>
                <p className="mt-4 text-sm font-semibold text-[#FAFAFA]">{t.name}</p>
                <p className="text-xs text-[#A1A1AA]">
                  {t.role} • {t.city}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
