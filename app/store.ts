import {
  combineReducers,
  configureStore,
  createSelector,
} from '@reduxjs/toolkit';
import foodReducer from './features/foodSlice.tsx';
import mealReducer from './features/mealSlice.tsx';
import selectionReducer from './features/selectionSlice.tsx';
import {ID} from './domain/id.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['selection'],
};

const root = combineReducers({
  food: foodReducer,
  meal: mealReducer,
  selection: selectionReducer,
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
export const selection = (state: RootState) => state.selection.items;

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
