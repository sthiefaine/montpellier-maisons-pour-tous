import React from 'react';
import CategoryIcon from '../Icons/Category/Category';
import { BADGE_STYLES } from '@/helpers/styles';

type BadgeType = 'category' | 'subcategory' | 'public' | 'level' | 'schedule';

interface BadgeProps {
  type: BadgeType;
  value: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Badge({ type, value, children, className = '' }: BadgeProps) {
  const getBadgeStyles = (type: BadgeType) => {
    return BADGE_STYLES[type] || BADGE_STYLES.default;
  };

  return (
    <div
      className={`inline-flex flex-row flex-nowrap items-center text-[10px] px-1.5 py-0.5 rounded-full border ${getBadgeStyles(type)} first-letter:uppercase truncate max-w-[150px] ${className}`}
    >
      {type === 'category' && (
        <CategoryIcon category={value} className="h-2.5 w-2.5 mr-0.5 flex-shrink-0" />
      )}
      <span className="truncate inline-flex flex-row flex-nowrap items-center">
        {children || value}
      </span>
    </div>
  );
}
