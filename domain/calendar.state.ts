import {MealExtended, MealState} from './meal.state';
import {DateGroup, dateRange, DateRange} from './date';
import {generateId, ID} from './id';

export interface CalendarMealGroup {
  id: ID;
  range: DateRange;
  meals: MealExtended[];
}

export class CalendarState {
  constructor(private _mealState: MealState) {}

  public group(dateGroup: DateGroup): CalendarMealGroup[] {
    return this._mealState.state.reduce((acc, meal) => {
      const calendarMeal = this._mealState.toExtended(meal);
      const range = dateRange(calendarMeal.date, dateGroup);

      let group = acc.find(
        g =>
          g.range.gte.getTime() === range.gte.getTime() &&
          g.range.lte.getTime() === range.lte.getTime(),
      );

      if (!group) {
        group = this._createGroup(range);
        acc.push(group);
      }

      group.meals.push(calendarMeal);

      return acc;
    }, [] as CalendarMealGroup[]);
  }

  private _createGroup(range: DateRange): CalendarMealGroup {
    return {
      id: generateId(),
      range,
      meals: [],
    };
  }
}
