import React, {PropsWithChildren} from 'react';
import {FoodCard} from './FoodCard.tsx';
import {summary} from '../domain/meal-groups.ts';
import {Meal} from '../domain/meal.ts';

type SectionProps = PropsWithChildren<{
  name: string;
  items: Meal[];
  onPress?: () => void;
}>;

export function Summary({items, name, onPress}: SectionProps): React.JSX.Element {
  const prepared = summary(items, name);
  return (
    <FoodCard
      item={prepared}
      primary={true}
      readonly={true}
      onPress={onPress}
    />
  );
}
