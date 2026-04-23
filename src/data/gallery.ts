export interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  size: "sm" | "md" | "lg" | "tall" | "wide";
}

// Arquivo histórico real: fotos em /public/gallery/, servidas em grayscale
// via filtro CSS duotone. No lightbox abrem em cor normal.
export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: "/gallery/redbull-campeao-2022.jpg",
    caption: "Red Bull Cedro campeão municipal Sub-18 · 2022",
    size: "wide",
  },
  {
    id: "g2",
    src: "/gallery/festa-titulo-redbull.jpg",
    caption: "Festa do título do Red Bull Cedro · 2022",
    size: "tall",
  },
  {
    id: "g3",
    src: "/gallery/pre-jogo-2024.jpg",
    caption: "Pré-jogo · 2024",
    size: "wide",
  },
  {
    id: "g4",
    src: "/gallery/primeira-festa.jpg",
    caption: "Primeira festa conjunta — Red Bull Cedro × Apokapse · 2024",
    size: "tall",
  },
  {
    id: "g5",
    src: "/gallery/vice-municipal-2024.jpg",
    caption: "Vice-campeão municipal Sub-18 · 2024",
    size: "wide",
  },
  {
    id: "g6",
    src: "/gallery/classificacao-final-2025.jpg",
    caption:
      "Classificação para a final municipal Sub-18 · 2025",
    size: "tall",
  },
];
