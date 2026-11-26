import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SCORES, getScoreById } from "@/lib/catalog";
import { ScoreDetailView } from "@/components/ScoreDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SCORES.map((score) => ({ id: score.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const score = getScoreById(id);
  if (!score) return { title: "Partition introuvable" };
  return {
    title: `${score.title} (${score.key})`,
    description: `${score.subtitle} — Partition PDF sécurisée et ${score.pupitres.length} pistes audio par pupitre.`,
  };
}

export default async function ScoreDetailPage({ params }: PageProps) {
  const { id } = await params;
  const score = getScoreById(id);
  if (!score) notFound();
  return <ScoreDetailView score={score} />;
}
