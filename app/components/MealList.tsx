import {
  Alert,
  Button,
  SectionList,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Meal} from '../domain/meal.ts';
import {MealCard} from './MealCard.tsx';
import {Summary} from './Summary.tsx';
import {useAppDispatch, useAppSelector} from '../domain/hooks.ts';
import {layoutStyles} from '../styles/layout.tsx';
import {typoStyles} from '../styles/typo.tsx';
import {MealEditCta} from './MealEditCta.tsx';
import {DateGroup} from '../domain/date.ts';
import {formStyles} from '../styles/form.tsx';
import {mealGroups} from '../domain/meal-groups.ts';
import {defaultOffset} from '../styles/variables.tsx';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {loadFile} from '../domain/file.ts';
import {importFood} from '../features/foodSlice.tsx';
import {importMeal} from '../features/mealSlice.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes.tsx';
import {ID} from '../domain/id.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'MealList'>;

export function MealList({}: Props): React.JSX.Element {
  const dispatch = useAppDispatch();

  const dateGroup: DateGroup = 'day';

  const [search, setSearch] = useState<string>('');

  const meal = useAppSelector(state => state.meal.items);
  const food = useAppSelector(state => state.food.items);

  const filteredMeal = search
    ? meal.filter(m => m.name?.toLowerCase().includes(search.toLowerCase()))
    : meal;

  const groups = mealGroups(filteredMeal, food, dateGroup);

  const [newMealId, setNewMealId] = useState<ID>();

  useEffect(() => {
    setSearch('');
    setNewMealId(undefined);
  }, [meal]);

  const copyMeal = (meal: Meal) => {
    setSearch('');
    setNewMealId(meal.id);
  };

  const importFile = async () => {
    try {
      const res: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const file = res[0];
      const data = await loadFile(file.uri);

      if (data) {
        const {meal, food} = JSON.parse(data);
        dispatch(importFood({food}));
        dispatch(importMeal({meal}));
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // nothing
      } else {
        console.error(err);
      }
    }
  };

  const exportFile = async () => {
    try {
      const result = await Share.share({
        message: JSON.stringify({
          meal,
          food,
        }),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
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
          <Button title={'Load'} onPress={importFile} />
          <Button title={'Save'} onPress={exportFile} />
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
