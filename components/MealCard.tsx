import React, {PropsWithChildren} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import {Meal} from '../domain/meal.state.ts';
import {FoodCard} from './FoodCard.tsx';
import {cardStyles} from '../styles/card.tsx';

type SectionProps = PropsWithChildren<{
  navigation: any;
  item: Meal;
  remove?: (id: Meal['id']) => void;
}>;

export function MealCard({
  navigation,
  item,
  remove
}: SectionProps): React.JSX.Element {
  const confirmRemove = () =>
    Alert.alert('Confirm action', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: () => remove?.(item.id),
        style: 'destructive',
      },
    ]);

  return (
    <View style={cardStyles.container}>
      {item.food && (
        <FoodCard navigation={navigation} item={item.food} readonly={true} />
      )}

      <View style={styles.group}>
        <Button
          onPress={() =>
            navigation.navigate('MealEdit', {id: item.id, title: 'Meal Edit'})
          }
          title="Edit"
        />
        <Button
          color={'#bb0000'}
          disabled={!remove}
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
