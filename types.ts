
export enum SoulOrigin {
  SIRIUS = "Sirio",
  PLEIADES = "Pléyades",
  ARCTURUS = "Arturo",
  LYRA = "Lyra",
  ORION = "Orión",
  ANDROMEDA = "Andrómeda",
  MINTAKA = "Mintaka",
  VEGA = "Vega",
  ALPHA_CENTAURI = "Alfa Centauri",
  ANTARES = "Antares",
  EARTH_NATIVE = "Nativo de la Tierra",
  GALACTIC_CENTER = "Centro Galáctico",
  CANOPUS = "Canopus"
}

export enum EsotericRay {
  RAY_1 = "Rayo 1: Voluntad y Poder",
  RAY_2 = "Rayo 2: Amor y Sabiduría",
  RAY_3 = "Rayo 3: Inteligencia Activa",
  RAY_4 = "Rayo 4: Armonía a través del Conflicto",
  RAY_5 = "Rayo 5: Conocimiento Concreto",
  RAY_6 = "Rayo 6: Devoción e Idealismo",
  RAY_7 = "Rayo 7: Orden Ceremonial"
}

// Added missing RayScore interface for chart data representation
export interface RayScore {
  ray: string | number;
  score: number;
}

export interface Aspect {
  p1: string;
  p2: string;
  type: 'conjunction' | 'square' | 'opposition' | 'trine' | 'sextile' | string;
  orb: number;
}

export interface HierarchyMember {
  role: string;
  name: string;
  energy: string;
  description: string;
  imageUrl?: string;
}

export interface PlanetPosition {
  name: string;
  sign: string;
  degree: number;
  house: number;
  esotericRuler: string;
  exotericRuler: string;
  isSacred: boolean;
  ray: EsotericRay;
}

export interface SpiritualMastery {
  soulRay: EsotericRay;
  masterName: string;
  masterQualities: string[];
  ashramWork: string;
  mahaChohanAdvice: string;
  soulGroup?: string;
}

export interface AkashicSentinel {
  name: string;
  origin: SoulOrigin;
  asteroidDominant: string;
  vowOfProtection: string;
  description: string;
  imageUrl?: string;
}

export interface SoulReading {
  originDistribution: Array<{ name: string; value: number }>;
  rayProfile: RayProfile;
  akashicInsight: string;
  geocentricPoints: PlanetPosition[];
  esotericBodies: any[];
  pastLifeAsteroids: PlanetPosition[];
  fixedStarAlignments: any[];
  aspects: Aspect[];
  spiritualMastery: SpiritualMastery;
  hierarchy: {
    monad: HierarchyMember;
    solarAngel: HierarchyMember;
    chohan: HierarchyMember;
    archangel: HierarchyMember;
  };
  sentinel: AkashicSentinel;
  astralEntity: {
    type: string;
    vibration: string;
    astralOrigin: string;
    entityDescription: string;
  };
  historicalEcho: {
    name: string;
    similarity: number;
    sharedTraits: string[];
    era: string;
  };
  ufologicalAnalysis: {
    dnaResonance: string;
    contactType: string;
    ufologyNote: string;
    guardianName: string;
    guardianRank: string;
  };
  masterImageUrl?: string;
  entityImageUrl?: string;
  solarAngelImageUrl?: string;
  monadImageUrl?: string;
  angles: {
    asc: number;
    ascSign: string;
    mc: number;
    ic: number;
    dc: number;
  };
}

export interface RayProfile {
  soul: EsotericRay;
  personality: EsotericRay;
  mentalBody: EsotericRay;
  astralBody: EsotericRay;
  physicalBody: EsotericRay;
  mahaChohanSynthesis: EsotericRay;
  distributions: {
    sacred: RayScore[];
    nonSacred: RayScore[];
    total: RayScore[];
  };
}

export interface BirthData {
  name: string;
  date: string;
  time: string;
  city: string;
  country: string;
}
