import React, { PropsWithChildren, useMemo } from 'react';
import { foodWeighted } from '../domain/food.ts';
import { FoodCard } from './FoodCard.tsx';
import { useAppSelector } from '../domain/hooks.ts';
import { food } from '../features/store.ts';
import { FoodWeightedForm } from '../domain/meal.ts';

type Props = PropsWithChildren<{
    index?: number;
    fw: FoodWeightedForm;
    removeFn: () => void;
}>;

export function FoodWeighted({
                                 index,
                                 fw,
                                 removeFn,
                             }: Props): React.JSX.Element | null {
    const foodState = useAppSelector(food);

    const result = useMemo(() => {
        const foodExist = foodState.find(f => f.id === fw.foodId);
        return foodExist
            ? foodWeighted(foodExist, parseFloat(fw.weight) || 0)
            : null;
    }, [fw, foodState]);

    return result ? (
        <FoodCard
            index={index}
            item={result}
            selectable={true}
            selected={true}
            select={() => removeFn()}
        />
    ) : null;
}
