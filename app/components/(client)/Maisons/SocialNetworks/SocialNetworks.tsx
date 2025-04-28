import { MPT } from '@/types/maisons';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

interface SocialNetworksProps {
  mpt: MPT;
}

export default function SocialNetworks({ mpt }: SocialNetworksProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
      <div className="w-full mx-auto">
        <h3 className="text-2xl font-bold mb-4">Rejoignez notre communauté !</h3>
        <p className="text-lg mb-6">
          Partagez vos moments et activités avec nous en utilisant{' '}
          <span className="font-bold bg-white/20 px-2 py-1 rounded">#MPTmontpellier</span>
        </p>

        <div className="flex flex-wrap gap-4">
          {mpt.facebook && (
            <a
              href={mpt.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              <FaFacebook className="text-2xl" />
              <span className="font-semibold">Suivez-nous sur Facebook</span>
            </a>
          )}

          {mpt.instagram && (
            <a
              href={mpt.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-all transform hover:scale-105"
            >
              <FaInstagram className="text-2xl" />
              <span className="font-semibold">Suivez-nous sur Instagram</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
