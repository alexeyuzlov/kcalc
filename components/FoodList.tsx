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
  const [selectable, setSelectable] = useState(false);

  useEffect(() => {
    if (route.params?.update) {
      setFoodItems(state.foodState.state);
    }

    if (route.params?.select) {
      setSelectable(true);
    }
  }, [route.params?.update, route.params?.select, state.foodState.state]);

  const remove = (id: Food['id']) => {
    state.foodState.remove(id);
    setFoodItems(state.foodState.state);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.search} placeholder="Search" />

      <FlatList
        style={styles.list}
        data={foodItems}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 8}}
        renderItem={({item}) => (
          <FoodCard
            item={item}
            navigation={navigation}
            remove={remove}
            selectable={selectable}
          />
        )}
      />

      <View style={styles.actions}>
        <Button
          title="Add New Food Item"
          onPress={() =>
            navigation.navigate('FoodEdit', {title: 'Add New Food Item'})
          }
        />
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
    margin: 8,
  },
  list: {
    flex: 1,
    gap: 8,
    margin: 8,
  },
  search: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 8,
    borderRadius: 4,
  },
});
