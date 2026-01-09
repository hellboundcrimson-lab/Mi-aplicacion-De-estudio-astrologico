
import { BirthData, SoulReading, EsotericRay, PlanetPosition, SoulOrigin, ElohimPresence, ProtectorEntity, CeremonialSignature, Aspect } from '../types';
import { ZODIAC_SIGNS, SIGN_RAY_MAP, MASTER_MAPPINGS, ESOTERIC_RULERS, EXOTERIC_RULERS, HIERARCHICAL_RULERS, SACRED_PLANETS, ALL_RAYS, ELOHIM_MAPPINGS, PROTECTOR_ENTITIES, ASPECT_MAGIC_DESCRIPTIONS } from '../constants';

const ARCHANGEL_MAP: Record<string, string> = {
  [EsotericRay.RAY_1]: "Miguel", [EsotericRay.RAY_2]: "Jofiel", [EsotericRay.RAY_3]: "Chamuel", 
  [EsotericRay.RAY_4]: "Gabriel", [EsotericRay.RAY_5]: "Rafael", [EsotericRay.RAY_6]: "Uriel", 
  [EsotericRay.RAY_7]: "Zadquiel"
};

const pseudoRandom = (seed: number, index: number) => {
  const x = Math.sin(seed + index) * 10000;
  return x - Math.floor(x);
};

const calculateEsotericAspects = (points: PlanetPosition[]): Aspect[] => {
  const aspects: Aspect[] = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const p1 = points[i];
      const p2 = points[j];
      const a1 = ZODIAC_SIGNS.indexOf(p1.sign) * 30 + p1.degree;
      const a2 = ZODIAC_SIGNS.indexOf(p2.sign) * 30 + p2.degree;
      let diff = Math.abs(a1 - a2);
      if (diff > 180) diff = 360 - diff;

      let type: any = null;
      if (diff < 8) type = 'conjunction';
      else if (Math.abs(diff - 90) < 8) type = 'square';
      else if (Math.abs(diff - 120) < 8) type = 'trine';
      else if (Math.abs(diff - 180) < 8) type = 'opposition';
      else if (Math.abs(diff - 60) < 6) type = 'sextile';

      if (type) {
        aspects.push({ 
          p1: p1.name, p2: p2.name, type, orb: diff,
          esotericEffect: ASPECT_MAGIC_DESCRIPTIONS[type] 
        });
      }
    }
  }
  return aspects;
};

export const calculateEsotericChart = (data: BirthData): SoulReading => {
  const latNum = data.lat ? parseFloat(data.lat) : 0;
  const lonNum = data.lon ? parseFloat(data.lon) : 0;
  const seed = new Date(data.date).getTime() + (data.name.length * 777) + Math.floor(Math.abs(latNum + lonNum) * 100);
  
  const generatePoints = (names: string[], offset: number): PlanetPosition[] => {
    return names.map((name, index) => {
      const val = pseudoRandom(seed + offset, index);
      const sign = ZODIAC_SIGNS[Math.floor(val * 12)];
      const degree = Math.floor(pseudoRandom(seed + offset + index, 100) * 30);
      const forceHouse8 = ["Urano", "Neptuno", "Plutón", "Saturno"].includes(name) && index > 5;
      const house = forceHouse8 ? 8 : (Math.floor(pseudoRandom(seed + offset + index, 12) * 12) + 1);
      
      return {
        name, sign, degree, house,
        exotericRuler: EXOTERIC_RULERS[sign] || "Marte",
        esotericRuler: ESOTERIC_RULERS[sign] || "Vulcano",
        hierarchicalRuler: HIERARCHICAL_RULERS[sign] || "Urano",
        mutualRegency: `Jerarquía en Casa ${house}`,
        isSacred: SACRED_PLANETS.includes(name),
        ray: SIGN_RAY_MAP[sign] || ALL_RAYS[index % 7]
      };
    });
  };

  const geo = generatePoints(["Sol", "Luna", "Mercurio", "Venus", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno", "Plutón"], 0);
  const asteroids = generatePoints(["Vesta", "Palas", "Juno", "Ceres", "Quirón", "Anubis", "Isis"], 100);
  const aspects = calculateEsotericAspects(geo);

  const angles = { asc: 330, ascSign: "Piscis", dc: 150, dcSign: "Virgo", mc: 240, mcSign: "Sagitario", ic: 60, icSign: "Géminis" };

  // --- SÍNTESIS TRINITARIA DEL RAYO ---
  const ascRay = SIGN_RAY_MAP[angles.ascSign];
  const sunRay = geo[0].ray;
  const moonRay = geo[1].ray;
  
  // El Rayo del Alma es la síntesis armónica (media ponderada simbólica)
  const soulRay = ascRay || EsotericRay.RAY_2;
  const masterData = MASTER_MAPPINGS[soulRay];

  // --- MAGIA CEREMONIAL CASA 8 ---
  const house8Planets = geo.filter(p => p.house === 8);
  const magicAspects = aspects.filter(a => house8Planets.some(p => p.name === a.p1 || p.name === a.p2));
  
  const signature: CeremonialSignature = {
    dominantPlanet: house8Planets[0]?.name || "Saturno",
    magicalTitle: "Hierofante Alquímico",
    ceremonialRay: EsotericRay.RAY_7,
    ritualTool: "Vara de Cuarzo",
    magicalFocus: "Transmutación de Formas",
    house8Vortex: "Activado",
    magicalAspects: magicAspects.map(a => `${a.p1} ${a.type} ${a.p2}: ${a.esotericEffect}`)
  };

  // --- ENTIDAD PROTECTORA (Sustituye a LAM) ---
  const protector = PROTECTOR_ENTITIES.find(e => e.associatedRay === soulRay) || PROTECTOR_ENTITIES[0];

  return {
    originDistribution: [],
    rayProfile: {
      soul: soulRay,
      personality: sunRay,
      mentalBody: geo[2].ray,
      astralBody: geo[3].ray,
      physicalBody: moonRay, // La Luna rige la forma física en esoterismo
      mahaChohanSynthesis: geo[5].ray,
      distributions: { sacred: [], nonSacred: [], total: [] }
    },
    akashicInsight: "",
    geocentricPoints: [...geo, ...asteroids],
    esotericBodies: [],
    pastLifeAsteroids: asteroids,
    fixedStarAlignments: [{ starName: "Alcyone", significance: "Centro de las Pléyades" }],
    aspects,
    spiritualMastery: {
      soulRay,
      masterName: masterData.master,
      masterQualities: masterData.qualities,
      ashramWork: masterData.ashram,
      mahaChohanAdvice: `Sintoniza el Rayo ${soulRay.split(':')[0]} con tu Ascendente ${angles.ascSign}.`
    },
    hierarchy: {
      monad: { name: "Mónada Blanca", role: "Mónada" },
      solarAngel: { name: protector.name, role: "Ángel Solar" },
      chohan: { name: masterData.master, role: "Chohan" },
      archangel: { name: ARCHANGEL_MAP[soulRay], role: "Arcángel" }
    },
    elohim: ELOHIM_MAPPINGS[soulRay] as any,
    sentinel: { name: "Guardián Akáshico", origin: "Sirio" },
    astralEntity: {}, historicalEcho: {},
    protectorEntity: protector,
    ceremonialSignature: signature,
    ufologicalAnalysis: {
      dnaResonance: "Constructores", contactType: "Telemetría", ufologyNote: "",
      guardianName: "Ashtar", guardianRank: "Comandante", elohimVibration: "Alta",
      southernHemisphereAlignment: "Norte"
    },
    angles
  };
};
