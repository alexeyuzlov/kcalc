import React, {PropsWithChildren} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {Food, FoodType} from '../domain/food.state.ts';
import {Number} from './Number.tsx';
import {cardStyles} from '../styles/card.tsx';
import {generateId} from '../domain/id.ts';

type SectionProps = PropsWithChildren<{
  navigation?: any;
  item: Food;
  remove?: (id: Food['id']) => void;
  selectable?: boolean;
  readonly?: boolean;
}>;

export function FoodCard({
  navigation,
  item,
  remove,
  selectable,
  readonly,
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
      <Text
        style={
          item.type === FoodType.Mix ? styles.headingPrimary : styles.heading
        }>
        {item.name}
      </Text>

      <View style={styles.group}>
        <View style={styles.category}>
          <Text style={styles.term}>Weight</Text>
          <Number value={item.weight} />
        </View>

        <View style={styles.category}>
          <Text style={styles.term}>Kcal</Text>
          <Number value={item.kcal} />
        </View>

        <View style={styles.category}>
          <Text style={styles.term}>Protein</Text>
          <Number value={item.protein} />
        </View>

        <View style={styles.category}>
          <Text style={styles.term}>Fat</Text>
          <Number value={item.fat} />
        </View>

        <View style={styles.category}>
          <Text style={styles.term}>Carbs</Text>
          <Number value={item.carbs} />
        </View>
      </View>

      {!readonly && (
        <View style={styles.group}>
          {selectable && (
            <Button
              onPress={() =>
                navigation.navigate('MealEdit', {
                  foodId: item.id,
                  update: generateId(),
                })
              }
              title="Select"
            />
          )}

          <Button
            onPress={() =>
              navigation.navigate('FoodEdit', {
                id: item.id,
                title: 'Food Edit',
              })
            }
            title="Edit"
          />

          <Button
            disabled={!remove}
            color={'#bb0000'}
            onPress={confirmRemove}
            title="Delete"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 24,
    color: 'black',
  },
  headingPrimary: {
    fontSize: 28,
    color: '#bb0000',
    fontWeight: 'bold',
  },
  term: {
    fontWeight: 'bold',
  },
  category: {
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
  },
});
