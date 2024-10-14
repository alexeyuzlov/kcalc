import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {defaultMeal, MealForm, MealSchema, toMealForm} from '../domain/meal.ts';
import {formStyles} from '../styles/form.tsx';
import {useAppDispatch, useAppSelector} from '../domain/hooks.ts';
import {FieldArray, Formik, useFormikContext} from 'formik';
import {findMealById, food} from '../store.ts';
import {Field} from './Field.tsx';
import DatePicker from 'react-native-date-picker';
import {addMeal, updateMeal} from '../features/mealSlice.tsx';
import {generateId} from '../domain/id.ts';
import {layoutStyles} from '../styles/layout.tsx';
import {typoStyles} from '../styles/typo.tsx';
import {defaultOffset} from '../styles/variables.tsx';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes.tsx';
import {
  removeFromSelection,
  setSelection,
} from '../features/selectionSlice.tsx';
import {FoodWeighted} from './FoodWeighted.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'MealEdit'>;

const BusinessLogic = () => {
    const {values, setFieldValue} = useFormikContext<MealForm>();
    const ids = useAppSelector(state => state.selection.items);
    const foodState = useAppSelector(food);

    useEffect(() => {
      setFieldValue(
        'items',
        ids
          .map(id => {
            const foodExist = values.items.find(f => f.foodId === id);
            if (foodExist) {
              return foodExist;
            }

            const food = foodState.find(f => f.id === id);
            if (!food) {
              return null;
            }

            return {
              weight: food.weight.toString(),
              foodId: food.id,
            };
          })
          .filter(f => f !== null),
      );
    }, [ids, foodState]);

    return null;
};

export function MealEdit({navigation, route}: Props): React.JSX.Element {
    const dispatch = useAppDispatch();

    const {id, newMealId} = route.params;
    const title = id ? 'Edit Meal' : 'Add Meal';
    const mealExist = useAppSelector(findMealById(id || newMealId));

    const meal: MealForm = useMemo(() => {
      const newMeal =
        newMealId &&
        (() => {
          const mealForm = toMealForm({
            ...mealExist!,
            date: new Date().toISOString(),
          });

          delete mealForm.id;

          return mealForm;
        })();

      return newMeal || (mealExist ? toMealForm(mealExist) : defaultMeal());
    }, [id, newMealId, mealExist]);


    useEffect(() => {
      const selectedIds = meal.items.map(i => i.foodId);
      dispatch(setSelection(selectedIds));

      return () => {
        dispatch(setSelection([]));
      };
    }, []);

    return (
      <Formik
        initialValues={meal}
        validationSchema={MealSchema}
        onSubmit={values => {
          // console.info('Meal', values);

          const cast = MealSchema.cast(values);
          const mealEdit = {
            ...cast,
            name: cast.name?.trim(),
            date: cast.date.toISOString(),
            items: cast.items!,
          };

          if (meal.id) {
            dispatch(updateMeal({id: meal.id, body: mealEdit}));
          } else {
            dispatch(
              addMeal({
                ...mealEdit,
                id: generateId(),
              }),
            );
          }

          navigation.goBack();
        }}>
        {({setFieldValue, handleChange, handleBlur, handleSubmit, values}) => (
          <View style={layoutStyles.container}>
            <View style={layoutStyles.header}>
              <Text style={typoStyles.heading}>{title}</Text>
              <Button
                title={'Select Food'}
                onPress={() => navigation.navigate('FoodList')}
              />
            </View>
            <ScrollView>
              <View style={formStyles.form}>
                <BusinessLogic />

                <Field name={'items'}>
                  <FieldArray
                    name={'items'}
                    render={arrayHelpers =>
                      values.items.map((foodItem, index) => (
                        <View
                          key={foodItem.foodId}
                          style={{gap: defaultOffset}}>
                          <Field
                            label={'Weight'}
                            name={`items[${index}].weight`}>
                            <TextInput
                              style={formStyles.input}
                              inputMode={'numeric'}
                              maxLength={7}
                              value={values.items[index].weight}
                              onChangeText={handleChange(
                                `items[${index}].weight`,
                              )}
                              onBlur={handleBlur(`items[${index}].weight`)}
                              placeholder={'0'}
                            />
                          </Field>

                          <FoodWeighted
                            fw={foodItem}
                            removeFn={() => {
                              arrayHelpers.remove(index);
                              dispatch(removeFromSelection(foodItem.foodId));
                            }}
                          />
                        </View>
                      ))
                    }
                  />
                </Field>

                <Field label={'Meal Name (for search)'} name={'name'}>
                  <TextInput
                    style={formStyles.input}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                </Field>

                <Field
                  label={'Date ' + values.date.toISOString()}
                  name={'date'}>
                  <DatePicker
                    date={values.date}
                    onDateChange={date => setFieldValue('date', date)}
                  />
                </Field>
              </View>
            </ScrollView>

            <View style={layoutStyles.footer}>
              <View style={{flex: 1}}>
                <Button title={'Save'} onPress={handleSubmit} />
              </View>
            </View>
          </View>
        )}
      </Formik>
    );
}
