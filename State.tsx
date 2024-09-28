import {createContext} from 'react';
import {FoodState} from './domain/food.state.ts';
import {MealState} from './domain/meal.state.ts';
import {CalendarState} from './domain/calendar.state.ts';

export const StateContext = createContext<{
  foodState: FoodState;
  mealState: MealState;
  calendarState: CalendarState;
}>({
  foodState: new FoodState([]),
  mealState: new MealState([], new FoodState([])),
  calendarState: new CalendarState(new MealState([], new FoodState([]))),
});
