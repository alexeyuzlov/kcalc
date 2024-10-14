import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FoodCard} from './FoodCard.tsx';
import {formStyles} from '../styles/form.tsx';
import {useAppDispatch, useAppSelector} from '../domain/hooks.ts';
import {ID} from '../domain/id.ts';
import {FoodEditCta} from './FoodEditCta.tsx';
import {layoutStyles} from '../styles/layout.tsx';
import {typoStyles} from '../styles/typo.tsx';
import {defaultOffset} from '../styles/variables.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes.tsx';
import {
  addToSelection,
  removeFromSelection,
} from '../features/selectionSlice.tsx';
import {ImportFile} from './ImportFile.tsx';
import {ExportFile} from './ExportFile.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'FoodList'>;

export function FoodList({navigation, route}: Props): React.JSX.Element {
  const dispatch = useAppDispatch();

  const selectable = route.params?.selectable || false;

  const food = useAppSelector(state => state.food.items);
  const selection = useAppSelector(state => state.selection);

  const [search, setSearch] = useState<string>('');

  const filteredFood = search
    ? food.filter(m => m.name?.toLowerCase().includes(search.toLowerCase()))
    : food;

  const prepareSelectedIds = (item: {id: ID}) => {
    if (!selection.items.includes(item.id)) {
      dispatch(addToSelection(item.id));
    } else {
      dispatch(removeFromSelection(item.id));
    }
  };

  return (
    <View style={layoutStyles.container}>
      <View style={layoutStyles.header}>
        <Text style={typoStyles.heading}>Food List</Text>
        <FoodEditCta />
      </View>

      <TextInput
        style={formStyles.search}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        style={styles.list}
        data={filteredFood}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: defaultOffset}}
        renderItem={({item, index}) => (
          <FoodCard
            index={index}
            item={item}
            selectable={selectable}
            selected={selection.items.includes(item.id)}
            select={() => prepareSelectedIds(item)}
          />
        )}
      />

      <View style={layoutStyles.footer}>
        {selectable ? (
          <View style={{flex: 1}}>
            <Button
              title={'Select ' + selection.items.length}
              onPress={() => navigation.goBack()}
            />
          </View>
        ) : (
          <Button
            title={'Meal List'}
            onPress={() => navigation.navigate('MealList')}
          />
        )}

        <View></View>
        <View style={layoutStyles.row}>
          <ImportFile />
          <ExportFile />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    gap: defaultOffset,
    margin: defaultOffset,
  },
});
