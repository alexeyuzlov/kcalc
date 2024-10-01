import React, { PropsWithChildren } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { Meal } from '../domain/meal.ts';
import { FoodCard } from './FoodCard.tsx';
import { cardStyles } from '../styles/card.tsx';
import { useAppDispatch } from '../domain/hooks.ts';
import { removeMeal } from '../features/mealSlice.tsx';

type SectionProps = PropsWithChildren<{
  navigation: any;
  item: Meal;
}>;

export function MealCard({
  navigation,
  item,
}: SectionProps): React.JSX.Element {
  const dispatch = useAppDispatch();

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

  const items = item.items.map((foodWeighted) => {
    return (
        foodWeighted.food ? <FoodCard
            key={foodWeighted.foodId}
            navigation={navigation}
            item={foodWeighted.food}
            readonly={true}
        /> : null
    );
  });

  return (
    <View style={cardStyles.container}>
      {items}

      <View style={styles.group}>
        <Button
          onPress={() =>
            navigation.navigate('MealEdit', {id: item.id, title: 'Meal Edit'})
          }
          title="Edit Meal"
        />
        <Button
          color={'#bb0000'}
          onPress={confirmRemove}
          title="Delete"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
