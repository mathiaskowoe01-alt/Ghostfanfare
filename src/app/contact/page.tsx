"use client";

import React, { useState } from "react";
import { MessageCircle, Calendar, Send, CheckCircle2, Music2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ContactPage() {
  const { pushToast } = useStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("Arrangement Fanfare Sur-Mesure");
  const [instrumentation, setInstrumentation] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Indiquez votre nom ou le nom de votre fanfare.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Saisissez une adresse e-mail valide.";
    if (message.trim().length < 12)
      next.message = "Décrivez brièvement votre besoin (minimum 12 caractères).";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSent(true);
    pushToast({
      title: "Demande envoyée au Studio GhostFanfare",
      description: "Nous vous répondons sous 24 heures ouvrées.",
      variant: "success",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 sm:py-16">
      <div className="max-w-3xl">
        <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-[#22D3EE]">
          STUDIO &amp; COMMANDES SUR-MESURE
        </span>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold text-[#FAFAFA]">
          Contactez le Studio
        </h1>
        <p className="mt-3 text-base text-[#A1A1AA]">
          Besoin d&apos;un arrangement exclusif pour votre fanfare, d&apos;une transposition sur-mesure
          ou d&apos;une séance de coaching trompette ? Écrivez-nous directement.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Left: Direct Channels */}
        <div className="space-y-6">
          <div className="studio-card rounded-2xl p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#4ADE80]/35 bg-[#4ADE80]/12 text-[#4ADE80]">
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-[#FAFAFA]">
              WhatsApp Direct Studio
            </h2>
            <p className="mt-2 text-sm text-[#A1A1AA]">
              Idéal pour envoyer un extrait vocal ou discuter rapidement d&apos;une commande de
              partition ou d&apos;un paiement Mobile Money.
            </p>
            <a
              href="https://wa.me/2290196000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4ADE80] px-5 py-2.5 text-sm font-bold text-[#09090B]"
            >
              Ouvrir WhatsApp
            </a>
          </div>

          <div className="studio-card rounded-2xl p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#F59E0B]/35 bg-[#F59E0B]/12 text-[#F59E0B]">
              <Calendar className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 font-display text-xl font-bold text-[#FAFAFA]">
              Coaching &amp; Direction
            </h2>
            <p className="mt-2 text-sm text-[#A1A1AA]">
              Créneaux de 45 min en visio ou en présentiel pour travailler les aigus, la colonne
              d&apos;air ou l&apos;équilibre de votre section cuivres.
            </p>
            <p className="mt-4 font-mono-data text-xs text-[#F59E0B]">
              Lun – Sam • 09h00 à 20h00 (GMT+1)
            </p>
          </div>
        </div>

        {/* Right: Custom Request Form */}
        <div className="rounded-2xl border border-[#3F3F46]/70 bg-[#121216] p-7 sm:p-9">
          {sent ? (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4ADE80]/15 text-[#4ADE80]">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-[#FAFAFA]">
                Message bien reçu !
              </h2>
              <p className="mt-2 text-sm text-[#A1A1AA]">
                Merci {name}. Notre équipe d&apos;arrangeurs analyse votre demande et revient vers vous
                très rapidement à <span className="text-[#FAFAFA]">{email}</span>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setMessage("");
                }}
                className="mt-6 rounded-xl border border-[#3F3F46] bg-[#18181B] px-5 py-2.5 text-sm font-semibold text-[#FAFAFA]"
              >
                Envoyer une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[#27272A]">
                <Music2 className="h-5 w-5 text-[#22D3EE]" aria-hidden="true" />
                <h2 className="font-display text-xl font-bold text-[#FAFAFA]">
                  Commander un arrangement ou écrire au studio
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                    Nom / Fanfare
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((p) => ({ ...p, name: "" }));
                    }}
                    placeholder="Ex. Fanfare Lumière"
                    className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE]"
                  />
                  {errors.name && <p className="mt-1 text-xs text-[#F87171]">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                    Adresse e-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                    }}
                    placeholder="chef@fanfare.com"
                    className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE]"
                  />
                  {errors.email && <p className="mt-1 text-xs text-[#F87171]">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-type" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                    Objet de la demande
                  </label>
                  <select
                    id="contact-type"
                    name="requestType"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value)}
                    className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] focus:border-[#22D3EE]"
                  >
                    <option>Arrangement Fanfare Sur-Mesure</option>
                    <option>Transposition (Si♭ / Mi♭ / Ut)</option>
                    <option>Coaching Trompette &amp; Aigus</option>
                    <option>Support Commande / Paiement</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-inst" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                    Pupitres souhaités (optionnel)
                  </label>
                  <input
                    id="contact-inst"
                    name="instrumentation"
                    type="text"
                    value={instrumentation}
                    onChange={(e) => setInstrumentation(e.target.value)}
                    placeholder="Ex. 2 Tpt Si♭, 1 Cornet, 1 Trombone, 1 Tuba"
                    className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-medium text-[#D4D4D8] mb-1.5">
                  Votre message
                </label>
                <textarea
                  id="contact-msg"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((p) => ({ ...p, message: "" }));
                  }}
                  placeholder="Précisez le morceau souhaité, la tonalité, la date de votre événement ou vos objectifs..."
                  className="w-full rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE]"
                />
                {errors.message && <p className="mt-1 text-xs text-[#F87171]">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="btn-magnetic inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#22D3EE] px-7 text-sm font-bold text-[#09090B] shadow-lg shadow-[#22D3EE]/25 hover:bg-[#06B6D4]"
              >
                <span className="btn-sheen" aria-hidden="true" />
                <Send className="h-4 w-4" aria-hidden="true" />
                Envoyer ma demande
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
