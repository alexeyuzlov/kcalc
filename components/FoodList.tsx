import {Button, FlatList, StyleSheet, TextInput, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {FoodCard} from './FoodCard.tsx';
import {Food} from '../domain/food.state.ts';

type SectionProps = PropsWithChildren<{
  items: Food[];
  closeList: () => void;
}>;

export function FoodList({items, closeList}: SectionProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} defaultValue="Search" />

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={item => item.id}
        renderItem={({item}) => <FoodCard item={item} />}
      />

      <View style={styles.actions}>
        <Button title="Back" onPress={() => closeList()} />

        <Button title="Add" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1,
  },
  list: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
