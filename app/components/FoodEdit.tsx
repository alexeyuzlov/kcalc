import { Button, ScrollView, Text, TextInput, View, } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { defaultFood, FoodForm, FoodSchema, toFoodForm } from '../domain/food.ts';
import { formStyles } from '../styles/form.tsx';
import { useAppDispatch, useAppSelector } from '../domain/hooks.ts';
import { Formik } from 'formik';
import { addFood, findFoodById, updateFood } from '../features/foodSlice.tsx';
import { Field } from './Field.tsx';
import { ID } from '../domain/id.ts';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { primaryColor } from '../styles/variables.tsx';

type SectionProps = PropsWithChildren<{
    id?: ID;
    done: () => void;
}>;

export function FoodEdit({
                             id,
                             done,
                         }: SectionProps): React.JSX.Element {
    const dispatch = useAppDispatch();

    const exist = useAppSelector(state => findFoodById(state, id));
    const food = exist ? toFoodForm(exist) : defaultFood();

    const submitForm = (values: FoodForm) => {
        console.info('Food', values);

        const foodEdit = FoodSchema.cast(values);
        foodEdit.name = foodEdit.name?.trim();

        if (food.id) {
            dispatch(updateFood({id: food.id, body: foodEdit}));
        } else {
            dispatch(addFood(foodEdit));
        }

        done();
    };

    return (
        <Formik
            initialValues={food}
            validationSchema={FoodSchema}
            onSubmit={submitForm}
        >
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <View style={layoutStyles.container}>
                    <View style={layoutStyles.header}>
                        <Text style={typoStyles.heading}>{id ? 'Edit Food' : 'Add Food'}</Text>
                    </View>

                    <ScrollView>
                        <View style={formStyles.form}>
                            <Field label={'Name'} name={'name'}>
                                <TextInput
                                    style={formStyles.input}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                            </Field>

                            <Field label={'Weight'} name={'weight'}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.weight}
                                    onChangeText={handleChange('weight')}
                                    onBlur={handleBlur('weight')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Kcal'} name={'kcal'}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.kcal}
                                    onChangeText={handleChange('kcal')}
                                    onBlur={handleBlur('kcal')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Protein'} name={'protein'}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.protein}
                                    onChangeText={handleChange('protein')}
                                    onBlur={handleBlur('protein')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Fat'} name={'fat'}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.fat}
                                    onChangeText={handleChange('fat')}
                                    onBlur={handleBlur('fat')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Carbs'} name={'carbs'}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.carbs}
                                    onChangeText={handleChange('carbs')}
                                    onBlur={handleBlur('carbs')}
                                    placeholder={'0'}
                                />
                            </Field>
                        </View>
                    </ScrollView>

                    <View style={layoutStyles.footer}>
                        <View style={{flex: 1}}>
                            <Button color={primaryColor} title={'Save'} onPress={handleSubmit}/>
                        </View>
                    </View>
                </View>
            )}
        </Formik>
    );
}
