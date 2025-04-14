export type MPT = {
  id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  activities: string[];
  openingHours: Record<string, { slots: string[]; comments?: string }>;
  summary?: string;
  codeMPT: string;
  slug: string;
  codeMPTWithDashes: string;
};
