import { Meal } from './meal.ts';
import { Food, foodWeighted } from './food.ts';
import { generateId } from './id.ts';

export function summary(items: Meal[], name: string): Food {
    const foods: Food[] = [];

    const result: Food = {
        id: generateId(),
        name,
        weight: 0,
        kcal: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
    };

    items.forEach(item => {
        item.items.forEach(item => {
            const food = item.food;
            if (food) {
                foods.push(foodWeighted(food, item.weight));
            }
        });
    });

    return foods.reduce((prev, current) => {
        const food = current;
        if (!food) {
            return prev;
        }

        return {
            ...prev,
            weight: prev.weight + food.weight,
            kcal: prev.kcal + food.kcal,
            protein: prev.protein + food.protein,
            fat: prev.fat + food.fat,
            carbs: prev.carbs + food.carbs,
        };
    }, result);
}
