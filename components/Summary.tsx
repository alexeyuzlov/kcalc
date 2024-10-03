import React, { PropsWithChildren } from 'react';
import { FoodCard } from './FoodCard.tsx';
import { MealGroup, summary } from '../domain/meal-groups.ts';

type SectionProps = PropsWithChildren<{
  item: MealGroup;
}>;

export function Summary({item}: SectionProps): React.JSX.Element {
  const prepared = summary(item);
  return <FoodCard item={prepared} primary={true} readonly={true}/>;
}
