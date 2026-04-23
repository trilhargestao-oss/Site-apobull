export interface Sponsor {
  id: string;
  name: string;
  kind: string;
}

// Ordenados do maior para o menor aporte — tier reflete valor (uso interno).
export const sponsors: Sponsor[] = [
  { id: "s01", name: "INCOBEL", kind: "MASTER" },
  { id: "s02", name: "TRILHAR GESTÃO", kind: "OURO" },
  { id: "s03", name: "APOIO DALPIAS", kind: "OURO" },
  { id: "s04", name: "INVIOLÁVEL", kind: "PRATA" },
  { id: "s05", name: "MECÂNICA MIOLA", kind: "PRATA" },
  { id: "s06", name: "JOSÉ ALBA", kind: "PRATA" },
  { id: "s07", name: "SOLLOS", kind: "BRONZE" },
  { id: "s08", name: "CANTON IMÓVEIS", kind: "BRONZE" },
  { id: "s09", name: "SICOOB", kind: "BRONZE" },
  { id: "s10", name: "TEX3", kind: "BRONZE" },
  { id: "s11", name: "LIVENESS", kind: "APOIO" },
  { id: "s12", name: "MASSOTERAPEUTA ELENICE GHENO", kind: "APOIO" },
];
