export type PupitreId =
  | "ensemble"
  | "trompette-1"
  | "trompette-2"
  | "cornet"
  | "trombone"
  | "tuba";

export type ScoreCategory =
  | "marches"
  | "fanfare-moderne"
  | "ceremonie"
  | "solos-trompette"
  | "echauffements";

export type MusicalKey = "Si♭" | "Mi♭" | "Fa" | "Ut";

export type Difficulty = "Débutant" | "Intermédiaire" | "Avancé" | "Virtuose";

export interface PupitreTrack {
  id: PupitreId;
  label: string;
  shortLabel: string;
  instrumentRole: string;
  clef: "Sol" | "Fa" | "Multi";
  transposition: string;
  color: string;
  /** Optional real studio MP3/WAV URL when uploaded to Supabase/S3 later */
  audioUrl?: string;
}

export interface ScoreNotationNote {
  /** Staff vertical position (0 = bottom line E4, 0.5 per step) */
  step: number;
  /** Duration in beats: 0.5 eighth, 1 quarter, 2 half */
  beats: number;
  accidental?: "flat" | "sharp" | "natural";
}

export interface ScoreMusicPattern {
  /** MIDI note numbers per 8th-note step (null = rest, -1 = sustain previous) */
  trumpet1: (number | null)[];
  trumpet2: (number | null)[];
  cornet: (number | null)[];
  trombone: (number | null)[];
  tuba: (number | null)[];
  /** Marching percussion pattern per 8th-note: 'K' kick, 'S' snare, 'R' roll, null rest */
  percussion: ("K" | "S" | "R" | null)[];
}

export interface Score {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  composer: string;
  arranger: string;
  category: ScoreCategory;
  categoryLabel: string;
  key: MusicalKey;
  timeSignature: "4/4" | "2/4" | "6/8" | "2/2";
  bpm: number;
  durationSec: number;
  durationLabel: string;
  difficulty: Difficulty;
  priceFcfa: number;
  pages: number;
  featured?: boolean;
  isNew?: boolean;
  likes: number;
  downloads: number;
  description: string;
  practiceTip: string;
  includedFiles: string[];
  pupitres: PupitreTrack[];
  coverPalette: {
    primary: string;
    secondary: string;
    bgFrom: string;
    bgTo: string;
    motif: "rings" | "waves" | "bars" | "crest" | "radar" | "grid";
  };
  waveform: number[];
  previewNotes: ScoreNotationNote[];
  pattern: ScoreMusicPattern;
}

export interface CartItem {
  scoreId: string;
  addedAt: string;
}

export interface Order {
  id: string;
  date: string;
  items: { scoreId: string; title: string; priceFcfa: number }[];
  totalFcfa: number;
  paymentMethod: "MTN MoMo" | "Moov Money" | "Celtiis" | "Visa / Mastercard";
  status: "Payé & Débloqué";
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  role: string;
  city: string;
  quote: string;
  rating: number;
  accent: "cyan" | "brass" | "emerald";
}
