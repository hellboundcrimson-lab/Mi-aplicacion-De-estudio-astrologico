
import { BirthData, SoulReading, EsotericRay, PlanetPosition, SoulOrigin } from '../types';
import { ZODIAC_SIGNS, SIGN_RAY_MAP, MASTER_MAPPINGS, ESOTERIC_RULERS, EXOTERIC_RULERS, SACRED_PLANETS, ALL_RAYS } from '../constants';

const ARCHANGEL_MAP: Record<string, string> = {
  [EsotericRay.RAY_1]: "Miguel",
  [EsotericRay.RAY_2]: "Jofiel",
  [EsotericRay.RAY_3]: "Chamuel",
  [EsotericRay.RAY_4]: "Gabriel",
  [EsotericRay.RAY_5]: "Rafael",
  [EsotericRay.RAY_6]: "Uriel",
  [EsotericRay.RAY_7]: "Zadquiel"
};

const pseudoRandom = (seed: number, index: number) => {
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
};

export const calculateEsotericChart = (data: BirthData): SoulReading => {
  const seed = new Date(data.date).getTime() + (data.name.length * 777);
  
  const generatePoints = (names: string[], offset: number): PlanetPosition[] => {
    return names.map((name, index) => {
      const val = pseudoRandom(seed + offset, index);
      const sign = ZODIAC_SIGNS[Math.floor(val * 12)];
      const degree = Math.floor(pseudoRandom(seed + offset + index, 100) * 30);
      return {
        name, sign, degree, house: Math.floor(val * 12) + 1,
        esotericRuler: ESOTERIC_RULERS[sign] || "Vulcano",
        exotericRuler: EXOTERIC_RULERS[sign] || "Marte",
        isSacred: SACRED_PLANETS.includes(name),
        ray: SIGN_RAY_MAP[sign] || ALL_RAYS[index % 7]
      };
    });
  };

  const geo = generatePoints(["Sol", "Luna", "Mercurio", "Venus", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno", "Plutón"], 0);
  const asteroids = generatePoints(["Vesta", "Palas", "Juno", "Ceres", "Quirón", "Anubis", "Isis"], 100);
  
  const soulRay = SIGN_RAY_MAP[geo[0].sign] || EsotericRay.RAY_2;
  const masterData = MASTER_MAPPINGS[soulRay];
  
  const origins = Object.values(SoulOrigin);
  const akashicOrigin = origins[seed % origins.length];

  // Jerarquía
  const hierarchy = {
    monad: {
      role: "Mónada",
      name: `Presencia Yo Soy - Frecuencia ${geo[0].degree * 10}nm`,
      energy: "Voluntad Pura",
      description: "La chispa divina original de donde emana tu ser."
    },
    solarAngel: {
      role: "Ángel Solar",
      name: "El Instructor Silencioso",
      energy: "Manas Superior",
      description: "El ser de luz que custodia tu evolución a través de los tiempos."
    },
    chohan: {
      role: "Chohan",
      name: masterData.master,
      energy: soulRay,
      description: "El Maestro Ascendido que dirige tu departamento de servicio."
    },
    archangel: {
      role: "Arcángel",
      name: ARCHANGEL_MAP[soulRay] || "Metatrón",
      energy: "Sustancia Angélica",
      description: "El regente de las legiones de luz que protegen tu Rayo."
    }
  };

  // Sentinela Akáshico (Lógica base)
  const dominantAsteroid = asteroids[seed % asteroids.length];
  const sentinel: SoulReading['sentinel'] = {
    name: "Identificando...",
    origin: akashicOrigin,
    asteroidDominant: dominantAsteroid.name,
    vowOfProtection: "Sincronizando...",
    description: "Analizando contrato kármico..."
  };

  return {
    originDistribution: [],
    rayProfile: {
      soul: soulRay,
      personality: geo[1].ray || ALL_RAYS[1],
      mentalBody: geo[2].ray || ALL_RAYS[2],
      astralBody: geo[3].ray || ALL_RAYS[3],
      physicalBody: geo[6].ray || ALL_RAYS[6],
      mahaChohanSynthesis: geo[5].ray || ALL_RAYS[0],
      distributions: { sacred: [], nonSacred: [], total: [] }
    },
    akashicInsight: "",
    geocentricPoints: [...geo, ...asteroids],
    esotericBodies: [],
    pastLifeAsteroids: asteroids,
    fixedStarAlignments: [],
    aspects: [],
    spiritualMastery: {
      soulRay,
      masterName: masterData.master,
      masterQualities: masterData.qualities,
      ashramWork: masterData.ashram,
      mahaChohanAdvice: `Enfoca tu voluntad en el servicio a través del ${soulRay.split(':')[0]}.`,
      soulGroup: "Grupo de Almas de la Sexta Iniciación"
    },
    hierarchy,
    sentinel,
    astralEntity: {
      type: "Interdimensional",
      vibration: "963 Hz",
      astralOrigin: akashicOrigin,
      entityDescription: "Protector de los registros akáshicos personales."
    },
    historicalEcho: {
      name: "Tesla Pattern",
      similarity: 92,
      sharedTraits: ["Innovación", "Electromagnetismo"],
      era: "Siglo XX"
    },
    ufologicalAnalysis: {
      dnaResonance: `Linaje de ${akashicOrigin}`,
      contactType: "Telepático",
      ufologyNote: "Fuerte señal de activación monádica.",
      guardianName: "Oromasis",
      guardianRank: "Comandante Galáctico"
    },
    angles: { asc: 0, ascSign: geo[0].sign, mc: 0, ic: 0, dc: 0 }
  };
};
