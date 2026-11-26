"use client";

import React from "react";
import { Score } from "@/lib/types";

interface ScoreCoverArtProps {
  score: Score;
  isPlaying?: boolean;
  className?: string;
}

/**
 * Bespoke geometric brass studio sleeve artwork generated per score.
 * Guarantees 100% visual cohesion, zero duplicate stock covers, and zero 404 images.
 */
export function ScoreCoverArt({ score, isPlaying = false, className = "" }: ScoreCoverArtProps) {
  const { primary, secondary, bgFrom, bgTo, motif } = score.coverPalette;

  return (
    <div
      className={`relative overflow-hidden select-none ${className}`}
      style={{
        background: `linear-gradient(135deg, ${bgFrom} 0%, #0D0E12 52%, ${bgTo} 100%)`,
      }}
    >
      {/* Subtle radial spotlight */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full blur-3xl opacity-35 transition-opacity duration-500"
        style={{ background: primary, opacity: isPlaying ? 0.55 : 0.28 }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full blur-3xl opacity-25"
        style={{ background: secondary }}
      />

      {/* Precision SVG Acoustic & Staff Geometry */}
      <svg
        viewBox="0 0 400 240"
        className="h-full w-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* 5-line subtle musical staff across cover */}
        {[76, 92, 108, 124, 140].map((y, idx) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="400"
            y2={y}
            stroke={primary}
            strokeOpacity={idx === 2 ? 0.22 : 0.11}
            strokeWidth="1"
          />
        ))}

        {/* Motif variations so every score has its own signature cover */}
        {motif === "crest" && (
          <g>
            <circle cx="295" cy="112" r="72" stroke={primary} strokeOpacity="0.25" strokeWidth="1.5" fill="none" />
            <circle cx="295" cy="112" r="50" stroke={secondary} strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
            <circle cx="295" cy="112" r="24" fill={secondary} fillOpacity="0.14" stroke={secondary} strokeOpacity="0.7" />
            <path d="M58 118 H195 L268 74 V150 L195 118" stroke={primary} strokeWidth="2.5" strokeOpacity="0.85" fill={primary} fillOpacity="0.08" />
            <circle cx="145" cy="98" r="5" fill={secondary} />
            <circle cx="163" cy="98" r="5" fill={secondary} />
            <circle cx="181" cy="98" r="5" fill={secondary} />
          </g>
        )}

        {motif === "waves" && (
          <g>
            <path
              d="M0 120 Q50 56 100 120 T200 120 T300 120 T400 120"
              stroke={primary}
              strokeWidth="2.5"
              strokeOpacity="0.8"
              fill="none"
            />
            <path
              d="M0 126 Q50 76 100 126 T200 126 T300 126 T400 126"
              stroke={secondary}
              strokeWidth="1.8"
              strokeOpacity="0.55"
              fill="none"
            />
            <path
              d="M0 112 Q50 168 100 112 T200 112 T300 112 T400 112"
              stroke={primary}
              strokeWidth="1"
              strokeOpacity="0.3"
              fill="none"
            />
          </g>
        )}

        {motif === "rings" && (
          <g>
            {[28, 52, 78, 106, 134].map((r, i) => (
              <circle
                key={r}
                cx="200"
                cy="112"
                r={r}
                stroke={i % 2 === 0 ? primary : secondary}
                strokeOpacity={0.55 - i * 0.08}
                strokeWidth={i === 0 ? 2 : 1.2}
                fill="none"
              />
            ))}
            <circle cx="200" cy="112" r="8" fill={primary} />
          </g>
        )}

        {motif === "bars" && (
          <g>
            {score.waveform.slice(0, 22).map((val, i) => {
              const h = Math.max(16, (val / 100) * 116);
              return (
                <rect
                  key={i}
                  x={32 + i * 15.5}
                  y={118 - h / 2}
                  width="8"
                  height={h}
                  rx="4"
                  fill={i % 3 === 0 ? secondary : primary}
                  fillOpacity={0.3 + (val / 100) * 0.55}
                />
              );
            })}
          </g>
        )}

        {motif === "radar" && (
          <g>
            <circle cx="200" cy="120" r="86" stroke={primary} strokeOpacity="0.2" strokeWidth="1" fill="none" />
            <circle cx="200" cy="120" r="56" stroke={secondary} strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
            <line x1="200" y1="24" x2="200" y2="216" stroke={primary} strokeOpacity="0.16" />
            <line x1="90" y1="120" x2="310" y2="120" stroke={primary} strokeOpacity="0.16" />
            <path d="M200 120 L264 62 A86 86 0 0 1 286 120 Z" fill={primary} fillOpacity="0.16" />
            <circle cx="242" cy="86" r="5" fill={secondary} />
            <circle cx="164" cy="146" r="4" fill={primary} />
          </g>
        )}

        {motif === "grid" && (
          <g>
            {[60, 120, 180, 240, 300, 340].map((x) => (
              <line key={x} x1={x} y1="24" x2={x} y2="216" stroke={primary} strokeOpacity="0.12" />
            ))}
            <polyline
              points="40,164 100,140 160,118 220,96 280,74 340,56"
              stroke={primary}
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            {[
              [40, 164],
              [100, 140],
              [160, 118],
              [220, 96],
              [280, 74],
              [340, 56],
            ].map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="5.5" fill={idx % 2 === 0 ? secondary : primary} />
            ))}
          </g>
        )}
      </svg>

      {/* Subtle studio metadata stamp bottom-left */}
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2">
        <span className="rounded-md bg-[#09090B]/80 backdrop-blur-md border border-white/10 px-2 py-0.5 font-mono-data text-[11px] font-medium text-[#FAFAFA]">
          Ton. {score.key}
        </span>
        <span className="rounded-md bg-[#09090B]/80 backdrop-blur-md border border-white/10 px-2 py-0.5 font-mono-data text-[11px] text-[#A1A1AA]">
          {score.bpm} BPM
        </span>
      </div>

      {/* Live playing overlay indicator */}
      {isPlaying && (
        <div className="pointer-events-none absolute inset-0 bg-[#22D3EE]/10 ring-1 ring-inset ring-[#22D3EE]/60 flex items-center justify-center">
          <div className="flex items-end gap-1 rounded-full bg-[#09090B]/85 backdrop-blur-md border border-[#22D3EE]/50 px-3.5 py-2 shadow-lg">
            {[0, 0.15, 0.3, 0.1, 0.25].map((delay, i) => (
              <span
                key={i}
                className="eq-bar w-1 h-4 rounded-full bg-[#22D3EE]"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
            <span className="ml-2 font-mono-data text-[11px] font-semibold tracking-wider text-[#22D3EE] uppercase">
              En écoute
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
