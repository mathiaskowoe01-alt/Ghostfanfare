import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#22D3EE]/40 bg-[#22D3EE]/10 text-[#22D3EE] glow-cyan">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="mt-6 font-mono-data text-sm font-semibold uppercase tracking-[0.2em] text-[#F59E0B]">
        Erreur 404 • Mesure introuvable
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl font-bold text-[#FAFAFA]">
        Cette portée n&apos;existe pas
      </h1>
      <p className="mt-4 max-w-lg text-base text-[#A1A1AA]">
        La page ou partition que vous recherchez a peut-être été déplacée ou renommée.
        Revenez au catalogue pour explorer nos arrangements cuivres.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/boutique"
          className="btn-magnetic inline-flex items-center gap-2 rounded-xl bg-[#22D3EE] px-6 py-3 text-sm font-bold text-[#09090B]"
        >
          <span className="btn-sheen" aria-hidden="true" />
          Explorer le catalogue
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-[#3F3F46] bg-[#18181B] px-6 py-3 text-sm font-semibold text-[#FAFAFA] hover:border-[#22D3EE]/60"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
