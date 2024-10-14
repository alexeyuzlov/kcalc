import {Meal} from './meal.ts';
import {DateGroup, dateRange, DateRange, printDateRange} from './date.ts';
import {Food, foodWeighted} from './food.ts';

export interface MealGroup {
  range: DateRange;
  rangeAsString: string;
  data: Meal[];
}

export function mealGroups(
    mealState: readonly Meal[],
    foodState: readonly Food[],
    dateGroup: DateGroup,
): MealGroup[] {
    return [...mealState]
        .sort((a: Meal, b: Meal) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .reduce((acc, meal) => {
            // TODO reuse findMealById
            const calendarMeal: Meal = {
                ...meal,
                items: meal.items.map(item => {
                    const food = foodState.find(f => f.id === item.foodId);
                    return food ? {...item, food: foodWeighted(food, item.weight)} : item;
                })
            };

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
