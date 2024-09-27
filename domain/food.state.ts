import {generateId, ID} from './id';

export enum FoodType {
  Default = 'default',
  Mix = 'mix',
  Order = 'order',
  Custom = 'custom',
}

export interface Food {
    id: ID;
    name: string;
    weight: number;
    type: FoodType;
    kcal: number;
    protein: number;
    fat: number;
    carbs: number;
    ingredientIds?: ID[];
}

export class FoodState {
    constructor(
        public state: Food[] = []
    ) {
    }

    public add(body: Omit<Food, 'id'>) {
        const item: Food = {
            id: generateId(),
            ...body,
        };

        this.state = [...this.state, item];
    }

    public find(id: ID) {
        return this.state.find(food => food.id === id);
    }

    public update(id: ID, body: Partial<Food>) {
        this.state = this.state.map(food => food.id === id ? {...food, ...body} : food);
    }

    public remove(id: ID) {
        this.state = this.state.filter(food => food.id !== id);
    }
}
