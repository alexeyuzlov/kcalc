import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Food } from '../domain/food.ts';
import { generateId, ID } from '../domain/id.ts';
import { RootState } from '../store.ts';

export interface FoodState {
  items: Food[];
}

const initialState: FoodState = {
  items: [
    // mockFood[0],
    // mockFood[1],
  ],
};

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    addFood: (state: FoodState, action: PayloadAction<Omit<Food, 'id'>>) => {
      const item: Food = {
        ...action.payload,
        id: generateId(),
      };

      state.items.push(item);
    },
    updateFood: (state: FoodState, action: PayloadAction<{id: ID; body: Partial<Food>}>) => {
      state.items = state.items.map(item => item.id === action.payload.id ? {...item, ...action.payload.body} : item);
    },
    removeFood: (state: FoodState, action: PayloadAction<ID>) => {
      state.items = state.items.filter(food => food.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {addFood, updateFood, removeFood} = foodSlice.actions;

export const findFoodById = (state: RootState, id?: ID) =>
    state.food.items.find(food => food.id === id);

export default foodSlice.reducer;
