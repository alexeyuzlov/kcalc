import { Button, Modal, ScrollView, Text, TextInput, View, } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { defaultMeal, MealForm, MealSchema, toMealForm } from '../domain/meal.ts';
import { formStyles } from '../styles/form.tsx';
import { useAppDispatch, useAppSelector } from '../domain/hooks.ts';
import { FieldArray, Formik } from 'formik';
import { findMealById } from '../store.ts';
import { Field } from './Field.tsx';
import DatePicker from 'react-native-date-picker';
import { addMeal, updateMeal } from '../features/mealSlice.tsx';
import { FoodCard } from './FoodCard.tsx';
import { generateId, ID } from '../domain/id.ts';
import { foodWeighted } from '../domain/food.ts';
import { FoodList } from './FoodList.tsx';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';

type SectionProps = PropsWithChildren<{
    id?: ID;
    newMeal?: MealForm;
    done: () => void;
}>;

export function MealEdit({
                             id,
                             newMeal,
                             done
                         }: SectionProps): React.JSX.Element {
    const dispatch = useAppDispatch();

    const [foodModalVisible, setFoodModalVisible] = useState(false);

    const foodState = useAppSelector(state => state.food.items);

    const exist = useAppSelector(findMealById(id));

    const meal: MealForm = newMeal || (exist ? toMealForm(exist) : defaultMeal());

    const [selectedIds, setSelectedIds] = useState<Array<ID>>([
        ...meal.items.map(i => i.foodId),
    ]);

    const title = id ? 'Edit Meal' : 'Add Meal';

    const selectFood = (setFieldValue: (field: string, value: any) => void, values: MealForm) => {
        setFoodModalVisible(false);
        setFieldValue('items', selectedIds.map(id => {
            const exist = values.items.find(f => f.foodId === id);
            if (exist) {
                return exist;
            }

            const food = foodState.find(f => f.id === id)!;
            return {
                weight: food.weight.toString(),
                foodId: food.id
            };
        }));
    };

    const foodCard = (fw: { weight: string; foodId: ID }, removeFn: () => void) => {
        const food = foodState.find(f => f.id === fw.foodId);
        if (!food) {
            return;
        }

        const result = foodWeighted(food, parseFloat(fw.weight) || 0);
        return (
            <FoodCard
                item={result}
                selectable={true}
                selected={selectedIds.includes(fw.foodId)}
                select={() => removeFn()}
            />
        );
    };

    return (
        <Formik
            initialValues={meal}
            validationSchema={MealSchema}
            onSubmit={values => {
                const cast = MealSchema.cast(values);
                const mealEdit = {
                    ...cast,
                    date: cast.date.toISOString(),
                    items: cast.items!
                };

                if (meal.id) {
                    dispatch(updateMeal({id: meal.id, body: mealEdit}));
                } else {
                    dispatch(addMeal({
                        ...mealEdit,
                        id: generateId()
                    }));
                }

                done();
            }}
        >
            {({setFieldValue, errors, touched, handleChange, handleBlur, handleSubmit, values}) => (
                <View style={layoutStyles.container}>
                    <View style={layoutStyles.header}>
                        <Text style={typoStyles.heading}>{title}</Text>
                        <Button title={'Select Food'} onPress={() => setFoodModalVisible(true)}/>
                    </View>
                    <ScrollView>
                        <View style={formStyles.form}>
                            <Field name={'items'}>
                                <FieldArray
                                    name={'items'}
                                    render={arrayHelpers =>
                                        values.items.map((foodItem, index) => (
                                            <View key={foodItem.foodId} style={{gap: 8}}>
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

                                                {foodCard(foodItem, () => {
                                                    arrayHelpers.remove(index);
                                                    setSelectedIds(selectedIds.filter(id => id !== foodItem.foodId));
                                                })}
                                            </View>
                                        ))
                                    }
                                />
                            </Field>

                            <Field label={'Name'} name={'name'}>
                                <TextInput
                                    style={formStyles.input}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
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

                    {
                        foodModalVisible &&
                        <Modal
                            animationType="slide"
                            visible={foodModalVisible}
                            onRequestClose={() => setFoodModalVisible(false)}
                        >
                            <FoodList
                                selectable={true}
                                selectedIds={selectedIds}
                                setSelectedIds={setSelectedIds}
                                select={() => selectFood(setFieldValue, values)}
                            />
                        </Modal>
                    }

                    <View style={formStyles.button}>
                        <Button style={formStyles.button} title={'Save'} onPress={handleSubmit}/>
                    </View>
                </View>
            )}
        </Formik>
    );
}
