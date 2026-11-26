import type { Metadata, Viewport } from "next";
import { Sora, Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { AudioProvider } from "@/context/AudioContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlobalMiniPlayer } from "@/components/GlobalMiniPlayer";
import { ToastContainer } from "@/components/ToastContainer";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fira-code",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "GhostFanfare — Partitions & Audios par Pupitre pour Fanfaristes & Trompettistes",
    template: "%s | GhostFanfare",
  },
  description:
    "L'académie digitale des fanfaristes et trompettistes. Partitions PDF sécurisées en Si♭, Mi♭, Fa et Ut, conducteurs complets et pistes audio isolées par pupitre (Trompette 1, Trompette 2, Cornet, Trombone, Tuba).",
  keywords: [
    "partitions trompette",
    "fanfare",
    "brass band",
    "audio par pupitre",
    "partitions cuivres Si bémol",
    "GhostFanfare",
    "Cotonou",
    "Abidjan",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "GhostFanfare",
    title: "GhostFanfare — Partitions & Audios par Pupitre pour Cuivres & Fanfares",
    description:
      "Travaillez vos pupitres deux fois plus vite avec nos portées PDF protégées et notre studio d'écoute isolée par instrument.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sora.variable} ${inter.variable} ${firaCode.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-[#09090B] text-[#FAFAFA] antialiased">
        <StoreProvider>
          <AudioProvider>
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
            <GlobalMiniPlayer />
            <ToastContainer />
          </AudioProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
