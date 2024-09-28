import {Button, FlatList, StyleSheet, View} from 'react-native';
import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {StateContext} from '../State.tsx';
import {Meal} from '../domain/meal.state.ts';
import {MealCard} from './MealCard.tsx';

type SectionProps = PropsWithChildren<{
  navigation: any;
  route: any;
}>;

export function MealList({navigation, route}: SectionProps): React.JSX.Element {
  const state = useContext(StateContext);

  const [mealItems, setMealItems] = useState<Meal[]>(state.mealState.state);

  const [mealExtended, setMealExtended] = useState<Meal[]>([]);

  useEffect(() => {
    if (route.params?.update) {
      setMealItems(state.mealState.state);
    }
  }, [route.params?.update, state.mealState.state]);

  useEffect(() => {
    const meals: Meal[] = mealItems.map(m => {
      return {
        ...m,
        food: state.mealState.getFood(m),
      };
    });

    setMealExtended(meals);
  }, [mealItems, state.mealState]);

  const remove = (id: Meal['id']) => {
    state.mealState.remove(id);
    setMealItems(state.mealState.state);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={mealExtended}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 8}}
        renderItem={({item}) => (
          <MealCard item={item} navigation={navigation} remove={remove} />
        )}
      />

      <View style={styles.actions}>
        <Button
          title="Add Meal Item"
          onPress={() =>
            navigation.navigate('MealEdit', {title: 'Add New Meal Item'})
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
    margin: 10,
  },
  actions: {
    margin: 10,
  },
  list: {
    flex: 1,
  },
});
