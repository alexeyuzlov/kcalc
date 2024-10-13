import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ID} from '../domain/id.ts';

export interface SelectionState {
  items: ID[];
}

const initialState: SelectionState = {
  items: [],
};

export const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    addToSelection: (state: SelectionState, action: PayloadAction<ID>) => {
      state.items = [...state.items, action.payload];
    },
    setSelection: (state: SelectionState, action: PayloadAction<ID[]>) => {
      state.items = action.payload;
    },
    removeFromSelection: (state: SelectionState, action: PayloadAction<ID>) => {
      state.items = state.items.filter(item => item !== action.payload);
    },
  },
});

export const {
  addToSelection,
  setSelection,
  removeFromSelection,
} = selectionSlice.actions;

export default selectionSlice.reducer;
