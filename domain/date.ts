export type DateGroup = 'day' | 'week' | 'month' | 'year' | 'season';

export interface DateRange {
    gte: Date;
    lte: Date;
}

export function dateRange(date: Date, group: DateGroup): DateRange {
    switch (group) {
        case 'day':
            return {
                gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                lte: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
            };
        case 'week':
            const weekDay = date.getDay();
            return {
                gte: new Date(date.getFullYear(), date.getMonth(), date.getDate() - weekDay),
                lte: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7 - weekDay)
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
