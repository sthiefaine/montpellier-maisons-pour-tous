'use client';

import React from 'react';
import { CATEGORY_ICONS } from '@/helpers/icons';

type CategoryIconProps = {
  category: string;
  className?: string;
};

export default function CategoryIcon({ category, className = 'h-6 w-6' }: CategoryIconProps) {
  const Icon = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];

  if (!Icon) {
    return null;
  }

  return <Icon className={className} />;
}
