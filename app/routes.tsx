import { ID } from './domain/id.ts';

export type RootStackParamList = {
  MealList: undefined;
  FoodList: {
    selectable?: boolean;
  };
  FoodEdit: {
    id?: ID;
  };
  MealEdit: {
    id?: ID;
    newMealId?: ID;
  };
  Stats: undefined;
};
