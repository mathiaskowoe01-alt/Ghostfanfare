import React, { Suspense } from "react";
import type { Metadata } from "next";
import { BoutiqueView } from "@/components/BoutiqueView";

export const metadata: Metadata = {
  title: "Catalogue des Partitions",
  description:
    "Explorez nos partitions cuivres PDF sécurisées et nos pistes audio isolées par pupitre pour trompettistes et fanfares.",
};

export default function BoutiquePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-16">
          <div className="h-10 w-64 rounded-xl skeleton-shimmer" />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 rounded-2xl skeleton-shimmer" />
            ))}
          </div>
        </div>
      }
    >
      <BoutiqueView />
    </Suspense>
  );
}
