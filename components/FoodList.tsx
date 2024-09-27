import {Button, FlatList, StyleSheet, TextInput, View} from 'react-native';
import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {FoodCard} from './FoodCard.tsx';
import {Food} from '../domain/food.state.ts';
import {StateContext} from '../State.tsx';

type SectionProps = PropsWithChildren<{
  navigation: any;
  route: any;
}>;

export function FoodList({navigation, route}: SectionProps): React.JSX.Element {
  const state = useContext(StateContext);

  const [foodItems, setFoodItems] = useState<Food[]>(state.foodState.state);

  useEffect(() => {
    if (route.params?.update) {
      setFoodItems(state.foodState.state);
    }
  }, [route.params?.update, state.foodState.state]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
      />

      <FlatList
        style={styles.list}
        data={foodItems}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <FoodCard item={item} navigation={navigation} />
        )}
      />

      <View style={styles.actions}>
        <Button title="Add New Food Item" onPress={() => navigation.navigate('FoodEdit', {title: 'Add New Food Item'})} />
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
    margin: 10,
  },
  list: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
});
