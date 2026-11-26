import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions Générales de Vente des partitions PDF et pistes audio GhostFanfare.",
};

export default function CGVPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 md:px-10 py-14 sm:py-20 space-y-8">
      <header className="border-b border-[#27272A] pb-6">
        <p className="font-mono-data text-xs uppercase tracking-widest text-[#22D3EE]">
          DOCUMENT LÉGAL • MISE À JOUR 2026
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold text-[#FAFAFA]">
          Conditions Générales de Vente (CGV)
        </h1>
      </header>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">1. Objet</h2>
        <p>
          Les présentes Conditions Générales de Vente régissent la vente de contenus numériques
          (partitions musicales au format PDF filigrané et pistes audio MP3/WAV par pupitre) proposés
          sur la plateforme <strong className="text-[#FAFAFA]">GhostFanfare</strong>.
        </p>
      </section>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">2. Tarifs &amp; Paiement</h2>
        <p>
          Les prix sont affichés en Francs CFA (FCFA) avec un équivalent indicatif en Euros (€). Le
          règlement s&apos;effectue de manière sécurisée par MTN Mobile Money, Moov Money, Celtiis
          Cash ou carte bancaire Visa / Mastercard.
        </p>
      </section>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">
          3. Livraison digitale &amp; Droit de rétractation
        </h2>
        <p>
          L&apos;accès aux fichiers PDF et pistes audio est immédiat après confirmation du paiement
          dans votre Espace Fanfariste. Conformément aux dispositions applicables aux contenus
          numériques fournis immédiatement, toute commande livrée et téléchargée n&apos;est pas
          remboursable, sauf défaut technique avéré du fichier.
        </p>
      </section>

      <section className="space-y-3 text-sm text-[#A1A1AA] leading-relaxed">
        <h2 className="font-display text-xl font-bold text-[#FAFAFA]">
          4. Licence d&apos;utilisation &amp; Propriété intellectuelle
        </h2>
        <p>
          Chaque partition est protégée par un filigrane nominatif. L&apos;achat confère un droit
          d&apos;utilisation personnel ou au sein de votre ensemble musical déclaré. Toute
          revente, redistribution publique ou mise en ligne non autorisée des fichiers PDF ou audio
          est strictement interdite.
        </p>
      </section>
    </article>
  );
}
