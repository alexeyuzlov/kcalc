import {configureStore, createSelector} from '@reduxjs/toolkit';
import foodReducer from '../features/foodSlice';
import mealReducer from '../features/mealSlice';
import {mealGroups} from './meal-groups.ts';

export const store = configureStore({
  reducer: {
    food: foodReducer,
    meal: mealReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const meal = (state: RootState) => state.meal.items;
export const food = (state: RootState) => state.food.items;

export const getMealGroups = createSelector([meal, food], (meal, food) => {
  return mealGroups(meal, food);
});
