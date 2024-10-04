import React, { PropsWithChildren } from 'react';
import { FoodCard } from './FoodCard.tsx';
import { summary } from '../domain/meal-groups.ts';
import { Meal } from '../domain/meal.ts';

type SectionProps = PropsWithChildren<{
  name: string;
  items: Meal[];
}>;

export function Summary({
                          items,
                          name
                        }: SectionProps): React.JSX.Element {
  const prepared = summary(items, name);
  return <FoodCard item={prepared} primary={true} readonly={true}/>;
}
