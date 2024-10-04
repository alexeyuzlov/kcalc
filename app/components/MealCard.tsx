import React, { PropsWithChildren } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { Meal } from '../domain/meal.ts';
import { FoodCard } from './FoodCard.tsx';
import { cardStyles } from '../styles/card.tsx';
import { useAppDispatch } from '../domain/hooks.ts';
import { removeMeal } from '../features/mealSlice.tsx';
import { MealEditCta } from './MealEditCta.tsx';
import { Summary } from './Summary.tsx';

type SectionProps = PropsWithChildren<{
    item: Meal;
    copy: () => void;
}>;

export function MealCard({
                             item,
                             copy,
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
                onPress: () => dispatch(removeMeal(item.id)),
                style: 'destructive',
            },
        ]);

    const items = item.items.map((foodWeighted) => {
        return foodWeighted.food &&
            <FoodCard
                key={foodWeighted.foodId}
                item={foodWeighted.food}
                readonly={true}
            />;
    });

    return (
        <View style={cardStyles.containerOut}>
            {
                item.name
                    ? <Summary name={item.name} items={[item]}/>
                    : <View style={{gap: 10}}>{items}</View>
            }

            <View style={styles.group}>
                <Button
                    title="Copy Meal"
                    onPress={copy}
                />

                <MealEditCta id={item.id}/>

                <Button
                    color={'#bb0000'}
                    onPress={confirmRemove}
                    title="Delete Meal"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    group: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
