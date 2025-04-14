export interface Neighborhood {
  name: string;
  code: string;
  mpts: {
    code: string;
    name: string;
  }[];
}

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    name: 'LES CÉVENNES',
    code: '34080',
    mpts: [
      { code: '1', name: 'André Chamson' },
      { code: '2', name: 'Antoine de Saint-Exupéry' },
      { code: '3', name: 'Fanfonne Guillierme' },
      { code: '4', name: 'François Villon' },
      { code: '5', name: 'Marcel Pagnol' },
      { code: '6', name: 'Paul-Émile Victor' },
    ],
  },
  {
    name: "CROIX D'ARGENT",
    code: '34070',
    mpts: [
      { code: '7', name: 'Albert Camus' },
      { code: '8', name: 'Michel Colucci' },
    ],
  },
  {
    name: 'HÔPITAUX-FACULTÉS',
    code: '34090',
    mpts: [
      { code: '9', name: 'Albert Dubout' },
      { code: '10', name: 'Rosa-Lee Parks' },
    ],
  },
  {
    name: 'MONTPELLIER-CENTRE',
    code: '34000',
    mpts: [
      { code: '11', name: 'Albertine Sarrazin' },
      { code: '12', name: 'Frédéric Chopin' },
      { code: '13', name: 'George Sand' },
      { code: '14', name: 'Joseph Ricôme' },
      { code: '15', name: 'Voltaire' },
    ],
  },
  {
    name: 'MOSSON',
    code: '34080',
    mpts: [
      { code: '16', name: 'Georges Brassens' },
      { code: '17', name: 'Léo Lagrange' },
      { code: '18', name: 'Marie Curie' },
      { code: '19', name: 'Louis Feuillade' },
    ],
  },
  {
    name: 'PORT-MARIANNE',
    code: '34000',
    mpts: [
      { code: '20', name: 'Mélina Mercouri' },
      { code: '21', name: 'Frida Kahlo' },
    ],
  },
  {
    name: "PRÈS D'ARÈNES",
    code: '34070',
    mpts: [
      { code: '22', name: "L'Escoutaïre" },
      { code: '23', name: 'Jean-Pierre Caillens' },
      { code: '24', name: 'Boris Vian' },
    ],
  },
];

export const getNeighborhoodByMPTCode = (mptCode: string): Neighborhood | undefined => {
  return NEIGHBORHOODS.find(neighborhood => neighborhood.mpts.some(mpt => mpt.code === mptCode));
};

export const getMPTByCode = (mptCode: string) => {
  for (const neighborhood of NEIGHBORHOODS) {
    const mpt = neighborhood.mpts.find(m => m.code === mptCode);
    if (mpt) {
      return { ...mpt, neighborhood: neighborhood.name };
    }
  }
  return undefined;
};
