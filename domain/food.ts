import {ID} from './id';

export enum FoodType {
  Default = 'default',
  Mix = 'mix',
  Order = 'order',
  Custom = 'custom',
}

export interface Food {
    id: ID;
    name: string;
    weight: number;
    type: FoodType;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
    ingredientIds?: ID[];
}

export function foodWeighted(food: Food, weight: number): Food {
    return {
        ...food,
        weight,
        kcal: food.kcal * weight / food.weight,
        protein: food.protein * weight / food.weight,
        fat: food.fat * weight / food.weight,
        carbs: food.carbs * weight / food.weight,
    };
}
