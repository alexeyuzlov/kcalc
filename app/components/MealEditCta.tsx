import { Button } from 'react-native';
import React, { PropsWithChildren, useMemo } from 'react';
import { ID } from '../domain/id.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes.tsx';
import { setSelection } from '../features/selectionSlice.tsx';
import { useAppDispatch, useAppSelector } from '../domain/hooks.ts';
import { meal } from '../store.ts';
import { primaryColor } from '../styles/variables.tsx';

type Props = PropsWithChildren<{
    id?: ID;
    newMealId?: ID;
}>;

export function MealEditCta({id, newMealId}: Props): React.JSX.Element {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const dispatch = useAppDispatch();

    const key = newMealId ? 'newMealId' : 'id';
    const value = newMealId || id;

    const title = useMemo(() => {
        if (newMealId) {
            return 'Copy Meal';
        }

        return id ? 'Edit Meal' : 'Add Meal';
    }, [id, newMealId]);

    const mealState = useAppSelector(meal);

    const navigateToMealEdit = () => {
        const exist = mealState.find(m => m.id === value);

        dispatch(setSelection(exist ? exist.items.map(i => i.foodId) : []));

        navigation.navigate('MealEdit', {
            [key]: value,
        });
    };

    return <Button color={primaryColor} onPress={() => navigateToMealEdit()} title={title} />;
}
