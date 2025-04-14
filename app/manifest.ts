import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Maisons pour tous à Montpellier',
    short_name: 'Maisons pour tous Montpellier',
    description: 'Liste des Maisons pour tous à Montpellier',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF',
    theme_color: '#FFF',
  };
}
