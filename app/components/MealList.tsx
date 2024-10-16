import {
  Button,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {MealCard} from './MealCard.tsx';
import {useAppSelector} from '../domain/hooks.ts';
import {layoutStyles} from '../styles/layout.tsx';
import {typoStyles} from '../styles/typo.tsx';
import {MealEditCta} from './MealEditCta.tsx';
import {DateGroup, dateGroups} from '../domain/date.ts';
import {formStyles} from '../styles/form.tsx';
import {mealGroups} from '../domain/meal-groups.ts';
import {defaultOffset} from '../styles/variables.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes.tsx';
import {ImportFile} from './ImportFile.tsx';
import {ExportFile} from './ExportFile.tsx';
import {food, meal} from '../store.ts';
import {Select} from './Select.tsx';
import {ID} from '../domain/id.ts';
import {cardStyles} from '../styles/card.tsx';
import {Number} from './Number.tsx';
import {FoodCard} from './FoodCard.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'MealList'>;

export function MealList({navigation}: Props): React.JSX.Element {
  const mealState = useAppSelector(meal);
  const foodState = useAppSelector(food);

  const [search, setSearch] = useState<string>('');
  const [dateGroup, setDateGroup] = useState<DateGroup>('day');

  const filteredMeal = search
    ? mealState.filter(m =>
        m.name?.toLowerCase().includes(search.toLowerCase()),
      )
    : mealState;

  const groups = useMemo(() => {
    return mealGroups(filteredMeal, foodState, dateGroup);
  }, [filteredMeal, foodState, dateGroup]);

  const [visible, setVisible] = useState<Record<ID, boolean>>({});

  useEffect(() => {
    setSearch('');
  }, [mealState]);

  const toggleVisible = (id: ID) => {
    setVisible({
      ...visible,
      [id]: !visible[id],
    });
  };

  useEffect(() => {
    if (!groups.length) {
      return;
    }

    setVisible({
      [groups[0].id]: true,
    });
  }, [groups]);

  return (
    <View style={styles.container}>
      <View style={layoutStyles.header}>
        <Text style={typoStyles.heading}>Meal List</Text>
        <MealEditCta />
      </View>

      <View style={{...layoutStyles.row, margin: defaultOffset}}>
        <TextInput
          style={{...formStyles.input, flex: 3}}
          placeholder="Search by meal name"
          value={search}
          onChangeText={setSearch}
        />

        <View style={{flex: 2}}>
          <Select
            value={dateGroup}
            onChange={setDateGroup}
            items={dateGroups}
          />
        </View>
      </View>

      <SectionList
        sections={groups}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={{marginBottom: 100}}
        renderSectionHeader={data => (
          <View style={cardStyles.container}>
            <View style={layoutStyles.row}>
              <Pressable onPress={() => toggleVisible(data.section.id)}>
                <Text style={styles.sectionHeading}>
                  {data.section.rangeAsString}
                </Text>
              </Pressable>

              <View style={layoutStyles.spacer}></View>

              <Number value={data.section.summary.weight}>grams</Number>
              <Text>/</Text>
              <Number value={data.section.summary.kcal}>kcal</Number>
            </View>
          </View>
        )}
        renderItem={section => {
          if (visible[section.section.id]) {
            return <MealCard item={section.item} />;
          }

          return null;
        }}
        renderSectionFooter={data => {
          if (!search && visible[data.section.id]) {
            return (
              <View style={styles.sectionFooter}>
                <FoodCard
                  item={data.section.summary}
                  primary={true}
                  readonly={true}
                />
              </View>
            );
          }

          return null;
        }}
      />
      <View style={layoutStyles.footer}>
        <Button
          title={'Food List'}
          onPress={() => navigation.navigate('FoodList', {})}
        />
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
    ...typoStyles.headingPrimary,
    fontSize: 16,
  },
  sectionFooter: {
    marginBottom: defaultOffset * 2,
  },
  list: {
    flex: 1,
    margin: defaultOffset,
  },
});
