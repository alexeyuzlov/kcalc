import { Button, ScrollView, StyleSheet, Text, TextInput, View, } from 'react-native';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { defaultMeal, MealForm, MealSchema, toMealForm } from '../domain/meal.ts';
import { formStyles } from '../styles/form.tsx';
import { useAppDispatch, useAppSelector } from '../domain/hooks.ts';
import { FieldArray, Formik } from 'formik';
import { findMealById } from '../domain/store.ts';
import { Field } from './Field.tsx';
import DatePicker from 'react-native-date-picker';
import { addMeal, updateMeal } from '../features/mealSlice.tsx';
import { FoodCard } from './FoodCard.tsx';
import { ID } from '../domain/id.ts';
import { foodWeighted } from '../domain/food.ts';

type SectionProps = PropsWithChildren<{
  route: any;
  navigation: any;
}>;

export function MealEdit({navigation, route}: SectionProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);

  const foodState = useAppSelector(state => state.food.items);

  const exist = useAppSelector(findMealById(route.params?.id));

  const meal: MealForm = exist ? toMealForm(exist) : defaultMeal();
  // skip the screen for new meal, but only if there is no food selected
  // useEffect(() => {
  //   if (!route.params.id && !route.params.foodId) {
  //     navigation.navigate('FoodTab', {
  //       screen: 'FoodList',
  //       params: {select: generateId()},
  //     });
  //   }
  // }, [navigation, route.params?.id, route.params?.foodId]);

  // TODO replace with Modal
  useEffect(() => {
    if (route.params?.foodId) {
      const food = foodState.find(f => f.id === route.params.foodId);
      if (!food) {
        return;
      }

      // add to formik items
      // meal.items.push({
      //   weight: food.weight,
      //   foodId: food.id,
      //   food,
      // });
      // copilot

    }
  }, [route.params?.foodId]);

  useEffect(() => {
    const title = route.params?.id ? 'Edit Meal' : 'Add Meal';
    navigation.setOptions({title});
  }, [route.params?.id, navigation]);

  const selectFood = (setFieldValue: (field: string, value: any) => void, values: MealForm, errors: any) => {
    // add item to array of meal form items
    // setFieldValue('items', [
    //   ...values.items,
    //   {
    //     weight: '',
    //     foodId: '',
    //   }
    // ]);

    // navigation.navigate('FoodTab', {
    //   screen: 'FoodList',
    //   // todo select is not necessary
    //   params: {select: generateId(), mealId: meal.id},
    // });
  };

  const foodCard = (fw: { weight: string; foodId: ID }) => {
    const food = foodState.find(f => f.id === fw.foodId);
    if (!food) {
      return;
    }

    const result = foodWeighted(food, parseFloat(fw.weight) || 0);
    return (
        <FoodCard item={result} navigation={navigation} readonly={true}/>
    );
  };

  return (
      <Formik
          initialValues={meal}
          validationSchema={MealSchema}
          onSubmit={values => {
            console.info(MealSchema.cast(values));
            const cast = MealSchema.cast(values);
            const mealEdit = {
              ...cast,
              date: cast.date.toISOString(),
              items: cast.items!
            };

            if (meal.id) {
              dispatch(updateMeal({id: meal.id, body: mealEdit}));
              navigation.navigate('MealList');
            } else {
              dispatch(addMeal(mealEdit));
              navigation.navigate('MealList');
            }
          }}
      >
        {({setFieldValue, errors, touched, handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.container}>
              <ScrollView>
                <View style={formStyles.form}>
                  <Field
                      label={'Items'}
                      name={'items'}
                  >
                    <FieldArray
                        name={'items'}
                        render={arrayHelpers =>
                            values.items.map((foodItem, index) => (
                                <View key={index}>
                                  <Text>Food Id {foodItem.foodId}</Text>

                                  <Field
                                      label={'Weight'}
                                      name={`items[${index}].weight`}
                                  >
                                    <TextInput
                                        style={formStyles.input}
                                        inputMode={'numeric'}
                                        maxLength={4}
                                        value={values.items[index].weight}
                                        onChangeText={handleChange(`items[${index}].weight`)}
                                        onBlur={handleBlur(`items[${index}].weight`)}
                                        placeholder={'0'}
                                    />
                                  </Field>

                                  {foodCard(foodItem)}

                                  <Button
                                      title={'Remove'}
                                      onPress={() => arrayHelpers.remove(index)}
                                  />
                                </View>
                            ))
                        }
                    />
                  </Field>

                  <Field label={'Date ' + values.date.toISOString()} name={'date'}>
                    <DatePicker
                        date={values.date}
                        onDateChange={(date) => setFieldValue('date', date)}
                    />
                  </Field>
                </View>
              </ScrollView>

              <View style={formStyles.button}>
                <Button title={'Select Food'} onPress={() => selectFood(setFieldValue, values, errors)}/>
              </View>

              <View style={formStyles.button}>
                <Button style={formStyles.button} title={'Save'} onPress={handleSubmit}/>
              </View>
            </View>
        )}
      </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
