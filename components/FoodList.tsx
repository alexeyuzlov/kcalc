import {Button, FlatList, StyleSheet, TextInput, View} from 'react-native';
import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {FoodCard} from './FoodCard.tsx';
import {formStyles} from '../styles/form.tsx';
import {useAppSelector} from '../domain/hooks.ts';
import {food} from '../domain/store.ts';
import {Food} from '../domain/food.ts';

type SectionProps = PropsWithChildren<{
  navigation: any;
  route: any;
}>;

export function FoodList({navigation, route}: SectionProps): React.JSX.Element {
  const items = useAppSelector(food);

  const searchRef = useRef<TextInput>(null);

  const [selectable, setSelectable] = useState(false);

  useEffect(() => {
    setSelectable(route.params?.select || false);
    if (route.params?.select) {
      // setTimeout(() => {
      //   searchRef.current?.focus();
      // });
    }
  }, [route.params?.select, navigation]);

  const selectFood = (item: Food) => {
    setSelectable(false);
    navigation.navigate('MealEdit', {
      id: route.params?.mealId,
      foodId: item.id,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput ref={searchRef} style={styles.search} placeholder="Search" />

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 8}}
        renderItem={({item}) => (
          <FoodCard
            item={item}
            navigation={navigation}
            selectable={selectable}
            select={() =>selectFood(item)}
          />
        )}
      />

      <View style={formStyles.button}>
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
