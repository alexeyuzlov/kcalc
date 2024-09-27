import React, {PropsWithChildren} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Food} from '../domain/food.state.ts';

type SectionProps = PropsWithChildren<{
  item: Food;
}>;

export function FoodCard({
  item,
}: SectionProps): React.JSX.Element {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>Weight: {item.weight}</Text>
      <Text>Kcal: {item.kcal}</Text>
      <Text>Protein: {item.protein}</Text>
      <Text>Fat: {item.fat}</Text>
      <Text>Carbs: {item.carbs}</Text>

      <Button
        onPress={() => {
          console.log('You tapped the button!');
        }}
        title="Edit"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
