import { Meal } from './meal.ts';
import { emptyFood, Food, foodWeighted } from './food.ts';

export function summary(items: Meal[], name: string): Food {
    const foods: Food[] = [];
    const result: Food = emptyFood(name);

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
            fiber: prev.fiber! + (food.fiber ? food.fiber : 0),
            salt: prev.salt! + (food.salt ? food.salt : 0),
        };
    }, result);
}
