import type { Category } from "./players";

export interface Coach {
  id: string;
  role: string;
  name: string;
  photo?: string;
  focal?: string;
  placeholder?: boolean;
}

const livre: Coach[] = [
  {
    id: "cL1",
    role: "TÉCNICO",
    name: "Carlos Gheno",
    photo: "/coaches/carlos-gheno.jpg",
    focal: "center 28%",
  },
  {
    id: "cL2",
    role: "AUXILIAR TÉCNICO",
    name: "Dieguinho",
    photo: "/coaches/dieguinho.jpg",
    focal: "center 25%",
  },
  {
    id: "cL3",
    role: "ANALISTA DE DESEMPENHO",
    name: "Netinho",
    photo: "/coaches/netinho.jpg",
    focal: "center 25%",
  },
  {
    id: "cL4",
    role: "PRESIDENTE",
    name: "Edson Cieplak",
    photo: "/coaches/edson-cieplak.jpg",
    focal: "center 25%",
  },
];

const sub18: Coach[] = [
  {
    id: "cS1",
    role: "COMISSÃO TÉCNICA",
    name: "Guilherme Verdi",
    photo: "/coaches/guilherme-verdi.jpg",
    focal: "center 28%",
  },
  {
    id: "cS2",
    role: "COMISSÃO TÉCNICA",
    name: "Gabriel Gheno",
    photo: "/coaches/gabriel-gheno.jpg",
    focal: "center 28%",
  },
  {
    id: "cS3",
    role: "COMISSÃO TÉCNICA",
    name: "Cauê Alba",
    photo: "/coaches/caue-alba.jpg",
    focal: "center 28%",
  },
];

export const coachesByCategory: Record<Category, Coach[]> = {
  LIVRE: livre,
  "SUB 18": sub18,
};

// Retro-compat: export default da categoria LIVRE como `coaches`
export const coaches = livre;
