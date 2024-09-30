import {ID} from './id';
import {Food} from './food.ts';
import {ISODate} from './date.ts';

export interface Meal {
  id: ID;
  date: ISODate;
  weight: number;
  foodId: Food['id'];
  food?: Food;
}
