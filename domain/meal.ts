import { ID } from './id';
import { ISODate } from './date.ts';
import { Food } from './food.ts';
import * as Yup from 'yup';

export type FoodWeighted = {
  weight: number;
  foodId: ID;
  food?: Food;
}

export interface Meal {
  id: ID;
  date: ISODate;
  items: FoodWeighted[];
}

export type MealForm = {
  id?: string;
  date: Date;
  items: Array<{
    weight: string;
    foodId: string;
  }>;
};

export const defaultMeal = (): MealForm => ({
  date: new Date(),
  items: [],
});

export function toMealForm(meal: Meal): MealForm {
  return {
    ...meal,
    date: new Date(meal.date),
    items: meal.items.map(i => ({
      weight: i.weight.toString(),
      foodId: i.foodId,
    })),
  };
}

export const MealSchema = Yup.object().shape({
  date: Yup.date().required(),
  items: Yup.array().of(
      Yup.object().shape({
        weight: Yup.number().required().min(0).max(1000).positive(),
        foodId: Yup.string().required(),
      }),
  ).min(1),
});
