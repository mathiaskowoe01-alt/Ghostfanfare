"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  LogOut,
  FileDown,
  Headphones,
  Heart,
  Receipt,
  Sparkles,
  ArrowRight,
  Lock,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { SCORES, formatFcfa } from "@/lib/catalog";
import { PartitionCard } from "@/components/PartitionCard";

export default function EspacePage() {
  const { user, loginDemo, logout, unlockedIds, favorites, orders } = useStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("Trompette 1 (Si♭)");
  const [error, setError] = useState("");

  const unlockedScores = SCORES.filter((s) => unlockedIds.includes(s.id));
  const favoriteScores = SCORES.filter((s) => favorites.includes(s.id));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }
    setError("");
    loginDemo({
      email: email.trim(),
      name: name.trim() || "Fanfariste GhostFanfare",
      instrument,
    });
  };

  if (!user) {
    return (
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-14 sm:py-20">
        {/* Split-Screen Authentication Layout */}
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[#3F3F46]/70 bg-[#121216] shadow-2xl lg:grid-cols-[1.2fr_1fr]">
          {/* Left Branding Panel */}
          <div className="relative flex flex-col justify-between bg-gradient-to-br from-[#0F1B26] via-[#121216] to-[#1A1308] p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-[#27272A]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22D3EE]/35 bg-[#22D3EE]/10 px-3 py-1 font-mono-data text-xs font-semibold text-[#22D3EE]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                ESPACE FANFARISTE
              </span>
              <h1 className="mt-5 font-display text-3xl sm:text-4xl font-extrabold text-[#FAFAFA]">
                Votre pupitre digital, partout avec vous.
              </h1>
              <p className="mt-3 text-sm text-[#A1A1AA] leading-relaxed">
                Retrouvez toutes vos partitions PDF débloquées, vos pistes isolées par instrument
                et vos favoris synchronisés sur téléphone, tablette et ordinateur.
              </p>
            </div>

            <div className="mt-8 space-y-3 rounded-2xl border border-[#27272A] bg-[#09090B]/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
                Inclus dans la démo immédiate
              </p>
              <p className="text-sm text-[#D4D4D8]">
                La partition <strong className="text-[#FAFAFA]">Routine Aigus &amp; Flexibilité Si♭</strong>{" "}
                est déjà pré-débloquée dans votre bibliothèque pour tester l&apos;impression PDF et le
                studio complet.
              </p>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h2 className="font-display text-2xl font-bold text-[#FAFAFA]">Connexion rapide</h2>
            <p className="mt-1.5 text-sm text-[#A1A1AA]">
              Connectez-vous ou lancez une session démo en un clic.
            </p>

            <form onSubmit={handleLogin} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor="login-name" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                  Prénom &amp; Nom
                </label>
                <input
                  id="login-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex. Marc-Olivier K."
                  className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE]"
                />
              </div>

              <div>
                <label htmlFor="login-email" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                  E-mail
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="trompette@fanfare.com"
                  className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE]"
                />
                {error && <p className="mt-1 text-xs text-[#F87171]">{error}</p>}
              </div>

              <div>
                <label htmlFor="login-instrument" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                  Votre pupitre principal
                </label>
                <select
                  id="login-instrument"
                  name="instrument"
                  value={instrument}
                  onChange={(e) => setInstrument(e.target.value)}
                  className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] focus:border-[#22D3EE]"
                >
                  <option>Trompette 1 (Si♭)</option>
                  <option>Trompette 2 (Si♭)</option>
                  <option>Cornet / Bugle</option>
                  <option>Trombone</option>
                  <option>Tuba / Soubassophone</option>
                  <option>Chef de Fanfare</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-magnetic flex w-full items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-5 py-3 text-sm font-bold text-[#09090B]"
              >
                <span className="btn-sheen" aria-hidden="true" />
                <Lock className="h-4 w-4" aria-hidden="true" />
                Accéder à Mon Espace
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#27272A]" />
              <span className="text-xs text-[#71717A]">ou</span>
              <div className="h-px flex-1 bg-[#27272A]" />
            </div>

            <button
              type="button"
              onClick={() => loginDemo()}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#3F3F46] bg-[#18181B] px-5 py-3 text-sm font-semibold text-[#FAFAFA] hover:border-[#F59E0B]/60 hover:text-[#F59E0B] transition-colors"
            >
              Entrer en mode Démo Fanfariste (1 clic)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 sm:py-16 space-y-12">
      {/* Member Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#27272A] bg-[#121216] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#22D3EE]/40 bg-[#22D3EE]/15 text-[#22D3EE]">
            <User className="h-7 w-7" aria-hidden="true" />
          </div>
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
              {user.name}
            </h1>
            <p className="text-sm text-[#A1A1AA]">
              {user.instrument} • {user.fanfare} •{" "}
              <span className="font-mono-data text-xs text-[#71717A]">{user.email}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center gap-2 rounded-xl border border-[#3F3F46] bg-[#18181B] px-4 py-2.5 text-xs font-semibold text-[#A1A1AA] hover:border-[#F87171]/50 hover:text-[#F87171] transition-colors"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Déconnexion
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#27272A] bg-[#121216] p-6">
          <p className="inline-flex items-center gap-2 text-xs text-[#A1A1AA]">
            <FileDown className="h-4 w-4 text-[#4ADE80]" aria-hidden="true" />
            Partitions débloquées
          </p>
          <p className="mt-2 font-mono-data text-3xl font-bold text-[#FAFAFA]">
            {unlockedScores.length}
          </p>
        </div>
        <div className="rounded-2xl border border-[#27272A] bg-[#121216] p-6">
          <p className="inline-flex items-center gap-2 text-xs text-[#A1A1AA]">
            <Heart className="h-4 w-4 text-[#F87171]" aria-hidden="true" />
            Favoris sauvegardés
          </p>
          <p className="mt-2 font-mono-data text-3xl font-bold text-[#FAFAFA]">
            {favoriteScores.length}
          </p>
        </div>
        <div className="rounded-2xl border border-[#27272A] bg-[#121216] p-6">
          <p className="inline-flex items-center gap-2 text-xs text-[#A1A1AA]">
            <Receipt className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
            Commandes validées
          </p>
          <p className="mt-2 font-mono-data text-3xl font-bold text-[#FAFAFA]">{orders.length}</p>
        </div>
      </div>

      {/* Unlocked Library */}
      <section>
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="inline-flex items-center gap-2 font-display text-2xl font-bold text-[#FAFAFA]">
            <Headphones className="h-6 w-6 text-[#22D3EE]" aria-hidden="true" />
            Ma Bibliothèque Débloquée
          </h2>
          <Link href="/boutique" className="link-underline text-sm font-semibold text-[#22D3EE]">
            Ajouter d&apos;autres partitions →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {unlockedScores.map((score) => (
            <PartitionCard key={score.id} score={score} />
          ))}
        </div>
      </section>

      {/* Favorites */}
      {favoriteScores.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold text-[#FAFAFA] mb-6">Mes Favoris</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favoriteScores.map((score) => (
              <PartitionCard key={score.id} score={score} />
            ))}
          </div>
        </section>
      )}

      {/* Order History Table */}
      <section>
        <h2 className="font-display text-2xl font-bold text-[#FAFAFA] mb-6">
          Historique des Commandes
        </h2>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-[#27272A] bg-[#121216] p-8 text-center">
            <p className="text-sm text-[#A1A1AA]">
              Aucune commande enregistrée pour le moment.
            </p>
            <Link
              href="/boutique"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#22D3EE]"
            >
              Découvrir le catalogue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-[#27272A] bg-[#121216]">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#27272A] bg-[#18181B] text-xs uppercase text-[#A1A1AA]">
                <tr>
                  <th className="px-6 py-4">Référence</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Articles</th>
                  <th className="px-6 py-4">Paiement</th>
                  <th className="px-6 py-4 text-right">Montant</th>
                  <th className="px-6 py-4 text-center">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A]">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-6 py-4 font-mono-data font-semibold text-[#22D3EE]">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-[#A1A1AA]">{order.date}</td>
                    <td className="px-6 py-4 text-[#FAFAFA]">
                      {order.items.map((i) => i.title).join(", ")}
                    </td>
                    <td className="px-6 py-4 text-[#A1A1AA]">{order.paymentMethod}</td>
                    <td className="px-6 py-4 text-right font-mono-data font-semibold text-[#FAFAFA]">
                      {formatFcfa(order.totalFcfa)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4ADE80]/15 px-3 py-1 text-xs font-semibold text-[#4ADE80]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
