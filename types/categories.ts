export const MAIN_CATEGORIES = [
  'Activités physiques, détente',
  'Solidarité, médiation et partage',
  'Langues et alphabétisation',
  'Littérature et société, théâtre et cirque',
  'Activités musicales',
  'Danse',
  'Activités artistiques',
  'Loisirs',
  "Technologie de l'information, sciences et divers",
] as const;

export type MainCategory = (typeof MAIN_CATEGORIES)[number];

export const CATEGORY_IMAGES: Record<string, string> = {
  'Activités physiques, détente': '/AC_sport.png',
  'Langues et alphabétisation': '/AC_langues.png',
  'Littérature et société, théâtre et cirque': '/AC_theatre.png',
  'Solidarité, médiation et partage': '/AC_solidarite.png',
};

export const SUB_CATEGORIES: Record<MainCategory, string[]> = {
  'Activités physiques, détente': [
    'Yoga',
    'Relaxation',
    'Arts martiaux',
    'Gymnastique',
    'Fitness',
    'Sports collectifs',
    'Sports individuels',
    'Bien-être',
    'Autre',
  ],

  'Solidarité, médiation et partage': [
    'Accompagnement professionnel',
    'Aide sociale',
    'Médiation',
    'Entraide',
    'Intégration',
    'Autre',
  ],

  'Langues et alphabétisation': [
    'Français',
    'Anglais',
    'Espagnol',
    'Autres langues européennes',
    'Langues orientales',
    'Alphabétisation',
    'Autre',
  ],

  'Littérature et société, théâtre et cirque': [
    'Théâtre',
    'Cirque',
    'Écriture',
    'Lecture',
    'Débats',
    'Autre',
  ],

  'Activités musicales': [
    'Instruments à cordes',
    'Instruments à vent',
    'Percussions',
    'Chant',
    'Musique électronique',
    'Éveil musical',
    'Autre',
  ],

  Danse: [
    'Danse classique',
    'Danse contemporaine',
    'Danses de salon',
    'Danses urbaines',
    'Danses du monde',
    'Éveil à la danse',
    'Autre',
  ],

  'Activités artistiques': [
    'Peinture',
    'Dessin',
    'Sculpture',
    'Poterie',
    'Arts plastiques',
    'Photographie',
    'Autre',
  ],

  Loisirs: [
    'Jeux de société',
    'Cuisine',
    'Jardinage',
    'Activités manuelles',
    'Sorties culturelles',
    'Autre',
  ],

  "Technologie de l'information, sciences et divers": [
    'Informatique, internet et EPI',
    'Sciences et découverte',
    'Programmation et jeux vidéo',
    'Accompagnement numérique',
    'Robotique',
    'Autre',
  ],
};

export const ACTIVITY_TYPE_MAPPING: Record<
  string,
  { category: MainCategory; subCategory: string }
> = {
  yoga: { category: 'Activités physiques, détente', subCategory: 'Yoga' },
  'hata yoga': {
    category: 'Activités physiques, détente',
    subCategory: 'Yoga',
  },
  'yoga adapté': {
    category: 'Activités physiques, détente',
    subCategory: 'Yoga',
  },
  'yoga sur chaise': {
    category: 'Activités physiques, détente',
    subCategory: 'Yoga',
  },
  relaxation: {
    category: 'Activités physiques, détente',
    subCategory: 'Relaxation',
  },
  méditation: {
    category: 'Activités physiques, détente',
    subCategory: 'Relaxation',
  },

  capoeira: {
    category: 'Activités physiques, détente',
    subCategory: 'Arts martiaux',
  },
  judo: {
    category: 'Activités physiques, détente',
    subCategory: 'Arts martiaux',
  },
  karaté: {
    category: 'Activités physiques, détente',
    subCategory: 'Arts martiaux',
  },
  taekwondo: {
    category: 'Activités physiques, détente',
    subCategory: 'Arts martiaux',
  },
  'éveil judo': {
    category: 'Activités physiques, détente',
    subCategory: 'Arts martiaux',
  },
  aïkido: {
    category: 'Activités physiques, détente',
    subCategory: 'Arts martiaux',
  },

  théâtre: {
    category: 'Littérature et société, théâtre et cirque',
    subCategory: 'Théâtre',
  },
  cirque: {
    category: 'Littérature et société, théâtre et cirque',
    subCategory: 'Cirque',
  },
  clown: {
    category: 'Littérature et société, théâtre et cirque',
    subCategory: 'Cirque',
  },

  'accompagnement à la reprise professionnelle': {
    category: 'Solidarité, médiation et partage',
    subCategory: 'Accompagnement professionnel',
  },

  informatique: {
    category: "Technologie de l'information, sciences et divers",
    subCategory: 'Informatique, internet et EPI',
  },
  internet: {
    category: "Technologie de l'information, sciences et divers",
    subCategory: 'Informatique, internet et EPI',
  },
  epi: {
    category: "Technologie de l'information, sciences et divers",
    subCategory: 'Informatique, internet et EPI',
  },
  numérique: {
    category: "Technologie de l'information, sciences et divers",
    subCategory: 'Accompagnement numérique',
  },
  sciences: {
    category: "Technologie de l'information, sciences et divers",
    subCategory: 'Sciences et découverte',
  },
  programmation: {
    category: "Technologie de l'information, sciences et divers",
    subCategory: 'Programmation et jeux vidéo',
  },
  'jeux vidéo': {
    category: "Technologie de l'information, sciences et divers",
    subCategory: 'Programmation et jeux vidéo',
  },
  robotique: {
    category: "Technologie de l'information, sciences et divers",
    subCategory: 'Robotique',
  },
  multimédia: {
    category: "Technologie de l'information, sciences et divers",
    subCategory: 'Multimédia',
  },
};
