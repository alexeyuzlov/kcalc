import {generateId, ID} from './id';
import {SortDirection} from './sort';
import {Food, FoodState} from './food.state';

export interface Meal {
  id: ID;
  date: Date;
  weight: number;
  foodId: Food['id'];
  food?: Food;
}

export class MealState {
  constructor(public state: Meal[] = [], private _foodState: FoodState) {}

  public add(meal: Omit<Meal, 'id' | 'date'>) {
    const item: Meal = {
      ...meal,
      id: generateId(),
      date: new Date(),
    };

    this.state = [...this.state, item];
  }

  public getFood(meal: Meal) {
    return this._foodState.find(meal.foodId);
  }

  public find(id: ID) {
    return this.state.find(meal => meal.id === id);
  }

  public update(id: ID, body: Partial<Meal>) {
    this.state = this.state.map(meal => {
      if (meal.id === id) {
        return {
          ...meal,
          ...body,
        };
      }

      return meal;
    });
  }

  public remove(id: ID) {
    this.state = this.state.filter(meal => meal.id !== id);
  }

  public sortByDate(sort: SortDirection) {
    const copy = [...this.state];
    return copy.sort((a, b) => {
      const result = a.date.getTime() - b.date.getTime();
      return sort === 'asc' ? result : -result;
    });
  }
}
