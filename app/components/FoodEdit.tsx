import { Button, ScrollView, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { defaultFood, FoodForm, FoodSchema, toFoodForm } from '../domain/food.ts';
import { formStyles } from '../styles/form.tsx';
import { useAppDispatch, useAppSelector } from '../domain/hooks.ts';
import { Formik } from 'formik';
import { addFood, findFoodById, updateFood } from '../features/foodSlice.tsx';
import { Field } from './Field.tsx';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { primaryColor } from '../styles/variables.tsx';
import { RootStackParamList } from '../routes.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from './Container.tsx';
import { Input } from './Input.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'FoodEdit'>;

export function FoodEdit({navigation, route}: Props): React.JSX.Element {
    const dispatch = useAppDispatch();

    const id = route.params.id;

    const defaultName = useAppSelector(state => state.food.defaultName);

    const exist = useAppSelector(state => findFoodById(state, id));
    const food = useMemo(() => {
        return exist ? toFoodForm(exist) : defaultFood(defaultName);
    }, [defaultName, exist]);

    const submitForm = (values: FoodForm) => {
        // console.info('Food', values);

        const foodEdit = FoodSchema.cast(values);
        foodEdit.name = foodEdit.name?.trim();

        if (food.id) {
            dispatch(updateFood({id: food.id, body: foodEdit}));
        } else {
            dispatch(addFood(foodEdit));
        }

        navigation.goBack();
    };

    return (
        <Formik
            initialValues={food}
            validationSchema={FoodSchema}
            onSubmit={submitForm}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
              <Container>
                    <View style={layoutStyles.header}>
                        <Text style={typoStyles.heading}>
                            {id ? 'Edit Food' : 'Add Food'}
                        </Text>
                    </View>

                    <ScrollView>
                        <View style={formStyles.form}>
                            <Field label={'Name'} name={'name'}>
                                <Input
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                            </Field>

                            <Field label={'Kcal'} name={'kcal'}>
                                <Input
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.kcal}
                                    onChangeText={handleChange('kcal')}
                                    onBlur={handleBlur('kcal')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Protein'} name={'protein'}>
                                <Input
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.protein}
                                    onChangeText={handleChange('protein')}
                                    onBlur={handleBlur('protein')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Fat'} name={'fat'}>
                                <Input
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.fat}
                                    onChangeText={handleChange('fat')}
                                    onBlur={handleBlur('fat')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Carbs'} name={'carbs'}>
                                <Input
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.carbs}
                                    onChangeText={handleChange('carbs')}
                                    onBlur={handleBlur('carbs')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Weight'} name={'weight'}>
                                <Input
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.weight}
                                    onChangeText={handleChange('weight')}
                                    onBlur={handleBlur('weight')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Fiber'} name={'fiber'}>
                                <Input
                                    inputMode={'numeric'}
                                    maxLength={7}
                                    value={values.fiber}
                                    onChangeText={handleChange('fiber')}
                                    onBlur={handleBlur('fiber')}
                                    placeholder={'0'}
                                />
                            </Field>
                        </View>
                    </ScrollView>

                    <View style={layoutStyles.footer}>
                        <View style={{flex: 1}}>
                            <Button
                                color={primaryColor}
                                title={'Save'}
                                onPress={handleSubmit}
                            />
                        </View>
                    </View>
              </Container>
            )}
        </Formik>
    );
}
