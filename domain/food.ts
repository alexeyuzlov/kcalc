import { ID } from './id';
import * as Yup from 'yup';

export interface Food {
    id: ID;
    name: string;
    weight: number;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
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

export interface FoodForm {
    id?: string;
    name: string;
    weight: string;
    kcal: string;
    protein: string;
    fat: string;
    carbs: string;
}

export const defaultFood = (): FoodForm => ({
    name: '',
    weight: '',
    kcal: '',
    protein: '',
    fat: '',
    carbs: '',
});

export function toFoodForm(food: Food): FoodForm {
    return {
        ...food,
        weight: food.weight.toString(),
        kcal: food.kcal.toString(),
        protein: food.protein.toString(),
        fat: food.fat.toString(),
        carbs: food.carbs.toString(),
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
});