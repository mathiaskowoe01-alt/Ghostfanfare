import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Informations légales de la plateforme GhostFanfare.",
};

export default function MentionsLegalesPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 md:px-10 py-14 sm:py-20 space-y-8">
      <header className="border-b border-[#27272A] pb-6">
        <p className="font-mono-data text-xs uppercase tracking-widest text-[#22D3EE]">
          ÉDITEUR &amp; HÉBERGEMENT
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-[#FAFAFA]">
          Mentions Légales
        </h1>
      </header>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">1. Éditeur du site</h2>
        <p>
          Le site <strong className="text-[#FAFAFA]">GhostFanfare</strong> est édité par{" "}
          <strong className="text-[#FAFAFA]">GhostFanfare Studio</strong> — Académie Digitale des
          Fanfaristes &amp; Trompettistes.
        </p>
        <p>
          Contact :{" "}
          <a href="mailto:studio@ghostfanfare.com" className="text-[#22D3EE] underline">
            studio@ghostfanfare.com
          </a>{" "}
          — Téléphone : <span className="font-mono-data text-[#FAFAFA]">+229 01 96 00 00 00</span>
        </p>
      </section>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">2. Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des arrangements, gravures musicales, enregistrements audio, textes,
          visuels vectoriels et éléments d&apos;interface présents sur GhostFanfare sont protégés par
          le droit d&apos;auteur. Toute reproduction sans autorisation écrite est interdite.
        </p>
      </section>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">3. Hébergement</h2>
        <p>
          Application web conçue avec Next.js et déployée sur une infrastructure cloud haute
          disponibilité (Vercel Inc.).
        </p>
      </section>
    </article>
  );
}
