import { Button, ScrollView, StyleSheet, TextInput, View, } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { defaultFood, FoodSchema, toFoodForm } from '../domain/food.ts';
import { formStyles } from '../styles/form.tsx';
import { useAppDispatch, useAppSelector } from '../domain/hooks.ts';
import { Formik } from 'formik';
import { addFood, findFoodById, updateFood } from '../features/foodSlice.tsx';
import { Field } from './Field.tsx';

type SectionProps = PropsWithChildren<{
    route: any;
    navigation: any;
}>;

export function FoodEdit({navigation, route}: SectionProps): React.JSX.Element {
    const dispatch = useAppDispatch();

    const exist = useAppSelector(state => findFoodById(state, route.params?.id));
    const food = exist ? toFoodForm(exist) : defaultFood();

    return (
        <Formik
            initialValues={food}
            validationSchema={FoodSchema}
            onSubmit={values => {
                const foodEdit = FoodSchema.cast(values);

                if (food.id) {
                    dispatch(updateFood({id: food.id, body: foodEdit}));
                    navigation.navigate('FoodList');
                } else {
                    dispatch(addFood(foodEdit));
                    navigation.navigate('FoodList');
                }
            }}
        >
            {({errors, touched, handleChange, handleBlur, handleSubmit, values}) => (
                <View style={styles.container}>
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
                                    maxLength={4}
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
                                    maxLength={4}
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
                                    maxLength={4}
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
                                    maxLength={4}
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
                                    maxLength={4}
                                    value={values.carbs}
                                    onChangeText={handleChange('carbs')}
                                    onBlur={handleBlur('carbs')}
                                    placeholder={'0'}
                                />
                            </Field>
                        </View>
                    </ScrollView>

                    <View style={formStyles.button}>
                        <Button title={'Save'} onPress={handleSubmit}/>
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
