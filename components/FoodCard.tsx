import React, {PropsWithChildren} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Food} from '../domain/food.state.ts';
import {Number} from './Number.tsx';
import {cardStyles} from '../styles/card.tsx';

type SectionProps = PropsWithChildren<{
  navigation: any;
  item: Food;
  remove?: (id: Food['id']) => void;
  selectable?: boolean;
  overrideWeight?: number;
}>;

export function FoodCard({
  navigation,
  item,
  remove,
  selectable,
  overrideWeight,
}: SectionProps): React.JSX.Element {
  let result: Food = {...item};
  const hasOverrideWeight = typeof overrideWeight === 'number';

  if (hasOverrideWeight) {
    result = {
      ...item,
      weight: overrideWeight,
      kcal: (item.kcal / item.weight) * overrideWeight,
      protein: (item.protein / item.weight) * overrideWeight,
      fat: (item.fat / item.weight) * overrideWeight,
      carbs: (item.carbs / item.weight) * overrideWeight,
    };
  }

  return (
    <View style={cardStyles.container}>
      <Text style={styles.heading}>{result.name}</Text>

      <View style={styles.group}>
        <View style={styles.category}>
          <Text style={styles.term}>Weight</Text>
          <Number value={result.weight}/>
        </View>

        <View style={styles.category}>
          <Text style={styles.term}>Kcal</Text>
          <Number value={result.kcal}/>
        </View>

        <View style={styles.category}>
          <Text style={styles.term}>Protein</Text>
          <Number value={result.protein}/>
        </View>

        <View style={styles.category}>
          <Text style={styles.term}>Fat</Text>
          <Number value={result.fat}/>
        </View>

        <View style={styles.category}>
          <Text style={styles.term}>Carbs</Text>
          <Number value={result.carbs}/>
        </View>
      </View>

      <View style={styles.group}>
        {selectable && (
          <Button
            onPress={() => navigation.navigate('MealEdit', {foodId: result.id})}
            title="Select"
          />
        )}

        {!hasOverrideWeight && (
          <Button
            onPress={() =>
              navigation.navigate('FoodEdit', {
                id: result.id,
                title: 'Food Edit',
              })
            }
            title="Edit"
          />
        )}

        {remove && (
          <Button
            color={'#bb0000'}
            onPress={() => remove(item.id)}
            title="Delete"
          />
        )}
      </View>
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
    color: '#333',
  },
  term: {
    fontWeight: 'bold',
  },
  category: {
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
  }
});
