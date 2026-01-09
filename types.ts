
export enum SoulOrigin {
  SIRIUS = "Sirio",
  PLEIADES = "Pléyades",
  ARCTURUS = "Arturo",
  LYRA = "Lyra",
  ORION = "Orión",
  ANDROMEDA = "Andrómeda",
  MINTAKA = "Míntaka",
  VEGA = "Vega",
  EARTH_NATIVE = "Nativo de la Tierra"
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

export interface GalacticRace {
  name: string;
  origin: SoulOrigin;
  traits: string[];
  mission: string;
  frequency: string;
  stellarGate: string;
  description: string;
}

export interface UfologicalAlignment {
  stationName: string;
  fleet: string;
  proximity: number;
  contactType: 'Físico' | 'Telepático' | 'Onírico' | 'Multidimensional';
  description: string;
  shipImageUrl?: string;
}

export interface AstralGuardian {
  name: string;
  type: string;
  power: string;
  sigil: string;
  element: 'Fuego' | 'Tierra' | 'Aire' | 'Agua';
}

export interface AnubisProtection {
  house: number;
  sign: string;
  isAtMC: boolean;
  aspectToElMorya: string;
  protectionLevel: number;
  astralStatus: string;
  moryaDecree: string;
  vulnerabilityNote: string;
  guardians: AstralGuardian[];
}

export interface RayScore {
  ray: string | number;
  score: number;
}

export interface SpiritualMastery {
  soulRay: EsotericRay;
  masterName: string;
  masterQualities: string[];
  ashramWork: string;
  mahaChohanAdvice: string;
  soulGroup?: string;
}

export interface CeremonialSignature {
  dominantPlanet: string;
  magicalTitle: string;
  ceremonialRay: EsotericRay;
  ritualTool: string;
  magicalFocus: string;
  house8Vortex: string;
  magicalAspects: string[];
}

export interface ProtectorEntity {
  name: string;
  order: 'Logia Blanca' | 'Comando Galáctico' | 'Vigilantes Akáshicos';
  description: string;
  protectionSeal: string;
  imageUrl?: string;
  associatedRay: EsotericRay;
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

export interface SoulReading {
  rayProfile: {
    soul: EsotericRay;
    personality: EsotericRay;
    mentalBody: EsotericRay;
    astralBody: EsotericRay;
    physicalBody: EsotericRay;
    mahaChohanSynthesis: EsotericRay;
  };
  starseedOrigin: GalacticRace;
  akashicInsight: string;
  geocentricPoints: PlanetPosition[];
  pastLifeAsteroids: PlanetPosition[];
  anubisProtection: AnubisProtection;
  ufologicalReport: UfologicalAlignment[];
  spiritualMastery: SpiritualMastery;
  hierarchy: {
    monad: any;
    solarAngel: any;
    chohan: any;
    archangel: any;
  };
  elohim: any;
  protectorEntity: ProtectorEntity;
  ceremonialSignature: CeremonialSignature;
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
  fixedStarAlignments: any[];
  aspects: Aspect[];
  masterImageUrl?: string;
  protectorImageUrl?: string;
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
