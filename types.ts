
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

export interface CeremonialSignature {
  dominantPlanet: string;
  magicalTitle: string;
  ceremonialRay: EsotericRay;
  ritualTool: string;
  magicalFocus: string;
  house8Vortex: string;
  magicalAspects: string[]; // Análisis de aspectos de poder
}

export interface ProtectorEntity {
  name: string;
  order: 'Logia Blanca' | 'Comando Galáctico' | 'Vigilantes Akáshicos';
  description: string;
  connectionToUser: string;
  protectionSeal: string;
  imageUrl?: string;
  associatedRay: EsotericRay;
}

export interface RayScore {
  ray: string | number;
  score: number;
}

export interface ElohimPresence {
  name: string;
  complement: string;
  ray: EsotericRay;
  function: string;
  stellarEmbassy: string;
  description: string;
  imageUrl?: string;
}

export interface PlanetPosition {
  name: string;
  sign: string;
  degree: number;
  house: number;
  exotericRuler: string;
  esotericRuler: string;
  hierarchicalRuler: string;
  mutualRegency: string;
  isSacred: boolean;
  ray: EsotericRay;
}

export interface Aspect {
  p1: string;
  p2: string;
  type: 'conjunction' | 'square' | 'opposition' | 'trine' | 'sextile';
  orb: number;
  esotericEffect?: string;
}

export interface FixedStarAlignment {
  starName: string;
  significance: string;
}

export interface SpiritualMastery {
  soulRay: EsotericRay;
  masterName: string;
  masterQualities: string[];
  ashramWork: string;
  mahaChohanAdvice: string;
  soulGroup?: string;
}

export interface SoulReading {
  originDistribution: Array<{ name: string; value: number }>;
  rayProfile: RayProfile;
  akashicInsight: string;
  geocentricPoints: PlanetPosition[];
  esotericBodies: any[];
  pastLifeAsteroids: PlanetPosition[];
  spiritualMastery: SpiritualMastery;
  hierarchy: {
    monad: any;
    solarAngel: any;
    chohan: any;
    archangel: any;
  };
  elohim: ElohimPresence;
  sentinel: any;
  astralEntity: any;
  historicalEcho: any;
  protectorEntity: ProtectorEntity; // Cambiado de OccultEntity a ProtectorEntity
  ceremonialSignature: CeremonialSignature;
  ufologicalAnalysis: {
    dnaResonance: string;
    contactType: string;
    ufologyNote: string;
    guardianName: string;
    guardianRank: string;
    elohimVibration: string;
    southernHemisphereAlignment: string;
  };
  masterImageUrl?: string;
  entityImageUrl?: string;
  solarAngelImageUrl?: string;
  monadImageUrl?: string;
  sentinelImageUrl?: string;
  elohimImageUrl?: string;
  protectorImageUrl?: string;
  angles: {
    asc: number;
    ascSign: string;
    mc: number;
    ic: number;
    dc: number;
    mcSign: string;
    icSign: string;
    dcSign: string;
  };
  fixedStarAlignments: FixedStarAlignment[];
  aspects: Aspect[];
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
  lat?: string;
  lon?: string;
}
