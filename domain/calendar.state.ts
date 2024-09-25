import { Food } from './food.state';
import { Meal, MealState } from './meal.state';
import { DateGroup, dateRange, DateRange } from './date';
import { generateId, ID } from './id';

export interface CalendarMeal {
    id: ID;
    date: Date;
    food: Food;
}

export interface CalendarMealGroup {
    id: ID,
    range: DateRange;
    meals: CalendarMeal[];
}

export class CalendarState {
    constructor(
        private _mealState: MealState,
    ) {
    }

    public group(dateGroup: DateGroup): CalendarMealGroup[] {
        return this._mealState.state.reduce((acc, meal) => {
            const calendarMeal = this._createCalendarMeal(meal);
            const range = dateRange(calendarMeal.date, dateGroup);

            let group = acc.find(group => group.range.gte.getTime() === range.gte.getTime()
                && group.range.lte.getTime() === range.lte.getTime());

            if (!group) {
                group = this._createGroup(range);
                acc.push(group);
            }

            group.meals.push(calendarMeal);

            return acc;
        }, [] as CalendarMealGroup[]);
    }

    private _createCalendarMeal(meal: Meal): CalendarMeal {
        return {
            id: generateId(),
            date: meal.date,
            food: this._mealState.getFood(meal)!,
        };
    }

    private _createGroup(range: DateRange): CalendarMealGroup {
        return {
            id: generateId(),
            range,
            meals: []
        };
    }
}
