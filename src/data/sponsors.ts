export interface Sponsor {
  id: string;
  name: string;
  kind: string;
  /** Logo em /public/sponsors/... — formato PNG com fundo transparente ou claro. */
  logo?: string;
}

// Ordenados do maior para o menor aporte — tier reflete valor (uso interno).
export const sponsors: Sponsor[] = [
  { id: "s01", name: "INCOBEL", kind: "MASTER", logo: "/sponsors/incobel.png" },
  { id: "s02", name: "TRILHAR GESTÃO", kind: "OURO", logo: "/sponsors/trilhar-gestao.png" },
  { id: "s03", name: "APOIO DALPIAS", kind: "OURO", logo: "/sponsors/dalpias.png" },
  { id: "s04", name: "INVIOLÁVEL", kind: "PRATA", logo: "/sponsors/inviolavel.png" },
  { id: "s05", name: "MECÂNICA MIOLA", kind: "PRATA", logo: "/sponsors/miola.png" },
  { id: "s06", name: "JOSÉ ALBA", kind: "PRATA", logo: "/sponsors/nego-alba.png" },
  { id: "s07", name: "SOLLOS", kind: "BRONZE", logo: "/sponsors/sollos.png" },
  { id: "s08", name: "CANTON IMÓVEIS", kind: "BRONZE", logo: "/sponsors/canton.png" },
  { id: "s09", name: "SICOOB", kind: "BRONZE", logo: "/sponsors/sicoob.png" },
  { id: "s10", name: "TEX3", kind: "BRONZE", logo: "/sponsors/tex3.png" },
  { id: "s11", name: "LIVENESS", kind: "APOIO", logo: "/sponsors/liveness.png" },
  { id: "s12", name: "MASSOTERAPEUTA ELENICE GHENO", kind: "APOIO", logo: "/sponsors/elenice-gheno.png" },
];
