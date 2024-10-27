import { Button, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import { defaultMeal, MealForm, MealSchema, toMealForm } from '../domain/meal.ts';
import { formStyles } from '../styles/form.tsx';
import { useAppDispatch, useAppSelector } from '../domain/hooks.ts';
import { FieldArray, Formik } from 'formik';
import { findMealById, food, selection } from '../store.ts';
import { Field } from './Field.tsx';
import DatePicker from 'react-native-date-picker';
import { addMeal, updateMeal } from '../features/mealSlice.tsx';
import { generateId } from '../domain/id.ts';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { defaultOffset, primaryColor } from '../styles/variables.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes.tsx';
import { removeFromSelection } from '../features/selectionSlice.tsx';
import { FoodWeighted } from './FoodWeighted.tsx';
import { FormikProps } from 'formik/dist/types';
import { Container } from './Container.tsx';
import { Input } from './Input.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'MealEdit'>;

export function MealEdit({navigation, route}: Props): React.JSX.Element {
    const dispatch = useAppDispatch();

    const formRef = useRef<FormikProps<MealForm>>(null);

    const {id, newMealId} = route.params;
    const title = id ? 'Edit Meal' : 'Add Meal';
    const mealExist = useAppSelector(findMealById(id || newMealId));

    const ids = useAppSelector(selection);
    const foodState = useAppSelector(food);

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
    }, [newMealId, mealExist]);

    useEffect(() => {
        if (!id && !newMealId && !ids.length) {
            navigation.navigate('FoodList', {selectable: true});
        }
    }, []);

    useEffect(() => {
        const {setFieldValue, values} = formRef.current!;

        setFieldValue(
            'items',
            ids
                .map(id => {
                    const foodExist = values.items.find(f => f.foodId === id);
                    if (foodExist) {
                        return foodExist;
                    }

                    const exist = foodState.find(f => f.id === id);
                    if (!exist) {
                        return null;
                    }

                    return {
                        weight: exist.weight.toString(),
                        foodId: exist.id,
                    };
                })
                .filter(f => f !== null),
        );
    }, [ids, foodState, formRef]);

    return (
        <Formik
            innerRef={formRef}
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
                <Container>
                    <View style={layoutStyles.header}>
                        <Text style={typoStyles.heading}>{title}</Text>
                        <Button
                            color={primaryColor}
                            title={'Select Food'}
                            onPress={() =>
                                navigation.navigate('FoodList', {selectable: true})
                            }
                        />
                    </View>
                    <ScrollView>
                        <View style={formStyles.form}>
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
                                                    <Input
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
                                                    index={index}
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
                                <Input
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
                            <Button color={primaryColor} title={'Save'} onPress={handleSubmit} />
                        </View>
                    </View>
                </Container>
            )}
        </Formik>
    );
}
