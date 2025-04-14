export interface StatisticsType {
  totalMPTs: number;
  totalActivities: number;
  uniquePublics: number;
  uniqueSubCategories: number;
  activitiesByCategory: Record<string, number>;
  mptsByArea: Record<string, number>;
  uniqueActivities: number;
}
