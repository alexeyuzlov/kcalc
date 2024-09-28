import React, {PropsWithChildren} from 'react';
import {FoodCard} from './FoodCard.tsx';
import {CalendarMealGroup, summary} from '../domain/calendar.state.ts';

type SectionProps = PropsWithChildren<{
  item: CalendarMealGroup;
}>;

export function Summary({item}: SectionProps): React.JSX.Element {
  const prepared = summary(item);
  return <FoodCard item={prepared} readonly={true} />;
}
