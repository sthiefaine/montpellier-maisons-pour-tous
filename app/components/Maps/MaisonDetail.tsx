'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { MPT } from './types';

interface MaisonDetailProps {
  mpt: MPT;
  onClose: () => void;
}

export default function MaisonDetail({ mpt, onClose }: MaisonDetailProps) {
  const displayName = mpt.name.replace('Maison pour tous ', '');

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
            <div className="flex items-center justify-center gap-2">
              <span className=" pl-1">🏠</span>
              <h2 className="text-xl font-bold text-gray-900">{displayName}</h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
                <p className="mt-1 text-gray-900">{mpt.address}</p>
              </div>
              <div className="pt-4">
                <Link
                  href={`/maisons-pour-tous/${mpt.slug}`}
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                >
                  <span>Voir la fiche complète</span>
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
