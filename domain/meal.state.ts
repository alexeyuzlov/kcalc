import { generateId, ID } from './id';
import { SortDirection } from './sort';
import { Food, FoodState } from './food.state';

export interface KnownMeal {
    id: ID;
    date: Date;
    foodId: Food['id'];
}

export interface CustomMeal {
    id: ID;
    date: Date;
    food: Food;
}

export type Meal = KnownMeal | CustomMeal;

export type FoodOrId = Food | Food['id'];

export function isCustomMeal(meal: Meal): meal is CustomMeal {
    return (meal as CustomMeal).food !== undefined;
}

export function isFoodOrId(foodOrId: FoodOrId): foodOrId is Food {
    return (foodOrId as Food)?.id !== undefined;
}

export class MealState {
    constructor(
        public state: Meal[] = [],
        private _foodState: FoodState
    ) {
    }

    public add(foodOrId: FoodOrId, date: Date) {
        const item: Meal = {
            id: generateId(),
            date,
            ...this._foodOrId(foodOrId)
        };

        this.state = [...this.state, item];
    }

    public getFood(meal: Meal) {
        if (isCustomMeal(meal)) {
            return meal.food;
        }

        return this._foodState.find(meal.foodId);
    }

    public find(id: ID) {
        return this.state.find(meal => meal.id === id);
    }

    public update(id: ID, foodOrId: FoodOrId) {
        this.state = this.state.map(meal => {
            if (meal.id === id) {
                return {
                    ...meal,
                    ...this._foodOrId(foodOrId)
                };
            }

            return meal;
        });
    }

    public remove(id: ID) {
        this.state = this.state.filter(meal => meal.id !== id);
    }

    public sortByDate(sort: SortDirection) {
        const copy = [...this.state];
        return copy.sort((a, b) => {
            const result = a.date.getTime() - b.date.getTime();
            return sort === 'asc' ? result : -result;
        });
    }

    private _foodOrId(foodOrId: FoodOrId) {
        return {
            ...(isFoodOrId(foodOrId) ? {food: foodOrId}: {foodId: foodOrId})
        };
    }
}
