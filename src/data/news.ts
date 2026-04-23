export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  tag: string;
  cover?: string;
  coverFit?: "cover" | "contain"; // ajuste quando a arte for logo/escudo
}

// Convenção: a matéria mais recente fica SEMPRE no topo do array.
// Ao adicionar uma nova, insira no começo desta lista (posição 0).
export const news: NewsItem[] = [
  {
    id: "n05",
    date: "ABRIL 2026",
    category: "MERCADO",
    title: "CAETHANOS RENOVADO",
    excerpt:
      "Thano terere ou Caethanos, o inevitável, renovou para mais uma temporada com o Apobull. Nosso goleiro promessa da base vem confiante para mais um ano defendendo o Touro.",
    tag: "SUB 18 • GOLEIRO",
    cover: "/news/caetano-renovado.png",
    coverFit: "cover",
  },
  {
    id: "n04",
    date: "ABRIL 2026",
    category: "MERCADO",
    title: "GEOVANNI RENOVADO",
    excerpt:
      "VaniStelrooy confia em nossa equipe em mais uma temporada. Em seu último ano de Sub 18, nosso craque faz uma grande preparação para destruir na temporada.",
    tag: "SUB 18 • ALA",
    cover: "/news/vani-renovado.png",
    coverFit: "cover",
  },
  {
    id: "n01",
    date: "ABRIL 2026",
    category: "MERCADO",
    title: "VINI RENOVADO",
    excerpt:
      "Nosso pivô renova mais um ano em nossa equipe. Após uma grande temporada, Vini chega com sangue nos olhos para ajudar nossa equipe.",
    tag: "SUB 18 • PIVÔ",
    cover: "/news/vinicius-renovado.png",
    coverFit: "cover",
  },
  {
    id: "n02",
    date: "ABRIL 2026",
    category: "MERCADO",
    title: "PARAGUÁI PYAHU",
    excerpt:
      "Ore castellano oñembopyahu Apobull ndive ambue ary guasu hag̃ua hembiapo rape, rojerovia nde rehe ore mba'eporãite!",
    tag: "SUB 18 • ALA",
    cover: "/news/paraguai-renovado.png",
    coverFit: "cover",
  },
  {
    id: "n03",
    date: "ABRIL 2026",
    category: "TEMPORADA",
    title: "TEMPORADA 2026 CONFIRMADA",
    excerpt:
      "O Apobull confirma participação em 2 competições municipais. O calendário completo será divulgado em breve.",
    tag: "COMPETIÇÕES",
    cover: "/news/temporada-2025.png",
    coverFit: "contain",
  },
];
