import { MainCategory } from '@/types/categories';

export interface Activity {
  id: string;
  name: string;
  category: MainCategory;
  subCategory: string;
  originalCategory: string;
  originalSubCategory: string;
  mptId: string;
  mptName: string;
  public: string;
  originalPublic: string;
  age?: {
    min?: number;
    max?: number;
    text?: string;
  };
  level?: {
    value: 'débutant' | 'intermédiaire' | 'confirmé' | 'tous niveaux';
    original: string;
  };
  schedule?: {
    day: string;
    startTime?: string;
    endTime?: string;
  };
  multipleSchedules?: {
    day: string;
    startTime?: string;
    endTime?: string;
  }[];
  price?: string;
}
