export interface HistoryMarker {
  era: string;
  year: string;
  title: string;
  subtitle: string;
  body: string;
  accent: "red" | "white" | "gold";
  // Quando presente, o card renderiza os dois nomes empilhados no lugar do title
  clubs?: string[];
}

export const history: HistoryMarker[] = [
  {
    era: "ANTES",
    year: "2022",
    title: "OS DOIS CLUBES",
    subtitle: "Duas origens. Uma cidade.",
    body: "Dois clubes nascidos em 2022 que marcaram o futsal de São José do Cedro com identidades fortes e torcidas apaixonadas.",
    accent: "red",
    clubs: ["RED BULL CEDRO", "APOKAPSE"],
  },
  {
    era: "O ENCONTRO",
    year: "2024",
    title: "A FUSÃO",
    subtitle: "Dois viram um.",
    body: "Red Bull Cedro e Apokapse se fundem. O projeto passa a se chamar Apokapse, unindo as duas torcidas em um só clube.",
    accent: "gold",
  },
  {
    era: "DEPOIS",
    year: "2026",
    title: "APOBULL FC",
    subtitle: "O touro veste asas.",
    body: "O Apokapse evolui. Nasce o Apobull FC — novo nome, novo escudo, mesma alma de São José do Cedro.",
    accent: "white",
  },
];

export const originClubs = [
  { name: "APOKAPSE", role: "raiz técnica" },
  { name: "RED BULL CEDRO", role: "raiz passional" },
];
