import { ID } from './id';
import { ISODate } from './date.ts';
import { Food } from './food.ts';

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
