import { Meal } from './meal.ts';
import { DateGroup, dateRange, DateRange, printDateRange } from './date.ts';
import { Food, foodWeighted } from './food.ts';
import { summary } from './summary.ts';
import { ID } from './id.ts';

export interface MealGroup {
    range: DateRange;
    rangeAsString: string;
    data: Array<Meal & { summary: Food }>;
    summary: Food;
}

export function mealGroups(
    mealState: readonly Meal[],
    foodState: readonly Food[],
    dateGroup: DateGroup,
): MealGroup[] {
    return [...mealState]
        .sort(
            (a: Meal, b: Meal) =>
                new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        .reduce((acc, meal) => {
            // TODO reuse findMealById
            const preparedMeal: Meal = {
                ...meal,
                items: meal.items.map(item => {
                    const food = foodState.find(f => f.id === item.foodId);
                    return food ? {...item, food: foodWeighted(food, item.weight)} : item;
                }),
            };

            const calendarMeal: Meal & { summary: Food } = {
                ...preparedMeal,
                summary: summary([preparedMeal], 'Summary'),
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
            group.summary = summary(group.data, 'Summary');

            return acc;
        }, [] as MealGroup[]);
}

export function groupByUsing(groups: MealGroup[], foodState: Food[]): Record<ID, Food & { totalUse: number }> {
    const products: Record<ID, Food & {totalUse: number}> = {};

    groups.forEach(group => {
        group.data.forEach(meal => {
            meal.items.forEach(item => {
                const food = foodState.find(f => f.id === item.foodId);
                if (!food) {
                    return;
                }

                if (!products[food.id]) {
                    products[food.id] = {
                        ...food,
                        totalUse: 0,
                    };
                }

                products[food.id].totalUse++;
            });
        });
    });

    foodState.forEach(food => {
        if (!products[food.id]) {
            products[food.id] = {
                ...food,
                totalUse: 0,
            };
        }
    });

    return products;
}

function createEmptyGroup(range: DateRange): MealGroup {
    return {
        range,
        rangeAsString: printDateRange(range),
        data: [],
        summary: summary([], 'Summary'),
    };
}
