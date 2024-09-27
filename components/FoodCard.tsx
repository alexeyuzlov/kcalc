import React, {PropsWithChildren} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Food} from '../domain/food.state.ts';

type SectionProps = PropsWithChildren<{
  navigation: any;
  item: Food;
}>;

export function FoodCard({
  navigation,
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
        onPress={() => navigation.navigate('FoodEdit', {id: item.id, title: 'Food Edit'})}
        title="Edit"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
