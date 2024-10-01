import { Button, ScrollView, StyleSheet, TextInput, View, } from 'react-native';
import React, { PropsWithChildren } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Food, FoodType } from '../domain/food.ts';
import { formStyles } from '../styles/form.tsx';
import { useAppDispatch, useAppSelector } from '../domain/hooks.ts';
import { ID } from '../domain/id.ts';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addFood, updateFood } from '../features/foodSlice.tsx';
import { Field } from './Field.tsx';

type SectionProps = PropsWithChildren<{
    route: any;
    navigation: any;
}>;

interface FoodForm {
    id?: string;
    name: string;
    weight: string;
    type: FoodType;
    kcal: string;
    protein: string;
    fat: string;
    carbs: string;
}

const defaultFood: FoodForm = {
    name: '',
    weight: '',
    type: FoodType.Default,
    kcal: '',
    protein: '',
    fat: '',
    carbs: '',
};

function toFoodForm(food: Food): FoodForm {
    return {
        ...food,
        weight: food.weight.toString(),
        kcal: food.kcal.toString(),
        protein: food.protein.toString(),
        fat: food.fat.toString(),
        carbs: food.carbs.toString(),
    };
}

const FoodSchema = Yup.object().shape({
    name: Yup.string()
        .min(1)
        .max(50)
        .required(),
    weight: Yup.number().required().min(0).max(1000).positive(),
    type: Yup.mixed<FoodType>().oneOf(Object.values(FoodType)).required(),
    kcal: Yup.number().required().min(0).max(1000),
    protein: Yup.number().required().min(0).max(1000),
    fat: Yup.number().required().min(0).max(1000),
    carbs: Yup.number().required().min(0).max(1000),
});

const types = Object.keys(FoodType).map(key => {
    // @ts-ignore
    return {label: key, value: FoodType[key]};
});

export function FoodEdit({navigation, route}: SectionProps): React.JSX.Element {
    const dispatch = useAppDispatch();

    const exist = useAppSelector(state => {
        const id: ID | undefined = route.params?.id;
        return state.food.items.find((item: Food) => item.id === id);
    });

    const food = exist ? toFoodForm(exist) : defaultFood;

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
                            <Field label={'Name'} name={'name'} errors={errors}>
                                <TextInput
                                    style={formStyles.input}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                            </Field>

                            <Field label={'Weight'} name={'weight'} errors={errors}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
                                    value={values.weight}
                                    onChangeText={handleChange('weight')}
                                    onBlur={handleBlur('weight')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Type'} name={'type'} errors={errors}>
                                <View style={formStyles.select}>
                                    <RNPickerSelect
                                        value={values.type}
                                        items={types}
                                        onValueChange={handleChange('type')}
                                        onClose={handleBlur('type')}
                                    />
                                </View>
                            </Field>

                            <Field label={'Kcal'} name={'kcal'} errors={errors}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
                                    value={values.kcal}
                                    onChangeText={handleChange('kcal')}
                                    onBlur={handleBlur('kcal')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Protein'} name={'protein'} errors={errors}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
                                    value={values.protein}
                                    onChangeText={handleChange('protein')}
                                    onBlur={handleBlur('protein')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Fat'} name={'fat'} errors={errors}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
                                    value={values.fat}
                                    onChangeText={handleChange('fat')}
                                    onBlur={handleBlur('fat')}
                                    placeholder={'0'}
                                />
                            </Field>

                            <Field label={'Carbs'} name={'carbs'} errors={errors}>
                                <TextInput
                                    style={formStyles.input}
                                    inputMode={'numeric'}
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
