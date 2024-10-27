import React, { PropsWithChildren } from 'react';
import { Alert, Button, Pressable, Switch, Text, View } from 'react-native';
import { Food } from '../domain/food.ts';
import { Number } from './Number.tsx';
import { removeFood } from '../features/foodSlice.tsx';
import { useAppDispatch } from '../domain/hooks.ts';
import { ID } from '../domain/id.ts';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { FoodEditCta } from './FoodEditCta.tsx';
import { primaryColor, secondaryColor } from '../styles/variables.tsx';
import { FoodInfo } from './FoodInfo.tsx';
import { Card } from './Card.tsx';

type Props = PropsWithChildren<{
    index?: number;
    item: Food;
    primary?: boolean;
    selectable?: boolean;
    selected?: boolean;
    select?: (id: ID) => void;
    readonly?: boolean;
    onPress?: () => void;
}>;

export function FoodCard({
                             index,
                             item,
                             primary,
                             selectable,
                             selected,
                             select,
                             readonly,
                             onPress,
                         }: Props): React.JSX.Element {
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
        <Card>
            <View style={{...layoutStyles.row, alignItems: 'flex-start'}}>
                <Pressable style={layoutStyles.rowText} onPress={onPress}>
                    <Text
                        style={primary ? typoStyles.headingPrimary : typoStyles.heading}
                    >
                        {index !== undefined ? `${index + 1}. ` : ''}
                        {item.name}
                        {item.totalUse ? ` (${item.totalUse})` : ''}
                    </Text>
                </Pressable>

                <View style={layoutStyles.spacer} />
                <Number special={true} value={item.kcal}>kcal</Number>
            </View>

            <FoodInfo item={item} />

            {!readonly && (
                <View style={layoutStyles.row}>
                    {selectable && (
                        <Switch
                            thumbColor={(selected ? primaryColor : 'gray')}
                            onValueChange={() => select?.(item.id)}
                            value={selected}
                        />
                    )}

                    <FoodEditCta id={item.id} />

                    <Button
                        color={secondaryColor}
                        onPress={confirmRemove}
                        title="Delete Food"
                    />
                </View>
            )}
        </Card>
    );
}
