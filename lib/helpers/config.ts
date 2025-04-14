export const APP_CONFIG = {
  name: 'Montpellier MPT',
  description: 'Découvrez les activités des Maisons Pour Tous de Montpellier',
  url: process.env.VERCEL_URL || process.env.NEXT_PUBLIC_URL || '',
  defaultLocale: 'fr',
  supportedLocales: ['fr'],
};

export const PAGINATION_CONFIG = {
  defaultPageSize: 12,
  infiniteScrollThreshold: 0.8,
  infiniteScrollRootMargin: '100px',
};

export const SEARCH_CONFIG = {
  debounceTime: 300,
  minSearchLength: 2,
  maxResults: 50,
};

export const CACHE_CONFIG = {
  revalidate: 3600, // 1 heure
  staleTime: 1800, // 30 minutes
};
