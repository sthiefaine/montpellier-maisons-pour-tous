export interface MPT {
  id: string;
  name: string;
  address: string;
  slug: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface MPTWithNumber {
  id: string;
  number: number;
}

export interface Quartier {
  name: string;
  mpts: number[];
}

export const MPT_NUMBERS: MPTWithNumber[] = [
  { id: 'mpt-maison-pour-tous-andre-chamson', number: 1 },
  { id: 'mpt-maison-pour-tous-antoine-de-saint-exupery', number: 2 },
  { id: 'mpt-maison-pour-tous-fanfonne-guillierme', number: 3 },
  { id: 'mpt-maison-pour-tous-francois-villon', number: 4 },
  { id: 'mpt-maison-pour-tous-marcel-pagnol', number: 5 },
  { id: 'mpt-maison-pour-tous-paul-emile-victor', number: 6 },
  { id: 'mpt-maison-pour-tous-albert-camus', number: 7 },
  { id: 'mpt-maison-pour-tous-michel-colucci', number: 8 },
  { id: 'mpt-maison-pour-tous-albert-dubout', number: 9 },
  { id: 'mpt-maison-pour-tous-rosa-lee-parks', number: 10 },
  { id: 'mpt-maison-pour-tous-albertine-sarrazin', number: 11 },
  { id: 'mpt-maison-pour-tous-frederic-chopin', number: 12 },
  { id: 'mpt-maison-pour-tous-george-sand', number: 13 },
  { id: 'mpt-maison-pour-tous-joseph-ricome-et-theatre-gerard-philipe', number: 14 },
  { id: 'mpt-maison-pour-tous-voltaire', number: 15 },
  { id: 'mpt-maison-pour-tous-georges-brassens', number: 16 },
  { id: 'mpt-maison-pour-tous-leo-lagrange', number: 17 },
  { id: 'mpt-maison-pour-tous-marie-curie', number: 18 },
  { id: 'mpt-maison-pour-tous-louis-feuillade', number: 19 },
  { id: 'mpt-maison-pour-tous-melina-mercouri', number: 20 },
  { id: 'mpt-maison-pour-tous-frida-kahlo', number: 21 },
  { id: 'mpt-maison-pour-tous-lescoutaire', number: 22 },
  { id: 'mpt-maison-pour-tous-jean-pierre-caillens', number: 23 },
  { id: 'mpt-maison-pour-tous-boris-vian', number: 24 },
];

export const QUARTIERS: Quartier[] = [
  {
    name: 'Les Cévennes',
    mpts: [1, 2, 3, 4, 5, 6],
  },
  {
    name: "Croix d'Argent",
    mpts: [7, 8],
  },
  {
    name: 'Hôpitaux-Facultés',
    mpts: [9, 10],
  },
  {
    name: 'Centre',
    mpts: [11, 12, 13, 14, 15],
  },
  {
    name: 'Mosson',
    mpts: [16, 17, 18, 19],
  },
  {
    name: 'Port Marianne',
    mpts: [20, 21],
  },
  {
    name: "Prés d'Arènes",
    mpts: [22, 23, 24],
  },
];

export interface TramLine {
  type: string;
  properties: {
    id_lignes_sens: string;
    reseau: string;
    mode: string;
    nom_ligne: string;
    num_exploitation: number;
    sens: string;
    fonctionnement: string;
    code_couleur: string;
  };
  geometry: {
    type: string;
    coordinates: number[][];
  };
}

export interface TramData {
  type: string;
  features: TramLine[];
}
