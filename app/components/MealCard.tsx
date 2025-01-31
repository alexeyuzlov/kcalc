import React, { PropsWithChildren, useMemo, useState } from 'react';
import { Alert, Button, View } from 'react-native';
import { Meal } from '../domain/meal.ts';
import { FoodCard } from './FoodCard.tsx';
import { useAppDispatch } from '../domain/hooks.ts';
import { removeMeal } from '../features/mealSlice.tsx';
import { MealEditCta } from './MealEditCta.tsx';
import { Summary } from './Summary.tsx';
import { defaultOffset, secondaryColor } from '../styles/variables.tsx';
import { layoutStyles } from '../styles/layout.tsx';
import { Card } from './Card.tsx';

type Props = PropsWithChildren<{
    item: Meal;
}>;

export function MealCard({item}: Props): React.JSX.Element {
    const dispatch = useAppDispatch();

    const [expanded, setExpanded] = useState(false);

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

    const toggleExpand = () => setExpanded(!expanded);

    const items = useMemo(() => {
        return item.items.map((foodWeighted, index) => {
            return (
                foodWeighted.food && (
                    <FoodCard
                        key={foodWeighted.foodId}
                        index={item.items.length > 1 ? index : undefined}
                        item={foodWeighted.food}
                        readonly={true}
                    />
                )
            );
        });
    }, [item.items]);

    return (
        <Card out={true}>
            {item.name ? (
                <Summary onPress={toggleExpand} name={item.name} items={[item]} />
            ) : (
                <View style={{gap: defaultOffset}}>{items}</View>
            )}

            {expanded && <View style={{gap: defaultOffset}}>{items}</View>}

            <View style={layoutStyles.row}>
                <MealEditCta newMealId={item.id} />

                <MealEditCta id={item.id} />

                <Button
                    color={secondaryColor}
                    onPress={confirmRemove}
                    title="Delete Meal"
                />
            </View>
        </Card>
    );
}
