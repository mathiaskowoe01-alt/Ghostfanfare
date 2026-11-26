import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Comment GhostFanfare protège vos données personnelles et vos achats.",
};

export default function ConfidentialitePage() {
  return (
    <article className="mx-auto max-w-4xl px-6 md:px-10 py-14 sm:py-20 space-y-8">
      <header className="border-b border-[#27272A] pb-6">
        <p className="font-mono-data text-xs uppercase tracking-widest text-[#22D3EE]">
          PROTECTION DES DONNÉES
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-[#FAFAFA]">
          Politique de Confidentialité
        </h1>
      </header>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">1. Données collectées</h2>
        <p>
          GhostFanfare collecte uniquement les données strictement nécessaires à la gestion de votre
          compte, au filigranage de vos partitions et au suivi de vos commandes : nom complet,
          adresse e-mail, pupitre principal et référence de transaction.
        </p>
      </section>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">2. Sécurité &amp; Paiements</h2>
        <p>
          Aucune donnée bancaire ou code secret Mobile Money n&apos;est stocké sur nos serveurs. Les
          transactions transitent exclusivement par des prestataires de paiement certifiés et
          chiffrés (HTTPS/TLS).
        </p>
      </section>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">3. Vos droits</h2>
        <p>
          Vous pouvez demander à tout moment l&apos;accès, la rectification ou la suppression de vos
          données personnelles en écrivant à{" "}
          <a href="mailto:studio@ghostfanfare.com" className="text-[#22D3EE] underline">
            studio@ghostfanfare.com
          </a>
          .
        </p>
      </section>
    </article>
  );
}
