import React, { PropsWithChildren } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Food } from '../domain/food.ts';
import { Number } from './Number.tsx';
import { cardStyles } from '../styles/card.tsx';
import { removeFood } from '../features/foodSlice.tsx';
import { useAppDispatch } from '../domain/hooks.ts';
import { ID } from '../domain/id.ts';

type SectionProps = PropsWithChildren<{
  navigation?: any;
  item: Food;
  primary?: boolean;
  selectable?: boolean;
  select?: (id: ID) => void;
  readonly?: boolean;
}>;

export function FoodCard({
                           navigation,
                           item,
                           primary,
                           selectable,
                           select,
                           readonly,
                         }: SectionProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const confirmRemove = () =>
      Alert.alert('Confirm action', 'Are you sure?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => dispatch(removeFood(item.id)),
          style: 'destructive',
        },
      ]);

  return (
      <View style={cardStyles.container}>
        <Text
            style={
              primary ? styles.headingPrimary : styles.heading
            }>
          {item.name}
        </Text>

        <View style={styles.group}>
          <View style={styles.category}>
            <Text style={styles.term}>Weight</Text>
            <Number value={item.weight}/>
          </View>

          <View style={styles.category}>
            <Text style={styles.term}>Kcal</Text>
            <Number value={item.kcal}/>
          </View>

          <View style={styles.category}>
            <Text style={styles.term}>Protein</Text>
            <Number value={item.protein}/>
          </View>

          <View style={styles.category}>
            <Text style={styles.term}>Fat</Text>
            <Number value={item.fat}/>
          </View>

          <View style={styles.category}>
            <Text style={styles.term}>Carbs</Text>
            <Number value={item.carbs}/>
          </View>
        </View>

        {!readonly && (
            <View style={styles.group}>
              {selectable && (
                  <Button
                      onPress={() => select?.(item.id)}
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

              <Button color={'#bb0000'} onPress={confirmRemove} title="Delete"/>
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
