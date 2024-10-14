import React, {PropsWithChildren, useMemo} from 'react';
import {FoodCard} from './FoodCard.tsx';
import {Meal} from '../domain/meal.ts';
import {summary} from '../domain/summary.ts';

type SectionProps = PropsWithChildren<{
  name: string;
  items: Meal[];
  onPress?: () => void;
}>;

export function Summary({items, name, onPress}: SectionProps): React.JSX.Element {
  const prepared = useMemo(() => {
    return summary(items, name);
  }, [items, name]);

  return (
    <FoodCard
      item={prepared}
      primary={true}
      readonly={true}
      onPress={onPress}
    />
  );
}
