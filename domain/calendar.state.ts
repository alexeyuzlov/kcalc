import {Meal, MealState} from './meal.state';
import {DateGroup, dateRange, DateRange, printDateRange} from './date';
import {generateId, ID} from './id';
import {Food, FoodType} from '../domain/food.state.ts';

export interface CalendarMealGroup {
  id: ID;
  range: DateRange;
  rangeAsString: string;
  data: Meal[];
}

export function summary(group: CalendarMealGroup): Food {
  const result: Food = {
    id: generateId(),
    type: FoodType.Mix,
    name: 'Summary',
    weight: 0,
    kcal: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  };

  return group.data.reduce((acc, meal) => {
    if (!meal.food) {
      return acc;
    }

    acc.weight += meal.food.weight;
    acc.kcal += meal.food.kcal;
    acc.protein += meal.food.protein;
    acc.fat += meal.food.fat;
    acc.carbs += meal.food.carbs;
    return acc;
  }, result);
}

export class CalendarState {
  constructor(private _mealState: MealState) {}

  public group(dateGroup: DateGroup): CalendarMealGroup[] {
    return this._mealState.state
      .sort((a: Meal, b: Meal) => b.date.getTime() - a.date.getTime())
      .reduce((acc, meal) => {
        const calendarMeal: Meal = {...meal};
        const item = this._mealState.getFood(meal)!;
        if (item) {
          calendarMeal.food = item;
        }

        const range = dateRange(calendarMeal.date, dateGroup);

        let group = acc.find(
          g =>
            g.range.gte.getTime() === range.gte.getTime() &&
            g.range.lte.getTime() === range.lte.getTime(),
        );

        if (!group) {
          group = this._createEmptyGroup(range);
          acc.push(group);
        }

        group.data.push(calendarMeal);

        return acc;
      }, [] as CalendarMealGroup[]);
  }

  private _createEmptyGroup(range: DateRange): CalendarMealGroup {
    return {
      id: generateId(),
      range,
      rangeAsString: printDateRange(range),
      data: [],
    };
  }
}
