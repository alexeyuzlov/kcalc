import { generateId, ID } from './id';
import { SortDirection } from './sort';
import { Food, FoodState } from './food.state';

export interface KnownMeal {
    id: ID;
    date: Date;
    foodId: ID;
}

export interface CustomMeal {
    id: ID;
    date: Date;
    food: Food;
}

export type Meal = KnownMeal | CustomMeal;

export function isCustomMeal(meal: Meal): meal is CustomMeal {
    return (meal as CustomMeal).food !== undefined;
}

export class MealState {
    constructor(
        public state: Meal[] = [],
        private _foodState: FoodState
    ) {
    }

    public addKnownMeal(foodId: ID, date: Date) {
        const item = {
            id: generateId(),
            date,
            foodId,
        };

        this.state = [...this.state, item];
    }

    public addCustomMeal(food: Food, date: Date) {
        const item = {
            id: generateId(),
            date,
            food,
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

    public updateKnownMeal(id: ID, foodId: ID) {
        this.state = this.state.map(meal => meal.id === id ? {...meal, foodId} : meal);
    }

    public updateCustomMeal(id: ID, food: Food) {
        this.state = this.state.map(meal => meal.id === id ? {...meal, food} : meal);
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
}
