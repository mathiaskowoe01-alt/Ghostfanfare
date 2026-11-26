"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, RotateCcw, Music2 } from "lucide-react";
import { CATEGORIES, SCORES } from "@/lib/catalog";
import { Difficulty, MusicalKey, ScoreCategory } from "@/lib/types";
import { PartitionCard } from "./PartitionCard";

const KEYS: (MusicalKey | "all")[] = ["all", "Si♭", "Mi♭", "Fa", "Ut"];
const DIFFICULTIES: (Difficulty | "all")[] = [
  "all",
  "Débutant",
  "Intermédiaire",
  "Avancé",
  "Virtuose",
];

type SortMode = "popular" | "price-asc" | "price-desc" | "bpm-desc";

export function BoutiqueView() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("categorie") as ScoreCategory | "all") || "all";

  const [category, setCategory] = useState<ScoreCategory | "all">(
    CATEGORIES.some((c) => c.id === initialCat) ? initialCat : "all"
  );
  const [musicalKey, setMusicalKey] = useState<MusicalKey | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortMode>("popular");

  const filteredScores = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = SCORES.filter((score) => {
      if (category !== "all" && score.category !== category) return false;
      if (musicalKey !== "all" && score.key !== musicalKey) return false;
      if (difficulty !== "all" && score.difficulty !== difficulty) return false;
      if (q) {
        const hay = `${score.title} ${score.subtitle} ${score.composer} ${score.categoryLabel} ${score.key}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      if (sort === "price-asc") return a.priceFcfa - b.priceFcfa;
      if (sort === "price-desc") return b.priceFcfa - a.priceFcfa;
      if (sort === "bpm-desc") return b.bpm - a.bpm;
      return b.downloads - a.downloads;
    });
  }, [category, musicalKey, difficulty, query, sort]);

  const resetFilters = () => {
    setCategory("all");
    setMusicalKey("all");
    setDifficulty("all");
    setQuery("");
    setSort("popular");
  };

  const hasActiveFilters =
    category !== "all" || musicalKey !== "all" || difficulty !== "all" || query.trim() !== "";

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10 py-12 sm:py-16">
      {/* Page Header */}
      <div className="max-w-3xl">
        <span className="font-mono-data text-xs uppercase tracking-[0.2em] text-[#22D3EE]">
          RÉPERTOIRE STUDIO CUIVRES &amp; FANFARE
        </span>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl font-extrabold text-[#FAFAFA]">
          Catalogue des Partitions
        </h1>
        <p className="mt-3 text-base text-[#A1A1AA]">
          Filtrez par style, tonalité ou niveau, écoutez un extrait multi-pupitres en un clic et
          ouvrez le studio complet de chaque morceau.
        </p>
      </div>

      {/* Main Split Layout: Clean Sidebar (260px) + Catalog Grid */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar Filters */}
        <aside aria-label="Filtres du catalogue" className="space-y-6">
          <div className="rounded-2xl border border-[#27272A] bg-[#121216] p-5 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-[#FAFAFA]">
                <SlidersHorizontal className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
                Filtres
              </h2>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#22D3EE] hover:underline"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Category */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2.5">
                Catégories
              </p>
              <div className="flex flex-col gap-1.5">
                {CATEGORIES.map((cat) => {
                  const active = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      aria-pressed={active}
                      className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                        active
                          ? "bg-[#22D3EE]/12 text-[#22D3EE] font-semibold border-l-[3px] border-[#22D3EE]"
                          : "text-[#A1A1AA] hover:bg-[#18181B] hover:text-[#FAFAFA]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Musical Key */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2.5">
                Tonalité
              </p>
              <div className="flex flex-wrap gap-2">
                {KEYS.map((k) => {
                  const active = musicalKey === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setMusicalKey(k)}
                      aria-pressed={active}
                      className={`rounded-lg px-3 py-1.5 font-mono-data text-xs font-medium border transition-colors ${
                        active
                          ? "border-[#F59E0B] bg-[#F59E0B]/15 text-[#F59E0B]"
                          : "border-[#27272A] bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]"
                      }`}
                    >
                      {k === "all" ? "Toutes" : k}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-2.5">
                Niveau
              </p>
              <div className="flex flex-wrap gap-2">
                {DIFFICULTIES.map((d) => {
                  const active = difficulty === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      aria-pressed={active}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors ${
                        active
                          ? "border-[#22D3EE] bg-[#22D3EE]/15 text-[#22D3EE]"
                          : "border-[#27272A] bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]"
                      }`}
                    >
                      {d === "all" ? "Tous niveaux" : d}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Right: Search/Sort Bar + Unified Card Grid */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 rounded-2xl border border-[#27272A] bg-[#121216] p-4">
            <div className="relative flex-1">
              <label htmlFor="catalog-search" className="sr-only">
                Rechercher une partition, un compositeur ou une tonalité
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]"
                aria-hidden="true"
              />
              <input
                id="catalog-search"
                name="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un titre, compositeur, tonalité Si♭..."
                className="w-full rounded-xl border border-[#27272A] bg-[#09090B] pl-10 pr-4 py-2.5 text-sm text-[#FAFAFA] placeholder:text-[#71717A] focus:border-[#22D3EE] transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="catalog-sort" className="text-xs font-medium text-[#A1A1AA] shrink-0">
                Trier par :
              </label>
              <select
                id="catalog-sort"
                name="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="rounded-xl border border-[#27272A] bg-[#09090B] px-3.5 py-2.5 text-sm text-[#FAFAFA] focus:border-[#22D3EE]"
              >
                <option value="popular">Plus populaires</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="bpm-desc">Tempo le plus rapide</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#A1A1AA] px-1">
            <p className="font-mono-data">
              {filteredScores.length} partition{filteredScores.length > 1 ? "s" : ""} trouvée
              {filteredScores.length > 1 ? "s" : ""}
            </p>
            <p>Cliquez sur « Écouter » pour lancer l&apos;audio studio instantanément</p>
          </div>

          {filteredScores.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-[#27272A] bg-[#121216] py-16 px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]">
                <Music2 className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[#FAFAFA]">
                Aucune partition ne correspond à ces filtres
              </h3>
              <p className="mt-2 max-w-md text-sm text-[#A1A1AA]">
                Essayez d&apos;élargir votre recherche ou réinitialisez les filtres pour afficher tout le répertoire.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="btn-magnetic mt-6 rounded-xl bg-[#22D3EE] px-5 py-2.5 text-sm font-bold text-[#09090B]"
              >
                Afficher tout le catalogue
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredScores.map((score) => (
                <PartitionCard key={score.id} score={score} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
