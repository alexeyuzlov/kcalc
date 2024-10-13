import {ID} from './domain/id.ts';

export type RootStackParamList = {
  MealList: undefined;
  FoodList: undefined;
  FoodEdit: {
    id?: ID;
  };
  MealEdit: {
    id?: ID;
    newMealId?: ID;
  };
};
