import React from "react";

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
}

export function BrandLogo({ compact = false, className = "" }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 select-none ${className}`}>
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#18181B] border border-[#22D3EE]/35 shadow-[0_0_24px_-6px_rgba(34,211,238,0.45)]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
        >
          {/* Minimalist geometric trumpet silhouette with brass valves & neon sound wave */}
          <path
            d="M10 35H33L50 20V44L33 35"
            stroke="#22D3EE"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 35V41C21 43.2 22.8 45 25 45H31C33.2 45 35 43.2 35 41V35"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="25" cy="27" r="2.4" fill="#F59E0B" />
          <circle cx="30.5" cy="27" r="2.4" fill="#F59E0B" />
          <circle cx="36" cy="27" r="2.4" fill="#F59E0B" />
          <path
            d="M54 25C57 28 57 36 54 39"
            stroke="#22D3EE"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-tight text-[#FAFAFA]">
            Ghost<span className="text-[#22D3EE]">Fanfare</span>
          </span>
          <span className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-[#A1A1AA] mt-0.5">
            Brass Studio
          </span>
        </span>
      )}
    </span>
  );
}
