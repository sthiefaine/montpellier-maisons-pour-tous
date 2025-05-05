'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { QUARTIER_STYLES } from '@/lib/helpers/quartierStyles';
import mptData from '@/data/mpt.json';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { MPT_NUMBERS, QUARTIERS } from './types';

interface QuartierDetailProps {
  quartierName: string;
  onClose: () => void;
}

export default function QuartierDetail({ quartierName, onClose }: QuartierDetailProps) {
  const style = QUARTIER_STYLES[quartierName as keyof typeof QUARTIER_STYLES] || {
    fill: '#CCCCCC',
    stroke: '#999999',
    text: '#000000',
  };

  const quartier = QUARTIERS.find(q => q.name === quartierName);
  if (!quartier) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ contain: 'layout style paint' }}
      >
        <div
          className="fixed inset-0"
          onClick={onClose}
          style={{
            contain: 'layout style paint',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        />
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          exit={{ y: 50 }}
          className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          style={{ contain: 'layout style paint' }}
        >
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundColor: style.fill,
                  border: `2px solid ${style.stroke}`,
                }}
              />
              <h2 className="text-xl font-bold text-gray-900">{quartierName}</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Maisons Pour Tous</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quartier.mpts.map(mptNumber => {
                const mpt = mptData.find(
                  m => MPT_NUMBERS.find(mn => mn.id === m.id)?.number === mptNumber
                );
                if (!mpt) return null;

                return (
                  <div
                    key={mpt.id}
                    className="bg-white rounded-lg p-3 hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm hover:shadow-md"
                    style={{ contain: 'layout style paint' }}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span 
                          className="flex items-center justify-center w-7 h-7 rounded-full text-white text-sm font-bold"
                          style={{ backgroundColor: style.fill }}
                        >
                          {mptNumber}
                        </span>
                        <div className="font-medium text-gray-900">
                          {mpt.name.replace('Maison pour tous ', '')}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 ml-9">{mpt.address}</div>
                      <div className="ml-9">
                        <Link
                          href={`/maisons-pour-tous/${mpt.slug}`}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors w-fit"
                        >
                          <span className="text-xs font-medium">Voir la fiche</span>
                          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
