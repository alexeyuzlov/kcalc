import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Food} from '../domain/food.ts';
import {generateId, ID} from '../domain/id.ts';
import {Meal} from '../domain/meal.ts';
import {RootState} from '../domain/store.ts';

export interface MealState {
  items: Meal[];
}

const initialState: MealState = {
  items: [
    // {
    //   id: '1',
    //   date: new Date('2021-01-01').toISOString(),
    //   weight: 150,
    //   foodId: mockFood[0].id,
    // },
    // {
    //   id: '3',
    //   date: new Date('2021-01-02').toISOString(),
    //   weight: 200,
    //   foodId: mockFood[0].id,
    // },
    // {
    //   id: '4',
    //   date: new Date('2021-01-02').toISOString(),
    //   weight: 200,
    //   foodId: mockFood[1].id,
    // },
  ],
};

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    addMeal: (
      state: MealState,
      action: PayloadAction<Omit<Meal, 'id' | 'date'>>,
    ) => {
      const item: Meal = {
        id: generateId(),
        date: new Date().toISOString(),
        ...action.payload,
      };

      state.items.push(item);
    },
    updateMeal: (
      state: MealState,
      action: PayloadAction<{id: ID; body: Partial<Food>}>,
    ) => {
      state.items = state.items.map(item =>
        item.id === action.payload.id
          ? {...item, ...action.payload.body}
          : item,
      );
    },
    removeMeal: (state: MealState, action: PayloadAction<ID>) => {
      state.items = state.items.filter(food => food.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {addMeal, updateMeal, removeMeal} = mealSlice.actions;

// selector to find single meal by id
export const findMealById = (state: RootState, id?: ID) =>
  state.meal.items.find(meal => meal.id === id);

export default mealSlice.reducer;
