import React, { PropsWithChildren } from 'react';
import { Alert, Button, StyleSheet, Switch, Text, View } from 'react-native';
import { Food } from '../domain/food.ts';
import { Number } from './Number.tsx';
import { cardStyles } from '../styles/card.tsx';
import { removeFood } from '../features/foodSlice.tsx';
import { useAppDispatch } from '../domain/hooks.ts';
import { ID } from '../domain/id.ts';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { FoodEditCta } from './FoodEditCta.tsx';

type SectionProps = PropsWithChildren<{
    item: Food;
    primary?: boolean;
    selectable?: boolean;
    selected?: boolean;
    select?: (id: ID) => void;
    readonly?: boolean;
}>;

export function FoodCard({
                             item,
                             primary,
                             selectable,
                             selected,
                             select,
                             readonly,
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
            <View style={layoutStyles.row}>
                <Text
                    style={
                        primary ? typoStyles.headingPrimary : typoStyles.heading
                    }>

                    {item.name}
                </Text>
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

                    <Button color={'#bb0000'} onPress={confirmRemove} title="Delete"/>
                </View>
            )}

            <View style={layoutStyles.row}>
                <View style={styles.category}>
                    <Text style={styles.term}>Weight</Text>
                    <Number value={item.weight}/>
                </View>

                <View style={styles.category}>
                    <Text style={styles.term}>Kcal</Text>
                    <Number value={item.kcal}/>
                </View>

                <View style={styles.category}>
                    <Text style={styles.term}>Protein</Text>
                    <Number value={item.protein}/>
                </View>

                <View style={styles.category}>
                    <Text style={styles.term}>Fat</Text>
                    <Number value={item.fat}/>
                </View>

                <View style={styles.category}>
                    <Text style={styles.term}>Carbs</Text>
                    <Number value={item.carbs}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    term: {
        fontWeight: 'bold',
    },
    category: {
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
    },
});
