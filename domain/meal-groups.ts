import {Meal} from './meal.ts';
import {DateGroup, dateRange, DateRange, printDateRange} from './date';
import {generateId} from './id';
import {Food, FoodType, foodWeighted} from './food.ts';

export interface MealGroup {
  range: DateRange;
  rangeAsString: string;
  data: Meal[];
}

export function summary(group: MealGroup): Food {
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

export function mealGroups(
  mealState: readonly Meal[],
  foodState: readonly Food[],
  dateGroup: DateGroup = 'day',
): MealGroup[] {
  return [...mealState]
    .sort((a: Meal, b: Meal) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .reduce((acc, meal) => {
      const calendarMeal: Meal = {...meal};
      const item = foodState.find(food => food.id === meal.foodId);
      if (item) {
        calendarMeal.food = foodWeighted(item, meal.weight);
      }

      const range = dateRange(new Date(calendarMeal.date), dateGroup);

      let group = acc.find(
        g =>
          g.range.gte.getTime() === range.gte.getTime() &&
          g.range.lte.getTime() === range.lte.getTime(),
      );

      if (!group) {
        group = createEmptyGroup(range);
        acc.push(group);
      }

      group.data.push(calendarMeal);

      return acc;
    }, [] as MealGroup[]);
}

function createEmptyGroup(range: DateRange): MealGroup {
  return {
    range,
    rangeAsString: printDateRange(range),
    data: [],
  };
}
