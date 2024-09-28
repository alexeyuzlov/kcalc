import {Button, SectionList, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {StateContext} from '../State.tsx';
import {Meal} from '../domain/meal.state.ts';
import {MealCard} from './MealCard.tsx';
import {formStyles} from '../styles/form.tsx';
import {CalendarMealGroup} from '../domain/calendar.state.ts';
import {SectionListData} from 'react-native/Libraries/Lists/SectionList';
import {Summary} from './Summary.tsx';

type SectionProps = PropsWithChildren<{
  navigation: any;
  route: any;
}>;

export function MealList({navigation, route}: SectionProps): React.JSX.Element {
  const state = useContext(StateContext);

  const [groups, setGroups] = useState<
    SectionListData<Meal, CalendarMealGroup>[]
  >([]);

  useEffect(() => {
    if (route.params?.update) {
      setGroups(state.calendarState.group('day'));
    }
  }, [route.params?.update, state.calendarState]);

  useEffect(() => {
    setGroups(state.calendarState.group('day'));
  }, [state.mealState.state, state.calendarState]);

  const remove = (id: Meal['id']) => {
    state.mealState.remove(id);
    setGroups(state.calendarState.group('day'));
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={groups}
        keyExtractor={item => item.id}
        contentContainerStyle={{gap: 8}}
        renderSectionHeader={data => (
          <Text style={styles.sectionHeading}>
            {data.section.rangeAsString}
          </Text>
        )}
        renderItem={({item}) => (
          <MealCard item={item} navigation={navigation} remove={remove} />
        )}
        renderSectionFooter={data => <Summary item={data.section} />}
      />

      <View style={formStyles.button}>
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
  },
  sectionHeading: {
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  list: {
    flex: 1,
    margin: 10,
  },
});
