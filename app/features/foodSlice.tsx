import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Food } from '../domain/food.ts';
import { generateId, ID } from '../domain/id.ts';
import { RootState } from '../store.ts';

export interface FoodState {
  items: Food[];
}

const initialState: FoodState = {
  items: [],
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
    updateFood: (state: FoodState, action: PayloadAction<{ id: ID; body: Partial<Food> }>) => {
      state.items = state.items.map(item => item.id === action.payload.id ? {...item, ...action.payload.body} : item);
    },
    removeFood: (state: FoodState, action: PayloadAction<ID>) => {
      state.items = state.items.filter(food => food.id !== action.payload);
    },
    importFood: (state: FoodState, action: PayloadAction<{ food: Food[] }>) => {
      state.items = action.payload.food;
    }
  },
});

export const {
  addFood,
  updateFood,
  removeFood,
  importFood
} = foodSlice.actions;

export const findFoodById = (state: RootState, id?: ID) =>
    state.food.items.find(food => food.id === id);

export default foodSlice.reducer;
