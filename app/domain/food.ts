import { ID } from './id.ts';
import * as Yup from 'yup';

export interface Food {
    id: ID;
    name: string;
    weight: number;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber?: number;
    totalUse?: number;
}

export function emptyFood(name: string): Food {
    return {
        id: '',
        name,
        weight: 0,
        kcal: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
    };
}

export function foodWeighted(food: Food, weight: number): Food {
    return {
        ...food,
        weight,
        kcal: food.kcal * weight / food.weight,
        protein: food.protein * weight / food.weight,
        fat: food.fat * weight / food.weight,
        carbs: food.carbs * weight / food.weight,
        fiber: food.fiber ? food.fiber * weight / food.weight : 0,
    };
}

export interface FoodForm {
    id?: string;
    name: string;
    weight: string;
    kcal: string;
    protein: string;
    fat: string;
    carbs: string;
    fiber?: string;
}

export const defaultFood = (defaultName?: string): FoodForm => ({
    name: defaultName || '',
    weight: '100',
    kcal: '',
    protein: '',
    fat: '',
    carbs: '',
    fiber: '',
});

export function toFoodForm(food: Food): FoodForm {
    return {
        ...food,
        weight: food.weight.toString(),
        kcal: food.kcal.toString(),
        protein: food.protein.toString(),
        fat: food.fat.toString(),
        carbs: food.carbs.toString(),
        fiber: food.fiber ? food.fiber.toString() : '',
    };
}

export const FoodSchema = Yup.object().shape({
    name: Yup.string()
        .min(1)
        .max(50)
        .required(),
    weight: Yup.number().required().min(0).max(1000).positive(),
    kcal: Yup.number().required().min(0).max(1000),
    protein: Yup.number().required().min(0).max(1000),
    fat: Yup.number().required().min(0).max(1000),
    carbs: Yup.number().required().min(0).max(1000),
    fiber: Yup.number().min(0).max(1000),
});
