import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-[#27272A] bg-[#0B0B0F] pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block rounded-xl">
              <BrandLogo />
            </Link>
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              L&apos;académie digitale des fanfaristes et trompettistes. Partitions PDF
              sécurisées, conducteurs complets et pistes audio isolées par pupitre pour
              préparer vos répétitions deux fois plus vite.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["MTN MoMo", "Moov Money", "Celtiis", "Visa / MC"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-md border border-[#27272A] bg-[#18181B] px-2.5 py-1 font-mono-data text-[11px] text-[#A1A1AA]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Column 2: Répertoire */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#FAFAFA]">
              Répertoire
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A1A1AA]">
              <li>
                <Link href="/boutique?categorie=marches" className="link-underline hover:text-[#22D3EE]">
                  Marches &amp; Défilés
                </Link>
              </li>
              <li>
                <Link href="/boutique?categorie=fanfare-moderne" className="link-underline hover:text-[#22D3EE]">
                  Fanfare Moderne / Afro-Brass
                </Link>
              </li>
              <li>
                <Link href="/boutique?categorie=ceremonie" className="link-underline hover:text-[#22D3EE]">
                  Cérémonie &amp; Répertoire Sacré
                </Link>
              </li>
              <li>
                <Link href="/boutique?categorie=solos-trompette" className="link-underline hover:text-[#22D3EE]">
                  Solos Trompette Si♭
                </Link>
              </li>
              <li>
                <Link href="/boutique?categorie=echauffements" className="link-underline hover:text-[#22D3EE]">
                  Échauffements &amp; Aigus
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Légal (Zero 404s!) */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#FAFAFA]">
              Informations &amp; Légal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#A1A1AA]">
              <li>
                <Link href="/mon-parcours" className="link-underline hover:text-[#22D3EE]">
                  À propos &amp; Mon Parcours
                </Link>
              </li>
              <li>
                <Link href="/cgv" className="link-underline hover:text-[#22D3EE]">
                  Conditions Générales de Vente
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="link-underline hover:text-[#22D3EE]">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="link-underline hover:text-[#22D3EE]">
                  Mentions Légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[#FAFAFA]">
              Studio &amp; Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-[#A1A1AA]">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#22D3EE]" aria-hidden="true" />
                <a href="mailto:studio@ghostfanfare.com" className="hover:text-[#FAFAFA] transition-colors">
                  studio@ghostfanfare.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#F59E0B]" aria-hidden="true" />
                <a href="tel:+2290196000000" className="font-mono-data hover:text-[#FAFAFA] transition-colors">
                  +229 01 96 00 00 00
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#4ADE80]" aria-hidden="true" />
                <span>Cotonou • Abidjan • Paris</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center rounded-xl border border-[#3F3F46] bg-[#18181B] px-4 py-2 text-xs font-semibold text-[#FAFAFA] hover:border-[#22D3EE]/60 hover:text-[#22D3EE] transition-colors"
            >
              Commander un arrangement sur-mesure
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© {new Date().getFullYear()} GhostFanfare — Académie Digitale des Cuivres &amp; Fanfares. Tous droits réservés.</p>
          <p className="font-mono-data">PDF filigranés • Pistes isolées Si♭ / Ut / Mi♭</p>
        </div>
      </div>
    </footer>
  );
}
