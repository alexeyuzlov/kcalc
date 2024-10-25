import { Button, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { ID } from '../domain/id.ts';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../routes.tsx';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { setNewNameForFood } from '../features/foodSlice.tsx';
import { useAppDispatch } from '../domain/hooks.ts';

type SectionProps = PropsWithChildren<{
    id?: ID;
    defaultName?: string;
}>;

export function FoodEditCta({
                                id,
                                defaultName,
                            }: SectionProps): React.JSX.Element {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const dispatch = useAppDispatch();

    const title = id ? 'Edit Food' : 'Add Food';

    const navigateToFoodEdit = () => {
        if (defaultName) {
            dispatch(setNewNameForFood(defaultName));
        }

        navigation.navigate('FoodEdit', {id});
    };

    return (
        <View>
            <Button onPress={() => navigateToFoodEdit()} title={title}/>
        </View>
    );
}
