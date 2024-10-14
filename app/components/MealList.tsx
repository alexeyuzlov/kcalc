import {SectionList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Meal} from '../domain/meal.ts';
import {MealCard} from './MealCard.tsx';
import {Summary} from './Summary.tsx';
import {useAppSelector} from '../domain/hooks.ts';
import {layoutStyles} from '../styles/layout.tsx';
import {typoStyles} from '../styles/typo.tsx';
import {MealEditCta} from './MealEditCta.tsx';
import {DateGroup} from '../domain/date.ts';
import {formStyles} from '../styles/form.tsx';
import {mealGroups} from '../domain/meal-groups.ts';
import {defaultOffset} from '../styles/variables.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes.tsx';
import {ID} from '../domain/id.ts';
import {ImportFile} from './ImportFile.tsx';
import {ExportFile} from './ExportFile.tsx';
import {food, meal} from '../store.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'MealList'>;

export function MealList({}: Props): React.JSX.Element {
  const dateGroup: DateGroup = 'day';

  const [search, setSearch] = useState<string>('');

  const mealState = useAppSelector(meal);
  const foodState = useAppSelector(food);

  const filteredMeal = search
    ? mealState.filter(m =>
        m.name?.toLowerCase().includes(search.toLowerCase()),
      )
    : mealState;

  const groups = mealGroups(filteredMeal, foodState, dateGroup);

  const [newMealId, setNewMealId] = useState<ID>();

  useEffect(() => {
    setSearch('');
    setNewMealId(undefined);
  }, [mealState]);

  const copyMeal = (meal: Meal) => {
    setSearch('');
    setNewMealId(meal.id);
  };

  return (
    <View style={styles.container}>
      <View style={layoutStyles.header}>
        <Text style={typoStyles.heading}>Meal List</Text>
        <MealEditCta newMealId={newMealId} />
      </View>

      <TextInput
        style={formStyles.search}
        placeholder="Search by meal name"
        value={search}
        onChangeText={setSearch}
      />

      <SectionList
        sections={groups}
        keyExtractor={item => item.id}
        contentContainerStyle={search ? null : {gap: defaultOffset}}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={data => (
          <Text style={styles.sectionHeading}>
            {data.section.rangeAsString}
          </Text>
        )}
        renderItem={({item}) => (
          <MealCard item={item} copy={() => copyMeal(item)} />
        )}
        renderSectionFooter={data =>
          search ? null : (
            <Summary name={`${dateGroup} summary`} items={data.section.data} />
          )
        }
      />
      <View style={layoutStyles.footer}>
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
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  sectionHeading: {
    backgroundColor: '#f0f0f0',
    padding: defaultOffset,
  },
  list: {
    flex: 1,
    margin: defaultOffset,
  },
});
