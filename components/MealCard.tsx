import React, {PropsWithChildren} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Meal} from '../domain/meal.state.ts';
import {FoodCard} from './FoodCard.tsx';
import {cardStyles} from '../styles/card.tsx';

type SectionProps = PropsWithChildren<{
  navigation: any;
  item: Meal;
  remove: (id: Meal['id']) => void;
}>;

export function MealCard({
  navigation,
  item,
  remove
}: SectionProps): React.JSX.Element {
  const formatDate = item.date.toString();

  return (
    <View style={cardStyles.container}>
      <Text>{formatDate}</Text>

      {item.food && (
        <FoodCard
          navigation={navigation}
          item={item.food}
          overrideWeight={item.weight}
        />
      )}

      <View style={styles.group}>
        <Button
          onPress={() => navigation.navigate('MealEdit', {id: item.id, title: 'Meal Edit'})}
          title="Edit"
        />
        <Button
          color={'#bb0000'}
          onPress={() => remove(item.id)}
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
