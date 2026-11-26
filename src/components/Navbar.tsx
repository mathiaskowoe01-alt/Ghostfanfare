"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, User, Menu, X, ArrowRight } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useStore } from "@/context/StoreContext";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Catalogue" },
  { href: "/mon-parcours", label: "Mon Parcours" },
  { href: "/espace", label: "Mon Espace" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { cart, user } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 h-20 ${
          scrolled ? "studio-header-glass-scrolled" : "studio-header-glass"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-10">
          {/* Left: Brand Logo */}
          <Link href="/" aria-label="GhostFanfare — Retour à l'accueil" className="rounded-xl">
            <BrandLogo />
          </Link>

          {/* Center: Desktop Nav */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "text-[#22D3EE] bg-[#22D3EE]/10"
                      : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute inset-x-4 -bottom-[1px] h-[2px] rounded-full bg-[#22D3EE] shadow-[0_0_12px_#22D3EE]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/panier"
              aria-label={`Panier (${cart.length} article${cart.length > 1 ? "s" : ""})`}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#27272A] bg-[#18181B] text-[#FAFAFA] hover:border-[#22D3EE]/60 hover:text-[#22D3EE] transition-colors"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#22D3EE] px-1 font-mono-data text-[11px] font-bold text-[#09090B]">
                  {cart.length}
                </span>
              )}
            </Link>

            <Link
              href="/espace"
              aria-label={user ? `Mon espace (${user.name})` : "Accéder à Mon Espace"}
              className="hidden sm:inline-flex h-10 items-center gap-2 rounded-xl border border-[#27272A] bg-[#18181B] px-3.5 text-sm font-medium text-[#FAFAFA] hover:border-[#22D3EE]/60 hover:text-[#22D3EE] transition-colors"
            >
              <User className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
              <span>{user ? user.name.split(" ")[0] : "Espace"}</span>
            </Link>

            <Link
              href="/boutique"
              className="btn-magnetic hidden md:inline-flex h-10 items-center gap-1.5 rounded-xl bg-[#22D3EE] px-4 text-sm font-bold text-[#09090B] shadow-lg shadow-[#22D3EE]/20 hover:bg-[#06B6D4]"
            >
              <span className="btn-sheen" aria-hidden="true" />
              Partitions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu de navigation"
              aria-expanded={mobileOpen}
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-[#27272A] bg-[#18181B] text-[#FAFAFA] hover:border-[#22D3EE]/60"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu mobile">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 360, damping: 34 }}
              className="fixed inset-y-0 left-0 flex w-[280px] flex-col border-r border-[#27272A] bg-[#09090B] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#27272A]">
                <BrandLogo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fermer le menu"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#27272A] bg-[#18181B] text-[#FAFAFA]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <nav className="mt-6 flex flex-1 flex-col gap-1.5" aria-label="Navigation mobile">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        active
                          ? "bg-[#22D3EE]/12 text-[#22D3EE] border-l-[3px] border-[#22D3EE]"
                          : "text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-[#27272A] space-y-3">
                <Link
                  href="/panier"
                  className="flex w-full items-center justify-between rounded-xl border border-[#27272A] bg-[#18181B] px-4 py-3 text-sm font-medium text-[#FAFAFA]"
                >
                  <span className="inline-flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
                    Mon Panier
                  </span>
                  <span className="font-mono-data rounded-full bg-[#22D3EE] px-2 py-0.5 text-xs font-bold text-[#09090B]">
                    {cart.length}
                  </span>
                </Link>
                <Link
                  href="/boutique"
                  className="btn-magnetic flex w-full items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-4 py-3 text-sm font-bold text-[#09090B]"
                >
                  Explorer le catalogue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
