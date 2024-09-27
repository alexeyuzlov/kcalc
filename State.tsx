import {FoodState} from './domain/food.state.ts';
import {MealState} from './domain/meal.state.ts';
import {createContext} from 'react';

export const StateContext = createContext<{
  mealState: MealState;
  foodState: FoodState;
}>({
  foodState: new FoodState([]),
  mealState: new MealState([], new FoodState([])),
});
