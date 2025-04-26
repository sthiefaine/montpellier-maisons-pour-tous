interface OpeningHours {
  slots: string[];
  comments?: string;
}

interface OpeningHoursMap {
  [key: string]: OpeningHours;
}

export function formatOpeningHours(openingHours: OpeningHoursMap): string {
  const days = Object.entries(openingHours);
  return days
    .map(([day, schedule]) => {
      const slots = schedule.slots.join(', ');
      const comments = schedule.comments ? ` (${schedule.comments})` : '';
      return `${day}: ${slots}${comments}`;
    })
    .join('\n');
}
