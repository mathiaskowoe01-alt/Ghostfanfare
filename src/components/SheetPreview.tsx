"use client";

import React from "react";
import { Lock, ShieldCheck, Printer } from "lucide-react";
import { Score } from "@/lib/types";

interface SheetPreviewProps {
  score: Score;
  unlocked?: boolean;
  activeStep?: number;
  isPlaying?: boolean;
  onUnlockClick?: () => void;
}

/**
 * Watermarked Vector Musical Staff Preview.
 * Fixes Mattyk'O's security flaw (raw unwatermarked readable score screenshot):
 * - Displays crisp, real musical notation for Page 1 preview
 * - Overlays diagonal copyright watermark when locked
 * - Progressively blurs measures 5+ until purchased/unlocked
 * - Highlights active beat position during live playback!
 */
export function SheetPreview({
  score,
  unlocked = false,
  activeStep = 0,
  isPlaying = false,
  onUnlockClick,
}: SheetPreviewProps) {
  const notes = score.previewNotes;
  const activeNoteIdx = isPlaying ? Math.floor((activeStep / 32) * notes.length) % notes.length : -1;

  // Map step (0..9) to SVG Y coordinate on a 5-line staff (lines at y = 52, 64, 76, 88, 100)
  const stepToY = (step: number) => 100 - step * 6;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#3F3F46]/70 bg-[#121216] shadow-2xl">
      {/* Top Document Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272A] bg-[#18181B] px-5 py-3">
        <div className="flex items-center gap-2.5">
          {unlocked ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4ADE80]/15 px-2.5 py-1 text-xs font-medium text-[#4ADE80]">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Partition complète débloquée
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B]/15 px-2.5 py-1 text-xs font-medium text-[#F59E0B]">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Aperçu protégé — Mesures 1–4 sur {score.pages} pages
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 font-mono-data text-xs text-[#A1A1AA]">
          <span>Clé de Sol • {score.key}</span>
          <span>•</span>
          <span>{score.timeSignature}</span>
          <span>•</span>
          <span>♩ = {score.bpm}</span>
          {unlocked && (
            <button
              type="button"
              onClick={() => window.print()}
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-[#22D3EE]/40 bg-[#22D3EE]/10 px-2.5 py-1 text-xs font-medium text-[#22D3EE] hover:bg-[#22D3EE]/20 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              Imprimer PDF
            </button>
          )}
        </div>
      </div>

      {/* Crisp Dark-Studio Paper Sheet Canvas */}
      <div className="relative p-6 sm:p-8 bg-gradient-to-b from-[#FAF8F4] to-[#F1EDE4] text-[#111114] select-none">
        {/* Header of the physical score */}
        <div className="flex items-start justify-between border-b border-black/15 pb-4 mb-6">
          <div>
            <p className="font-mono-data text-[11px] uppercase tracking-widest text-neutral-500">
              Trompette 1 (Si♭) — Conducteur Studio
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#09090B] mt-0.5">
              {score.title}
            </h3>
          </div>
          <div className="text-right text-xs text-neutral-600">
            <p className="font-semibold text-[#09090B]">{score.composer}</p>
            <p>Arr. {score.arranger}</p>
          </div>
        </div>

        {/* Staff System 1 (Visible + Synchronized Beat Cursor) */}
        <div className="relative mb-6">
          <svg
            viewBox="0 0 760 132"
            className="w-full h-auto"
            role="img"
            aria-label={`Portée aperçu de ${score.title} en ${score.key}`}
          >
            {/* 5 Staff Lines */}
            {[52, 64, 76, 88, 100].map((y) => (
              <line key={y} x1="16" y1={y} x2="744" y2={y} stroke="#18181B" strokeWidth="1.2" />
            ))}
            {/* Opening & Closing Barlines */}
            <line x1="16" y1="52" x2="16" y2="100" stroke="#18181B" strokeWidth="2.4" />
            <line x1="252" y1="52" x2="252" y2="100" stroke="#18181B" strokeWidth="1.2" />
            <line x1="496" y1="52" x2="496" y2="100" stroke="#18181B" strokeWidth="1.2" />
            <line x1="744" y1="52" x2="744" y2="100" stroke="#18181B" strokeWidth="2" />

            {/* Stylized Treble Clef */}
            <text x="24" y="96" fontSize="56" fontFamily="Georgia, serif" fill="#09090B">
              𝄞
            </text>

            {/* Key Signature Flats */}
            {score.key === "Si♭" && (
              <>
                <text x="64" y="82" fontSize="20" fill="#09090B">♭</text>
                <text x="74" y="64" fontSize="20" fill="#09090B">♭</text>
              </>
            )}
            {score.key === "Mi♭" && (
              <>
                <text x="64" y="82" fontSize="20" fill="#09090B">♭</text>
                <text x="74" y="64" fontSize="20" fill="#09090B">♭</text>
                <text x="84" y="88" fontSize="20" fill="#09090B">♭</text>
              </>
            )}
            {score.key === "Fa" && (
              <text x="66" y="82" fontSize="20" fill="#09090B">♭</text>
            )}

            {/* Time Signature */}
            <text x="98" y="74" fontSize="20" fontWeight="700" fontFamily="monospace" fill="#09090B">
              {score.timeSignature.split("/")[0]}
            </text>
            <text x="98" y="96" fontSize="20" fontWeight="700" fontFamily="monospace" fill="#09090B">
              {score.timeSignature.split("/")[1]}
            </text>

            {/* Tempo marking */}
            <text x="22" y="28" fontSize="13" fontWeight="700" fill="#09090B">
              Maestoso (♩ = {score.bpm})
            </text>

            {/* Render Notes */}
            {notes.map((n, idx) => {
              const x = 136 + idx * ((720 - 136) / Math.max(1, notes.length));
              const y = stepToY(n.step);
              const isActive = idx === activeNoteIdx;
              const isHalf = n.beats >= 2;
              const isEighth = n.beats < 1;

              return (
                <g key={idx}>
                  {isActive && (
                    <rect
                      x={x - 14}
                      y={34}
                      width="28"
                      height="84"
                      rx="6"
                      fill="#22D3EE"
                      fillOpacity="0.28"
                      stroke="#0891B2"
                      strokeWidth="1.2"
                    />
                  )}
                  {n.accidental && (
                    <text x={x - 16} y={y + 5} fontSize="15" fill={isActive ? "#0891B2" : "#18181B"}>
                      {n.accidental === "flat" ? "♭" : n.accidental === "sharp" ? "♯" : "♮"}
                    </text>
                  )}
                  {/* Ledger line if high */}
                  {n.step >= 8 && (
                    <line x1={x - 10} y1="40" x2={x + 10} y2="40" stroke="#18181B" strokeWidth="1.2" />
                  )}
                  {/* Notehead */}
                  <ellipse
                    cx={x}
                    cy={y}
                    rx="6.2"
                    ry="4.6"
                    transform={`rotate(-18 ${x} ${y})`}
                    fill={isHalf ? "#FAF8F4" : isActive ? "#0891B2" : "#09090B"}
                    stroke={isActive ? "#0891B2" : "#09090B"}
                    strokeWidth="2"
                  />
                  {/* Stem */}
                  <line
                    x1={n.step >= 4 ? x - 5.5 : x + 5.5}
                    y1={y}
                    x2={n.step >= 4 ? x - 5.5 : x + 5.5}
                    y2={n.step >= 4 ? y + 32 : y - 32}
                    stroke={isActive ? "#0891B2" : "#09090B"}
                    strokeWidth="1.6"
                  />
                  {/* Flag for 8th note */}
                  {isEighth && (
                    <path
                      d={
                        n.step >= 4
                          ? `M${x - 5.5} ${y + 32} Q${x + 4} ${y + 24} ${x + 5} ${y + 15}`
                          : `M${x + 5.5} ${y - 32} Q${x + 15} ${y - 24} ${x + 14} ${y - 14}`
                      }
                      stroke={isActive ? "#0891B2" : "#09090B"}
                      strokeWidth="1.8"
                      fill="none"
                    />
                  )}
                </g>
              );
            })}

            {/* Dynamics */}
            <text x="132" y="122" fontSize="15" fontStyle="italic" fontWeight="700" fontFamily="Georgia, serif" fill="#09090B">
              mf
            </text>
            <text x="504" y="122" fontSize="15" fontStyle="italic" fontWeight="700" fontFamily="Georgia, serif" fill="#09090B">
              ff
            </text>
          </svg>
        </div>

        {/* Staff System 2 (Blurred & Locked unless purchased) */}
        <div className={`relative transition-all duration-500 ${unlocked ? "" : "blur-[5px] opacity-60"}`}>
          <svg viewBox="0 0 760 116" className="w-full h-auto" aria-hidden="true">
            {[36, 48, 60, 72, 84].map((y) => (
              <line key={y} x1="16" y1={y} x2="744" y2={y} stroke="#18181B" strokeWidth="1.2" />
            ))}
            <line x1="16" y1="36" x2="16" y2="84" stroke="#18181B" strokeWidth="2.4" />
            <line x1="252" y1="36" x2="252" y2="84" stroke="#18181B" strokeWidth="1.2" />
            <line x1="496" y1="36" x2="496" y2="84" stroke="#18181B" strokeWidth="1.2" />
            <line x1="738" y1="36" x2="738" y2="84" stroke="#18181B" strokeWidth="1.2" />
            <line x1="744" y1="36" x2="744" y2="84" stroke="#18181B" strokeWidth="3.5" />
            <text x="24" y="80" fontSize="52" fontFamily="Georgia, serif" fill="#09090B">𝄞</text>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((idx) => {
              const x = 110 + idx * 52;
              const y = 84 - ((idx * 3 + 2) % 7) * 6;
              return (
                <g key={idx}>
                  <ellipse cx={x} cy={y} rx="6" ry="4.4" transform={`rotate(-18 ${x} ${y})`} fill="#09090B" />
                  <line x1={x + 5.2} y1={y} x2={x + 5.2} y2={y - 30} stroke="#09090B" strokeWidth="1.5" />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Diagonal Anti-Piracy Watermark (when locked) */}
        {!unlocked && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="-rotate-12 whitespace-nowrap font-display text-2xl sm:text-4xl font-extrabold tracking-[0.22em] text-[#09090B]/[0.09] uppercase">
              APERÇU PROTÉGÉ • GHOSTFANFARE • NE PAS COPIER
            </div>
          </div>
        )}

        {/* Unlock CTA Overlay on Lower Staff (when locked) */}
        {!unlocked && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end bg-gradient-to-t from-[#09090B] via-[#09090B]/85 to-transparent px-6 pb-6 pt-16 text-center">
            <p className="text-sm font-medium text-[#FAFAFA]">
              Débloquez les <span className="font-mono-data text-[#22D3EE]">{score.pages} pages PDF haute définition</span> + toutes les parties séparées
            </p>
            {onUnlockClick && (
              <button
                type="button"
                onClick={onUnlockClick}
                className="btn-magnetic mt-3 inline-flex items-center gap-2 rounded-xl bg-[#22D3EE] px-5 py-2.5 text-sm font-semibold text-[#09090B] shadow-lg shadow-[#22D3EE]/25"
              >
                <span className="btn-sheen" aria-hidden="true" />
                <Lock className="h-4 w-4" aria-hidden="true" />
                Débloquer cette partition
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
