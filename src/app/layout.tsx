import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Display: Bebas Neue para títulos monumentais
const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body: Inter para texto corrido
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Mono: JetBrains Mono para labels editoriais, coordenadas e stat blocks
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "APOBULL FC — O Touro Veste Asas",
  description:
    "Clube de futsal de São José do Cedro — SC. Nascido da fusão entre Red Bull Cedro e Apokapse. Dois clubes, uma alma.",
  keywords: [
    "Apobull",
    "Apobull FC",
    "São José do Cedro",
    "futsal",
    "Santa Catarina",
    "Red Bull Cedro",
    "Apokapse",
    "SJC",
  ],
  openGraph: {
    title: "APOBULL FC — O Touro Veste Asas",
    description:
      "Clube de futsal de São José do Cedro, SC. Dois clubes, uma alma.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="grain bg-ink text-bone font-body antialiased">
        {children}
      </body>
    </html>
  );
}
