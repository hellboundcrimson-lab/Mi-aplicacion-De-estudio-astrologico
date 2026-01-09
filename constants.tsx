
import { SoulOrigin, EsotericRay, GalacticRace } from './types';

export const GALACTIC_RACES: Record<string, GalacticRace> = {
  [SoulOrigin.SIRIUS]: {
    name: "Sirianos",
    origin: SoulOrigin.SIRIUS,
    traits: ["Sabiduría Cristialina", "Maestría en Agua", "Tecnología de Luz"],
    mission: "Guardianes de la geometría sagrada y la evolución cetácea.",
    frequency: "963 Hz",
    stellarGate: "14° Cáncer",
    description: "Ingenieros de la realidad que utilizan el sonido y el agua para transmutar la materia."
  },
  [SoulOrigin.PLEIADES]: {
    name: "Pleyadianos",
    origin: SoulOrigin.PLEIADES,
    traits: ["Sanación Emocional", "Amor Incondicional", "Arte Galáctico"],
    mission: "Sembrar la frecuencia del amor en el ADN humano.",
    frequency: "528 Hz",
    stellarGate: "0° Géminis",
    description: "Nuestros 'primos estelares' que actúan como maestros de las artes y la psicología vibracional."
  },
  [SoulOrigin.ARCTURUS]: {
    name: "Arcturianos",
    origin: SoulOrigin.ARCTURUS,
    traits: ["Geometría de 5ta Dimensión", "Protección Psíquica", "Alta Tecnología"],
    mission: "Establecer corredores de luz y cámaras de sanación planetaria.",
    frequency: "1111 Hz",
    stellarGate: "24° Libra",
    description: "Los guardianes de la puerta estelar, maestros en la tecnología de la ascensión."
  },
  [SoulOrigin.ANDROMEDA]: {
    name: "Andromedanos",
    origin: SoulOrigin.ANDROMEDA,
    traits: ["Libertad Radical", "Expansión Mental", "Viajeros del Tiempo"],
    mission: "Ruptura de sistemas obsoletos y liberación de la consciencia.",
    frequency: "432 Hz",
    stellarGate: "27° Aries",
    description: "Vigilantes de la galaxia vecina que traen la frecuencia de la libertad absoluta."
  }
};

export const ZODIAC_SIGNS = [
  "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", 
  "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"
];

export const ZODIAC_COLORS = [
  "#FF4D4D", "#4DFF4D", "#FFFF4D", "#FFFFFF", "#FFB34D", "#B3FF4D", 
  "#4DFFFF", "#FF4DFF", "#B34DFF", "#4D4D4D", "#4D4DFF", "#4DB3FF"
];

export const PROTECTOR_ENTITIES: any[] = [
  {
    name: "Agnishvatta del Rayo Azul",
    order: "Logia Blanca",
    description: "Ángel Solar de alta jerarquía. Protege la Voluntad Divina.",
    protectionSeal: "Sello de Alción",
    associatedRay: EsotericRay.RAY_1
  },
  {
    name: "Vigilante de Sirio B",
    order: "Comando Galáctico",
    description: "Protector de los registros akáshicos de la Segunda Llama.",
    protectionSeal: "Estrella de Plata",
    associatedRay: EsotericRay.RAY_2
  }
];

export const ASPECT_MAGIC_DESCRIPTIONS: Record<string, string> = {
  "conjunction": "Fusión total de poder galáctico.",
  "trine": "Canalización armónica de naves nodrizas.",
  "square": "Tensión evolutiva necesaria para el salto cuántico.",
  "opposition": "Proyección del puente arcoíris (Antahkarana).",
  "sextile": "Oportunidad de contacto físico o telepático."
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

export const MASTER_MAPPINGS: Record<string, { master: string, qualities: string[], ashram: string }> = {
  [EsotericRay.RAY_1]: { master: "El Morya", qualities: ["Voluntad", "Coraje"], ashram: "Ashram de Primer Rayo" },
  [EsotericRay.RAY_2]: { master: "Koot Hoomi", qualities: ["Amor", "Iluminación"], ashram: "Ashram de Segundo Rayo" },
  [EsotericRay.RAY_3]: { master: "El Veneciano", qualities: ["Creatividad"], ashram: "Ashram de Tercer Rayo" },
  [EsotericRay.RAY_4]: { master: "Serapis Bey", qualities: ["Armonía"], ashram: "Ashram de Cuarto Rayo" },
  [EsotericRay.RAY_5]: { master: "Hilarión", qualities: ["Verdad"], ashram: "Ashram de Quinto Rayo" },
  [EsotericRay.RAY_6]: { master: "Jesús / Nada", qualities: ["Devoción"], ashram: "Ashram de Sexto Rayo" },
  [EsotericRay.RAY_7]: { master: "Saint Germain", qualities: ["Libertad"], ashram: "Ashram de Séptimo Rayo" }
};

// Fixed: Added ALL_RAYS array export used in astrologyEngine.ts
export const ALL_RAYS = [
  EsotericRay.RAY_1,
  EsotericRay.RAY_2,
  EsotericRay.RAY_3,
  EsotericRay.RAY_4,
  EsotericRay.RAY_5,
  EsotericRay.RAY_6,
  EsotericRay.RAY_7,
];
