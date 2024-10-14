export type DateGroup = 'day' | 'week' | 'month' | 'year' | 'season';

export const dateGroups = [
  {value: 'day', heading: 'Day'},
  {value: 'week', heading: 'Week'},
  {value: 'month', heading: 'Month'},
  {value: 'year', heading: 'Year'},
  {value: 'season', heading: 'Season'},
];

export type ISODate = string;

export interface DateRange {
    gte: Date;
    lte: Date;
}

export function dateRange(date: Date, group: DateGroup): DateRange {
    switch (group) {
        case 'day':
            return {
                gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                lte: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
            };
        case 'week':
            const weekDay = date.getDay();
            return {
                gte: new Date(date.getFullYear(), date.getMonth(), date.getDate() - weekDay),
                lte: new Date(date.getFullYear(), date.getMonth(), date.getDate() - weekDay + 7)
            };
        case 'month':
            return {
                gte: new Date(date.getFullYear(), date.getMonth(), 1),
                lte: new Date(date.getFullYear(), date.getMonth() + 1, 1)
            };
        case 'year':
            return {
                gte: new Date(date.getFullYear(), 0, 1),
                lte: new Date(date.getFullYear() + 1, 0, 1)
            };
        case 'season':
            const season = Math.floor(date.getMonth() / 3);
            return {
                gte: new Date(date.getFullYear(), season * 3, 1),
                lte: new Date(date.getFullYear(), season * 3 + 3, 1)
            };
    }
}

export function printDateRange(value: DateRange): string {
  if (!value || (!value.gte && !value.lte)) {
    return '';
  }

  if (equalDate(value.gte!, value.lte!, 'day')) {
    return printDate(value.gte!);
  }

  const from = printDate(value.gte!);
  const to = printDate(value.lte!);

  return `${from} - ${to}`;
}

export function printDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function equalDate(date1: Date, date2: Date, group: DateGroup): boolean {
  switch (group) {
    case 'day':
      return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
    case 'week':
      return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() >= date2.getDate() && date1.getDate() < date2.getDate() + 7;
    case 'month':
      return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth();
    case 'year':
      return date1.getFullYear() === date2.getFullYear();
    case 'season':
      return date1.getFullYear() === date2.getFullYear() && Math.floor(date1.getMonth() / 3) === Math.floor(date2.getMonth() / 3);
  }
}
