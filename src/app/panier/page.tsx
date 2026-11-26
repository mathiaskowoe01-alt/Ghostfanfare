"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  Smartphone,
  CheckCircle2,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getScoreById, formatFcfa, formatEur } from "@/lib/catalog";
import { Order } from "@/lib/types";
import { ScoreCoverArt } from "@/components/ScoreCoverArt";

const PAYMENT_METHODS: {
  id: Order["paymentMethod"];
  label: string;
  hint: string;
  icon: "mobile" | "card";
}[] = [
  { id: "MTN MoMo", label: "MTN Mobile Money", hint: "Validation USSD instantanée", icon: "mobile" },
  { id: "Moov Money", label: "Moov Money", hint: "Paiement mobile sécurisé", icon: "mobile" },
  { id: "Celtiis", label: "Celtiis Cash", hint: "Transfert rapide Bénin", icon: "mobile" },
  { id: "Visa / Mastercard", label: "Visa / Mastercard", hint: "Paiement international EUR / FCFA", icon: "card" },
];

export default function PanierPage() {
  const router = useRouter();
  const { cart, removeFromCart, completeCheckout, user } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<Order["paymentMethod"]>("MTN MoMo");
  const [fullName, setFullName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; phone?: string }>({});
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const items = cart
    .map((c) => getScoreById(c.scoreId))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const totalFcfa = items.reduce((sum, s) => sum + s.priceFcfa, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: { fullName?: string; email?: string; phone?: string } = {};

    if (fullName.trim().length < 2) {
      nextErrors.fullName = "Indiquez votre nom complet (pour le filigrane de la partition).";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Saisissez une adresse e-mail valide pour recevoir vos fichiers.";
    }
    if (paymentMethod !== "Visa / Mastercard" && phone.trim().length < 8) {
      nextErrors.phone = "Saisissez votre numéro Mobile Money (minimum 8 chiffres).";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const order = completeCheckout(paymentMethod, email.trim(), fullName.trim());
    setCompletedOrder(order);
  };

  if (completedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#4ADE80]/40 bg-[#4ADE80]/15 text-[#4ADE80]">
          <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
        </div>
        <p className="mt-6 font-mono-data text-xs uppercase tracking-widest text-[#4ADE80]">
          COMMANDE {completedOrder.id} CONFIRMÉE
        </p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#FAFAFA]">
          Vos partitions sont débloquées !
        </h1>
        <p className="mt-3 text-sm text-[#A1A1AA]">
          Paiement validé via <strong className="text-[#FAFAFA]">{completedOrder.paymentMethod}</strong> (
          <span className="font-mono-data text-[#22D3EE]">{formatFcfa(completedOrder.totalFcfa)}</span>).
          Retrouvez immédiatement vos portées PDF et pistes par pupitre dans votre espace.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/espace")}
            className="btn-magnetic inline-flex h-12 items-center gap-2 rounded-xl bg-[#22D3EE] px-7 text-sm font-bold text-[#09090B]"
          >
            <span className="btn-sheen" aria-hidden="true" />
            Accéder à mes partitions
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <Link
            href="/boutique"
            className="inline-flex h-12 items-center rounded-xl border border-[#3F3F46] bg-[#18181B] px-6 text-sm font-semibold text-[#FAFAFA]"
          >
            Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 sm:py-16">
      <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#FAFAFA]">
        Mon Panier
      </h1>
      <p className="mt-2 text-sm text-[#A1A1AA]">
        Livraison digitale instantanée dès validation du paiement (PDF filigrané + pistes audio par pupitre).
      </p>

      {items.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-[#27272A] bg-[#121216] py-20 px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#22D3EE]/35 bg-[#22D3EE]/10 text-[#22D3EE]">
            <ShoppingBag className="h-8 w-8" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold text-[#FAFAFA]">
            Votre panier est encore vide
          </h2>
          <p className="mt-2 max-w-md text-sm text-[#A1A1AA]">
            Parcourez notre répertoire pour fanfares et trompettistes, écoutez les pupitres et
            ajoutez vos premières partitions.
          </p>
          <Link
            href="/boutique"
            className="btn-magnetic mt-7 inline-flex h-12 items-center gap-2 rounded-xl bg-[#22D3EE] px-6 text-sm font-bold text-[#09090B]"
          >
            <span className="btn-sheen" aria-hidden="true" />
            Explorer le catalogue
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px]">
          {/* Cart Items List */}
          <div className="space-y-4">
            {items.map((score) => (
              <div
                key={score.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-[#27272A] bg-[#121216] p-4"
              >
                <div className="h-24 w-full sm:w-36 shrink-0 overflow-hidden rounded-xl">
                  <ScoreCoverArt score={score} className="h-full w-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/boutique/${score.slug}`}
                    className="font-display text-lg font-bold text-[#FAFAFA] hover:text-[#22D3EE] transition-colors"
                  >
                    {score.title}
                  </Link>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    {score.composer} • {score.key} • {score.pupitres.length} pistes audio + {score.pages} p. PDF
                  </p>
                  <p className="mt-2 font-mono-data text-sm font-bold text-[#22D3EE]">
                    {formatFcfa(score.priceFcfa)}{" "}
                    <span className="text-xs font-normal text-[#71717A]">
                      ({formatEur(score.priceFcfa)})
                    </span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(score.id)}
                  aria-label={`Retirer ${score.title} du panier`}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#27272A] bg-[#18181B] text-[#A1A1AA] hover:border-[#F87171]/50 hover:text-[#F87171] transition-colors"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Form Card */}
          <form
            onSubmit={handleCheckout}
            noValidate
            className="h-fit rounded-2xl border border-[#3F3F46]/80 bg-[#121216] p-6 space-y-6 shadow-2xl"
          >
            <h2 className="font-display text-xl font-bold text-[#FAFAFA]">
              Récapitulatif &amp; Paiement
            </h2>

            {/* Totals */}
            <div className="rounded-xl border border-[#27272A] bg-[#09090B] p-4 space-y-2">
              <div className="flex justify-between text-sm text-[#A1A1AA]">
                <span>Partitions ({items.length})</span>
                <span className="font-mono-data text-[#FAFAFA]">{formatFcfa(totalFcfa)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#71717A]">
                <span>Frais de livraison digitale</span>
                <span className="font-mono-data text-[#4ADE80]">Gratuit</span>
              </div>
              <div className="pt-3 mt-2 border-t border-[#27272A] flex items-baseline justify-between">
                <span className="text-sm font-semibold text-[#FAFAFA]">Total à régler</span>
                <div className="text-right">
                  <p className="font-mono-data text-xl font-bold text-[#22D3EE]">
                    {formatFcfa(totalFcfa)}
                  </p>
                  <p className="font-mono-data text-xs text-[#A1A1AA]">{formatEur(totalFcfa)}</p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2.5">
                Moyen de paiement
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_METHODS.map((pm) => {
                  const active = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      aria-pressed={active}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        active
                          ? "border-[#22D3EE] bg-[#22D3EE]/12 text-[#FAFAFA]"
                          : "border-[#27272A] bg-[#18181B] text-[#A1A1AA] hover:border-[#3F3F46]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        {pm.icon === "mobile" ? (
                          <Smartphone className="h-3.5 w-3.5 text-[#F59E0B]" aria-hidden="true" />
                        ) : (
                          <CreditCard className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
                        )}
                        <span className="truncate">{pm.id}</span>
                      </div>
                      <p className="mt-1 text-[10px] text-[#71717A] truncate">{pm.hint}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Buyer Fields with Inline Validation */}
            <div className="space-y-4">
              <div>
                <label htmlFor="checkout-name" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                  Nom complet (imprimé sur le filigrane PDF)
                </label>
                <input
                  id="checkout-name"
                  name="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                  }}
                  placeholder="Ex. Serge Dossou"
                  className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE]"
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-[#F87171]">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-email" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                  Adresse e-mail de réception
                </label>
                <input
                  id="checkout-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="vous@exemple.com"
                  className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE]"
                />
                {errors.email && <p className="mt-1 text-xs text-[#F87171]">{errors.email}</p>}
              </div>

              {paymentMethod !== "Visa / Mastercard" && (
                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                    Numéro {paymentMethod}
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                    }}
                    placeholder="+229 01 96 XX XX XX"
                    className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 font-mono-data text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE]"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-[#F87171]">{errors.phone}</p>}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-magnetic flex w-full items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-5 py-3.5 text-sm font-bold text-[#09090B] shadow-lg shadow-[#22D3EE]/25 hover:bg-[#06B6D4]"
            >
              <span className="btn-sheen" aria-hidden="true" />
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Payer {formatFcfa(totalFcfa)} &amp; Débloquer
            </button>

            <p className="text-center text-[11px] text-[#71717A]">
              Mode démonstration studio : la validation débloque instantanément vos partitions dans Mon Espace.
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
