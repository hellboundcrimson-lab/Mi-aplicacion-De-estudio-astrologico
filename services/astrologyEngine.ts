
import { BirthData, SoulReading, EsotericRay, PlanetPosition, Aspect, AnubisProtection, CeremonialSignature, AstralGuardian, UfologicalAlignment, GalacticRace, SoulOrigin } from '../types';
import { ZODIAC_SIGNS, SIGN_RAY_MAP, MASTER_MAPPINGS, EXOTERIC_RULERS, ESOTERIC_RULERS, HIERARCHICAL_RULERS, SACRED_PLANETS, ALL_RAYS, ELOHIM_MAPPINGS, PROTECTOR_ENTITIES, GALACTIC_RACES } from '../constants';

export const ELEMENT_MAP: Record<string, 'Fuego' | 'Tierra' | 'Aire' | 'Agua'> = {
  "Aries": 'Fuego', "Leo": 'Fuego', "Sagitario": 'Fuego',
  "Tauro": 'Tierra', "Virgo": 'Tierra', "Capricornio": 'Tierra',
  "Géminis": 'Aire', "Libra": 'Aire', "Acuario": 'Aire',
  "Cáncer": 'Agua', "Escorpio": 'Agua', "Piscis": 'Agua'
};

const GUARDIAN_DATA: Record<'Fuego' | 'Tierra' | 'Aire' | 'Agua', AstralGuardian[]> = {
  'Fuego': [
    { name: "Efreet del Rayo Azul", type: "Protector de Voluntad", power: "Calcinación de Larvas", sigil: "Sello de Agni", element: 'Fuego' },
    { name: "Serafín de Morya", type: "Escolta de Combate", power: "Espada de Fuego Sagrado", sigil: "Llama de Sirio", element: 'Fuego' }
  ],
  'Tierra': [
    { name: "Guardia de Obsidiana", type: "Protector del Cuerpo", power: "Blindaje de Plomo Espiritual", sigil: "Tetraedro Pétreo", element: 'Tierra' },
    { name: "Anubis de las Criptas", type: "Centinela del Umbral", power: "Sólida Densidad Áurea", sigil: "Llave de Geb", element: 'Tierra' }
  ],
  'Aire': [
    { name: "Silfo de Cristal", type: "Protector Mental", power: "Disipación de Nubes Astrales", sigil: "Vórtice de Mercurio", element: 'Aire' },
    { name: "Vigilante del Viento", type: "Escucha Etérico", power: "Claridad en el Caos", sigil: "Ala de Thoth", element: 'Aire' }
  ],
  'Agua': [
    { name: "Centinela Abisal", type: "Protector Emocional", power: "Purificación de Corrientes", sigil: "Tridente de Neptuno", element: 'Agua' },
    { name: "Guía de Leteo", type: "Protector de Memoria", power: "Vigilancia del Olvido", sigil: "Cáliz de Isis", element: 'Agua' }
  ]
};

const GALACTIC_STATIONS = [
  { name: "La Nueva Jerusalén", fleet: "Comando Ashtar", contact: 'Telepático' },
  { name: "Base Sirio B", fleet: "Federación Galáctica", contact: 'Multidimensional' },
  { name: "Estación Alcíone", fleet: "Consejo de las Pléyades", contact: 'Onírico' },
  { name: "Nave Nodriza Fénix", fleet: "Comando Galáctico", contact: 'Físico' }
];

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
      const house = (Math.floor(pseudoRandom(seed + offset + index, 12) * 12) + 1);
      
      return {
        name, sign, degree, house,
        exotericRuler: EXOTERIC_RULERS[sign] || "Marte",
        esotericRuler: ESOTERIC_RULERS[sign] || "Vulcano",
        hierarchicalRuler: HIERARCHICAL_RULERS[sign] || "Urano",
        mutualRegency: `Sector ${house} Galáctico`,
        isSacred: SACRED_PLANETS.includes(name) || name === "Astrea" || name === "DNA",
        ray: SIGN_RAY_MAP[sign] || ALL_RAYS[index % 7]
      };
    });
  };

  const geo = generatePoints(["Sol", "Luna", "Mercurio", "Venus", "Marte", "Júpiter", "Saturno", "Urano", "Neptuno", "Plutón"], 0);
  const asteroids = generatePoints(["Anubis", "Vesta", "Palas", "Juno", "Ceres", "Quirón", "Isis", "DNA", "Astrea"], 100);
  
  const ascVal = pseudoRandom(seed, 99);
  const ascSign = ZODIAC_SIGNS[Math.floor(ascVal * 12)];
  const angles = { 
    asc: 0, ascSign, 
    dc: 180, dcSign: ZODIAC_SIGNS[(Math.floor(ascVal * 12) + 6) % 12], 
    mc: 270, mcSign: ZODIAC_SIGNS[(Math.floor(ascVal * 12) + 9) % 12],
    ic: 90, icSign: ZODIAC_SIGNS[(Math.floor(ascVal * 12) + 3) % 12]
  };

  const soulRay = SIGN_RAY_MAP[angles.ascSign] || EsotericRay.RAY_2;

  // --- LÓGICA DE ORIGEN BASADA EN ASTREA ---
  const astreaPoint = asteroids.find(a => a.name === "Astrea")!;
  const dnaPoint = asteroids.find(a => a.name === "DNA")!;
  
  let origin: SoulOrigin = SoulOrigin.EARTH_NATIVE;
  const astreaSign = astreaPoint.sign;

  if (["Cáncer", "Escorpio", "Piscis"].includes(astreaSign)) origin = SoulOrigin.SIRIUS;
  else if (["Géminis", "Tauro", "Libra"].includes(astreaSign)) origin = SoulOrigin.PLEIADES;
  else if (["Virgo", "Capricornio"].includes(astreaSign)) origin = SoulOrigin.ARCTURUS;
  else if (["Aries", "Leo", "Sagitario"].includes(astreaSign)) origin = SoulOrigin.ANDROMEDA;
  else origin = SoulOrigin.LYRA;

  const starseedOrigin = GALACTIC_RACES[origin] || GALACTIC_RACES[SoulOrigin.SIRIUS];

  // Actualizar mutualRegency con el linaje para Astrea y DNA
  asteroids.forEach(p => {
    if (p.name === "Astrea") {
      p.mutualRegency = `Canal de Pureza: ${starseedOrigin.name}`;
    }
    if (p.name === "DNA") {
      p.mutualRegency = `Firma Genética: ${starseedOrigin.origin}`;
    }
  });

  // --- ANUBIS PROTECTION ---
  const anubis = asteroids.find(a => a.name === "Anubis")!;
  const isAtMC = anubis.sign === angles.mcSign || anubis.house === 10;
  const element = ELEMENT_MAP[anubis.sign];

  const anubisProtection: AnubisProtection = {
    house: anubis.house, 
    sign: anubis.sign, 
    isAtMC,
    aspectToElMorya: "Sextil de Voluntad",
    protectionLevel: isAtMC ? 99 : 72,
    astralStatus: isAtMC ? "SOBERANO DEL UMBRAL" : "ESCOLTA GALÁCTICA ACTIVA",
    moryaDecree: isAtMC ? "Yo Soy el Guardián del Velo Estelar." : "Yo Soy la Luz que disuelve la Sombra.",
    vulnerabilityNote: `Firma Astrea en ${astreaSign} asegura pureza en el escudo.`,
    guardians: GUARDIAN_DATA[element]
  };

  const ufologicalReport: UfologicalAlignment[] = GALACTIC_STATIONS.map((station, i) => ({
    stationName: station.name,
    fleet: station.fleet,
    proximity: Math.floor(pseudoRandom(seed + 500, i) * 100),
    contactType: station.contact as any,
    description: `Sincronización establecida mediante el portal ${geo[i].sign}.`
  }));

  return {
    rayProfile: {
      soul: soulRay, 
      personality: geo[0].ray, 
      mentalBody: geo[2].ray, 
      astralBody: geo[3].ray, 
      physicalBody: geo[1].ray, 
      mahaChohanSynthesis: geo[5].ray
    },
    starseedOrigin,
    akashicInsight: "",
    geocentricPoints: [...geo, ...asteroids],
    pastLifeAsteroids: asteroids,
    anubisProtection,
    ufologicalReport,
    aspects: [],
    spiritualMastery: {
      soulRay, 
      masterName: MASTER_MAPPINGS[soulRay]?.master || "El Morya", 
      masterQualities: MASTER_MAPPINGS[soulRay]?.qualities || ["Voluntad"], 
      ashramWork: MASTER_MAPPINGS[soulRay]?.ashram || "Ashram Central",
      mahaChohanAdvice: `La vibración de DNA en ${dnaPoint.sign} indica un despertar inminente.`,
      soulGroup: `Frecuencia de ${starseedOrigin.name}`
    },
    hierarchy: { 
      monad: { name: "Mónada Blanca" }, 
      solarAngel: { name: "Vigilante de Sirio" }, 
      chohan: { name: MASTER_MAPPINGS[soulRay]?.master || "Chohan Central" }, 
      archangel: { name: "Miguel" } 
    },
    elohim: ELOHIM_MAPPINGS[soulRay],
    protectorEntity: PROTECTOR_ENTITIES[0],
    ceremonialSignature: { 
      dominantPlanet: "Urano", 
      magicalTitle: "Embajador de la Federación", 
      ceremonialRay: EsotericRay.RAY_7, 
      ritualTool: "Cetro de Cristal", 
      magicalFocus: "Contacto Galáctico", 
      house8Vortex: "Vibración Alta", 
      magicalAspects: [] 
    },
    angles,
    fixedStarAlignments: []
  };
};
