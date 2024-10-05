import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ID } from '../domain/id.ts';
import { Meal } from '../domain/meal.ts';

export interface MealState {
  items: Meal[];
}

const initialState: MealState = {
  items: [],
};

export const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    addMeal: (
        state: MealState,
        action: PayloadAction<Meal>,
    ) => {
      state.items.push(action.payload);
    },
    updateMeal: (
        state: MealState,
        action: PayloadAction<{ id: ID; body: Partial<Meal> }>,
    ) => {
      state.items = state.items.map(item =>
          item.id === action.payload.id
              ? {...item, ...action.payload.body}
              : item,
      );
    },
    removeMeal: (state: MealState, action: PayloadAction<ID>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
      importMeal: (state: MealState, action: PayloadAction<{ meal: Meal[] }>) => {
          state.items = action.payload.meal;
      }
  },
});

export const {
    addMeal,
    updateMeal,
    removeMeal,
    importMeal
} = mealSlice.actions;

export default mealSlice.reducer;
