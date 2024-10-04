import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId, ID } from '../domain/id.ts';
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
  },
});

// Action creators are generated for each case reducer function
export const {addMeal, updateMeal, removeMeal} = mealSlice.actions;

export default mealSlice.reducer;
