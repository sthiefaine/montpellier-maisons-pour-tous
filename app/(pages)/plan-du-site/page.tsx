import Link from 'next/link';

type SiteMapItem = {
  name: string;
  link?: string;
  children?: SiteMapItem[];
};

function SiteMapSection({ title, items }: { title: string; items: SiteMapItem[] }) {
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.name}>
            {item.link ? (
              <Link
                href={item.link}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                {item.name}
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-gray-900 font-medium">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                {item.name}
              </div>
            )}
            {item.children && (
              <ul className="ml-6 mt-2 space-y-2">
                {item.children.map(child => (
                  <li key={child.name}>
                    <Link
                      href={child.link || '#'}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function PlanDuSite() {
  const siteMap: SiteMapItem[] = [
    {
      name: 'Pages Principales',
      children: [
        { name: 'Accueil', link: '/' },
        { name: 'Maisons Pour Tous', link: '/maisons-pour-tous' },
        { name: 'Activités', link: '/activites' },
        { name: 'Infos Pratiques', link: '/infos-pratiques' },
        { name: 'Tarifs', link: '/tarifs' },
      ],
    },
    {
      name: 'Infos Pratiques',
      children: [
        { name: 'Inscription', link: '/infos-pratiques#inscription' },
        { name: 'Animations', link: '/infos-pratiques#animations' },
        { name: 'Contact', link: '/infos-pratiques#contact' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Plan du Site</h1>
              <p className="text-blue-100 text-lg font-medium mb-4">
                Retrouvez toutes les pages du site des Maisons Pour Tous
              </p>
            </div>
            <div className="flex space-x-2 text-sm">
              <Link
                href="/"
                className="bg-white/60 hover:bg-white/80 text-blue-900 px-3 py-1 rounded transition-colors"
              >
                Accueil
              </Link>
              <span className="text-blue-200">/</span>
              <span className="bg-blue-900/80 text-white px-3 py-1 rounded font-medium">
                Plan du Site
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteMap.map(section => (
              <SiteMapSection
                key={section.name}
                title={section.name}
                items={section.children || []}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
