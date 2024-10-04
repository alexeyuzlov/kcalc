import { combineReducers, configureStore, createSelector } from '@reduxjs/toolkit';
import foodReducer from './features/foodSlice.tsx';
import mealReducer from './features/mealSlice.tsx';
import { mealGroups } from './domain/meal-groups.ts';
import { ID } from './domain/id.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import { DateGroup } from './domain/date.ts';
import { Meal } from './domain/meal.ts';
import { Food } from './domain/food.ts';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const root = combineReducers({
    food: foodReducer,
    meal: mealReducer,
});

const persistedReducer = persistReducer(persistConfig, root);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const meal = (state: RootState) => state.meal.items;
export const food = (state: RootState) => state.food.items;

export const findMealById = (id?: ID) => createSelector([meal, food], (meal, food) => {
    if (!id) {
        return;
    }

    const item = meal.find(meal => meal.id === id);
    if (!item) {
        return;
    }

    return {
        ...item,
        items: item.items.map(item => ({
            ...item,
            food: food.find(food => food.id === item.foodId),
        })),
    };
});
