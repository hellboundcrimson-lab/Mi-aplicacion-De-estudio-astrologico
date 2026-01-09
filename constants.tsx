
import { SoulOrigin, EsotericRay } from './types';

export const ZODIAC_SIGNS = [
  "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", 
  "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"
];

// Added ZODIAC_COLORS to fix the import error in NatalChart.tsx
export const ZODIAC_COLORS = [
  "#FF4D4D", // Aries - Red
  "#4DFF4D", // Tauro - Green
  "#FFFF4D", // Géminis - Yellow
  "#FFFFFF", // Cáncer - White/Silver
  "#FFB34D", // Leo - Gold/Orange
  "#B3FF4D", // Virgo - Earth Green
  "#4DFFFF", // Libra - Air Blue
  "#FF4DFF", // Escorpio - Deep Red/Magenta
  "#B34DFF", // Sagitario - Purple
  "#4D4D4D", // Capricornio - Dark Grey
  "#4D4DFF", // Acuario - Electric Blue
  "#4DB3FF"  // Piscis - Sea Blue
];

export const PROTECTOR_ENTITIES: any[] = [
  {
    name: "Agnishvatta del Rayo Azul",
    order: "Logia Blanca",
    description: "Ángel Solar de alta jerarquía. Protege la Voluntad Divina en el corazón del iniciado.",
    protectionSeal: "Sello de Alción",
    associatedRay: EsotericRay.RAY_1
  },
  {
    name: "Vigilante de Sirio B",
    order: "Comando Galáctico",
    description: "Protector de los registros akáshicos y la sabiduría de la Segunda Llama.",
    protectionSeal: "Estrella de Plata",
    associatedRay: EsotericRay.RAY_2
  },
  {
    name: "Guardián de la Llama Violeta",
    order: "Logia Blanca",
    description: "Transmutador de karma residual y protector del orden ritual.",
    protectionSeal: "Cruz de Malta Amatista",
    associatedRay: EsotericRay.RAY_7
  }
];

export const ASPECT_MAGIC_DESCRIPTIONS: Record<string, string> = {
  "conjunction": "Fusión total de poder ritual.",
  "trine": "Canalización armónica de fuerzas invisibles.",
  "square": "Fricción necesaria para la transmutación alquímica.",
  "opposition": "Proyección de la voluntad sobre el espejo astral.",
  "sextile": "Oportunidad de manifestación ritual fluida."
};

export const EXOTERIC_RULERS: Record<string, string> = {
  "Aries": "Marte", "Tauro": "Venus", "Géminis": "Mercurio", "Cáncer": "Luna",
  "Leo": "Sol", "Virgo": "Mercurio", "Libra": "Venus", "Escorpio": "Plutón",
  "Sagitario": "Júpiter", "Capricornio": "Saturno", "Acuario": "Urano", "Piscis": "Neptuno"
};

export const ESOTERIC_RULERS: Record<string, string> = {
  "Aries": "Mercurio", "Tauro": "Vulcano", "Géminis": "Venus", "Cáncer": "Neptuno",
  "Leo": "Sol", "Virgo": "Luna", "Libra": "Urano", "Escorpio": "Marte",
  "Sagitario": "Tierra", "Capricornio": "Saturno", "Acuario": "Júpiter", "Piscis": "Plutón"
};

export const HIERARCHICAL_RULERS: Record<string, string> = {
  "Aries": "Urano", "Tauro": "Tierra", "Géminis": "Tierra", "Cáncer": "Neptuno",
  "Leo": "Sol", "Virgo": "Júpiter", "Libra": "Saturno", "Escorpio": "Mercurio",
  "Sagitario": "Marte", "Capricornio": "Venus", "Acuario": "Luna", "Piscis": "Plutón"
};

export const ELOHIM_MAPPINGS: Record<string, { name: string, complement: string, function: string, embassy: string }> = {
  [EsotericRay.RAY_1]: { name: "Hércules", complement: "Amazonia", function: "Poder y Voluntad", embassy: "Gran Sol Central" },
  [EsotericRay.RAY_2]: { name: "Cassiopea", complement: "Minerva", function: "Percepción y Sabiduría", embassy: "Sirio A" },
  [EsotericRay.RAY_3]: { name: "Orión", complement: "Angelica", function: "Amor en Acción", embassy: "Sector Betelgeuse" },
  [EsotericRay.RAY_4]: { name: "Claire", complement: "Astrea", function: "Pureza Cristalina", embassy: "Portal Lyra" },
  [EsotericRay.RAY_5]: { name: "Cyclopea", complement: "Virginia", function: "Visión y Verdad", embassy: "Arcturus" },
  [EsotericRay.RAY_6]: { name: "Peace", complement: "Aloha", function: "Tranquilidad Divina", embassy: "Pléyades" },
  [EsotericRay.RAY_7]: { name: "Arcturus", complement: "Victoria", function: "Ritual Alquímico", embassy: "Andrómeda" }
};

export const SACRED_PLANETS = ["Mercurio", "Venus", "Júpiter", "Saturno", "Urano", "Neptuno", "Vulcano"];

export const SIGN_RAY_MAP: Record<string, EsotericRay> = {
  "Aries": EsotericRay.RAY_1, "Leo": EsotericRay.RAY_1, "Capricornio": EsotericRay.RAY_1,
  "Géminis": EsotericRay.RAY_2, "Virgo": EsotericRay.RAY_2, "Piscis": EsotericRay.RAY_2,
  "Cáncer": EsotericRay.RAY_3, "Libra": EsotericRay.RAY_3, "Sagitario": EsotericRay.RAY_3,
  "Tauro": EsotericRay.RAY_4, "Escorpio": EsotericRay.RAY_4, "Acuario": EsotericRay.RAY_5,
};

export const ALL_RAYS = [
    EsotericRay.RAY_1, EsotericRay.RAY_2, EsotericRay.RAY_3, 
    EsotericRay.RAY_4, EsotericRay.RAY_5, EsotericRay.RAY_6, EsotericRay.RAY_7
];

export const MASTER_MAPPINGS: Record<string, { master: string, qualities: string[], ashram: string }> = {
  [EsotericRay.RAY_1]: { master: "El Morya", qualities: ["Voluntad", "Coraje"], ashram: "Ashram de Primer Rayo" },
  [EsotericRay.RAY_2]: { master: "Koot Hoomi", qualities: ["Amor", "Iluminación"], ashram: "Ashram de Segundo Rayo" },
  [EsotericRay.RAY_3]: { master: "El Veneciano", qualities: ["Creatividad"], ashram: "Ashram de Tercer Rayo" },
  [EsotericRay.RAY_4]: { master: "Serapis Bey", qualities: ["Armonía"], ashram: "Ashram de Cuarto Rayo" },
  [EsotericRay.RAY_5]: { master: "Hilarión", qualities: ["Verdad"], ashram: "Ashram de Quinto Rayo" },
  [EsotericRay.RAY_6]: { master: "Jesús / Nada", qualities: ["Devoción"], ashram: "Ashram de Sexto Rayo" },
  [EsotericRay.RAY_7]: { master: "Saint Germain", qualities: ["Libertad"], ashram: "Ashram de Séptimo Rayo" }
};
