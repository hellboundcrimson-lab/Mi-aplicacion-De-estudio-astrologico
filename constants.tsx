
import { SoulOrigin, EsotericRay } from './types';

export const ZODIAC_SIGNS = [
  "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", 
  "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"
];

export const ZODIAC_COLORS = [
  "#FF4D4D", "#4DFF4D", "#FFFF4D", "#4DFFFF", "#FFB347", "#B38B67",
  "#FF99CC", "#A32929", "#9933FF", "#663300", "#33CCFF", "#4D4DFF"
];

export const ESOTERIC_RULERS: Record<string, string> = {
  "Aries": "Mercurio",
  "Tauro": "Vulcano",
  "Géminis": "Venus",
  "Cáncer": "Neptuno",
  "Leo": "Sol",
  "Virgo": "Luna",
  "Libra": "Urano",
  "Escorpio": "Marte",
  "Sagitario": "Tierra",
  "Capricornio": "Saturno",
  "Acuario": "Júpiter",
  "Piscis": "Plutón"
};

export const EXOTERIC_RULERS: Record<string, string> = {
  "Aries": "Marte",
  "Tauro": "Venus",
  "Géminis": "Mercurio",
  "Cáncer": "Luna",
  "Leo": "Sol",
  "Virgo": "Mercurio",
  "Libra": "Venus",
  "Escorpio": "Plutón",
  "Sagitario": "Júpiter",
  "Capricornio": "Saturno",
  "Acuario": "Urano",
  "Piscis": "Neptuno"
};

export const SACRED_PLANETS = ["Mercurio", "Venus", "Júpiter", "Saturno", "Urano", "Neptuno", "Vulcano"];
export const NON_SACRED_PLANETS = ["Sol", "Luna", "Marte", "Tierra", "Plutón"];

export const SIGN_RAY_MAP: Record<string, EsotericRay> = {
  "Aries": EsotericRay.RAY_1,
  "Leo": EsotericRay.RAY_1,
  "Capricornio": EsotericRay.RAY_1,
  "Géminis": EsotericRay.RAY_2,
  "Virgo": EsotericRay.RAY_2,
  "Piscis": EsotericRay.RAY_2,
  "Cáncer": EsotericRay.RAY_3,
  "Libra": EsotericRay.RAY_3,
  "Sagitario": EsotericRay.RAY_3,
  "Tauro": EsotericRay.RAY_4,
  "Escorpio": EsotericRay.RAY_4,
  "Acuario": EsotericRay.RAY_5,
};

export const AKASHIC_HOUSE_MEANINGS: Record<number, { title: string, description: string, cayceInsight: string }> = {
  1: { title: "Cuerpo de Encarnación", description: "Máscara del alma.", cayceInsight: "Resultado de deseos previos." },
  2: { title: "Talentos Pasados", description: "Recursos acumulados.", cayceInsight: "Valor aprendido en el ayer." },
  3: { title: "Vínculos Mentales", description: "Karma con hermanos.", cayceInsight: "Ecos de conversaciones antiguas." },
  4: { title: "Raíces Álmicas", description: "Hogar original.", cayceInsight: "El final es un nuevo inicio." },
  5: { title: "Creaciones", description: "Linajes y deudas de amor.", cayceInsight: "El amor dado es la única joya." },
  6: { title: "Templo del Servicio", description: "Salud y purificación.", cayceInsight: "El cuerpo escribe la historia espiritual." },
  7: { title: "Espejos del Karma", description: "Contratos de almas.", cayceInsight: "Citas pactadas en el registro." },
  8: { title: "Umbral del Misterio", description: "Transformación profunda.", cayceInsight: "La muerte es cambiar de habitación." },
  9: { title: "Filosofía Viajera", description: "Sabiduría de templos.", cayceInsight: "Fe ganada en peregrinajes." },
  10: { title: "Dharma Público", description: "Misión social.", cayceInsight: "El poder se otorga para servir." },
  11: { title: "Red de Almas", description: "Aliados del despertar.", cayceInsight: "Amigos elegidos antes de nacer." },
  12: { title: "Salón de Registros", description: "Deudas y liberación.", cayceInsight: "Lugar de perdón y libertad final." }
};

export const MASTER_MAPPINGS: Record<string, { master: string, qualities: string[], ashram: string }> = {
  [EsotericRay.RAY_1]: { master: "El Morya", qualities: ["Voluntad", "Coraje"], ashram: "Ashram de Voluntad" },
  [EsotericRay.RAY_2]: { master: "Koot Hoomi", qualities: ["Amor", "Sabiduría"], ashram: "Ashram de Sabiduría" },
  [EsotericRay.RAY_3]: { master: "Paul el Veneciano", qualities: ["Creatividad"], ashram: "Ashram de Inteligencia" },
  [EsotericRay.RAY_4]: { master: "Serapis Bey", qualities: ["Armonía"], ashram: "Ashram del Arte" },
  [EsotericRay.RAY_5]: { master: "Hilarión", qualities: ["Verdad"], ashram: "Ashram de Ciencia" },
  [EsotericRay.RAY_6]: { master: "Juan el Amado", qualities: ["Devoción"], ashram: "Ashram de Idealismo" },
  [EsotericRay.RAY_7]: { master: "Saint Germain", qualities: ["Magia"], ashram: "Ashram de Orden" }
};

export const ALL_RAYS = [
    EsotericRay.RAY_1, EsotericRay.RAY_2, EsotericRay.RAY_3, 
    EsotericRay.RAY_4, EsotericRay.RAY_5, EsotericRay.RAY_6, EsotericRay.RAY_7
];

export const STARSEED_MARKERS = [
  { sign: "Tauro", degree: 28, origin: SoulOrigin.PLEIADES, name: "Alcyone" },
  { sign: "Géminis", degree: 20, origin: SoulOrigin.PLEIADES, name: "Pleiades Cluster" },
  { sign: "Cáncer", degree: 14, origin: SoulOrigin.SIRIUS, name: "Sirius" },
  { sign: "Escorpio", degree: 9, origin: SoulOrigin.ALPHA_CENTAURI, name: "Bungula" },
  { sign: "Sagitario", degree: 27, origin: SoulOrigin.MINTAKA, name: "Galactic Center" },
  { sign: "Aries", degree: 24, origin: SoulOrigin.ARCTURUS, name: "Arcturus" },
];
