import {Button, SectionList, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Meal} from '../domain/meal.ts';
import {MealCard} from './MealCard.tsx';
import {formStyles} from '../styles/form.tsx';
import {MealGroup} from '../domain/meal-groups.ts';
import {SectionListData} from 'react-native/Libraries/Lists/SectionList';
import {Summary} from './Summary.tsx';
import {useAppSelector} from '../domain/hooks.ts';
import {getMealGroups} from '../domain/store.ts';

type SectionProps = PropsWithChildren<{
  navigation: any;
}>;

export function MealList({navigation}: SectionProps): React.JSX.Element {
  const groups: SectionListData<Meal, MealGroup>[] = useAppSelector(getMealGroups);

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
          <MealCard item={item} navigation={navigation} />
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
