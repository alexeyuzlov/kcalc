import React, {PropsWithChildren, useState} from 'react';
import {Alert, Button, View} from 'react-native';
import {Meal} from '../domain/meal.ts';
import {FoodCard} from './FoodCard.tsx';
import {cardStyles} from '../styles/card.tsx';
import {useAppDispatch} from '../domain/hooks.ts';
import {removeMeal} from '../features/mealSlice.tsx';
import {MealEditCta} from './MealEditCta.tsx';
import {Summary} from './Summary.tsx';
import {dangerColor, defaultOffset} from '../styles/variables.tsx';
import {layoutStyles} from '../styles/layout.tsx';

type SectionProps = PropsWithChildren<{
  item: Meal;
  copy: () => void;
}>;

export function MealCard({
                             item,
                             copy,
                         }: SectionProps): React.JSX.Element {
    const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);

  const confirmRemove = () =>
        Alert.alert('Confirm action', 'Are you sure?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Remove',
                onPress: () => dispatch(removeMeal(item.id)),
                style: 'destructive',
            },
        ]);

  const toggleExpand = () => setExpanded(!expanded);

  const items = item.items.map((foodWeighted) => {
        return foodWeighted.food &&
            <FoodCard
                key={foodWeighted.foodId}
                item={foodWeighted.food}
                readonly={true}
            />;
    });

    return (
      <View style={cardStyles.containerOut}>
        {item.name ? (
          <Summary onPress={toggleExpand} name={item.name} items={[item]} />
        ) : (
          <View style={{gap: defaultOffset}}>{items}</View>
        )}

        {expanded && <View style={{gap: defaultOffset}}>{items}</View>}

        <View style={layoutStyles.row}>
          <Button title="Copy Meal" onPress={copy} />

          <MealEditCta id={item.id} />

          <Button
            color={dangerColor}
            onPress={confirmRemove}
            title="Delete Meal"
          />
        </View>
      </View>
    );
}
