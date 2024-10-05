import React, { PropsWithChildren } from 'react';
import { Alert, Button, Switch, Text, View } from 'react-native';
import { Food } from '../domain/food.ts';
import { Number } from './Number.tsx';
import { cardStyles } from '../styles/card.tsx';
import { removeFood } from '../features/foodSlice.tsx';
import { useAppDispatch } from '../domain/hooks.ts';
import { ID } from '../domain/id.ts';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { FoodEditCta } from './FoodEditCta.tsx';
import { dangerColor } from '../styles/variables.tsx';

type SectionProps = PropsWithChildren<{
    item: Food;
    primary?: boolean;
    selectable?: boolean;
    selected?: boolean;
    select?: (id: ID) => void;
    readonly?: boolean;
    children?: React.ReactNode;
}>;

export function FoodCard({
                             item,
                             primary,
                             selectable,
                             selected,
                             select,
                             readonly,
                             children
                         }: SectionProps): React.JSX.Element {
    const dispatch = useAppDispatch();

    const confirmRemove = () =>
        Alert.alert('Confirm action', 'Are you sure?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Remove',
                onPress: () => dispatch(removeFood(item.id)),
                style: 'destructive',
            },
        ]);

    return (
        <View style={cardStyles.container}>
            <View style={{...layoutStyles.row, alignItems: 'flex-start'}}>
                <Text style={primary ? typoStyles.headingPrimary : typoStyles.heading}>
                    {item.name + ' '}
                    ({<Number value={item.weight}/>})
                    {children}
                </Text>

                <Number value={item.kcal}/>
            </View>

            <View style={{flexDirection: 'row', gap: 4}}>
                <Number value={item.protein}/>
                <Text>/</Text>
                <Number value={item.fat}/>
                <Text>/</Text>
                <Number value={item.carbs}/>
            </View>

            {!readonly && (
                <View style={layoutStyles.row}>
                    {selectable && (
                        <Switch
                            onValueChange={() => select?.(item.id)}
                            value={selected}
                        />
                    )}

                    <FoodEditCta id={item.id}/>

                    <Button color={dangerColor} onPress={confirmRemove} title="Delete Food"/>
                </View>
            )}
        </View>
    );
}
