import { ScrollView, StyleSheet, Text, View, } from 'react-native';
import React, { useMemo, useState } from 'react';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes.tsx';
import { food, meal } from '../store.ts';
import { useAppSelector } from '../domain/hooks.ts';
import { groupByUsing, mealGroups } from '../domain/meal-groups.ts';
import { emptyFood, Food } from '../domain/food.ts';
import { cardStyles } from '../styles/card.tsx';
import { defaultOffset } from '../styles/variables.tsx';
import { FoodCard } from './FoodCard.tsx';
import { DateGroup } from '../domain/date.ts';

type Props = NativeStackScreenProps<RootStackParamList, 'Stats'>;

export function Stats({navigation, route}: Props): React.JSX.Element {
    const mealState = useAppSelector(meal);
    const foodState = useAppSelector(food);

    const [dateGroup, setDateGroup] = useState<DateGroup>('day');

    const groups = useMemo(() => {
        return mealGroups(mealState, foodState, dateGroup);
    }, [mealState, foodState, dateGroup]);

    const topProducts = useMemo(() => {
        const totalProducts = 10;
        const products = groupByUsing(groups, foodState);
        return Object.values(products)
            .sort((a, b) => b.totalUse - a.totalUse)
            .slice(0, totalProducts);
    }, [groups]);

    const averagePerGroup = useMemo(() => {
        const result: Food = emptyFood(`Average per ${dateGroup}`);

        groups.forEach(group => {
            result.weight += group.summary.weight;
            result.kcal += group.summary.kcal;
            result.protein += group.summary.protein;
            result.fat += group.summary.fat;
            result.carbs += group.summary.carbs;
            result.fiber = result.fiber! + group.summary.fiber!;
        });

        const totalDays = groups.length || 1;

        return {
            ...result,
            weight: result.weight / totalDays,
            kcal: result.kcal / totalDays,
            protein: result.protein / totalDays,
            fat: result.fat / totalDays,
            carbs: result.carbs / totalDays,
            fiber: result.fiber! / totalDays,
        };
    }, [groups, dateGroup]);

    return (
        <View style={layoutStyles.container}>
            <View style={layoutStyles.header}>
                <Text style={typoStyles.heading}>Stats</Text>
            </View>

            <ScrollView>
                <View style={{gap: defaultOffset}}>
                    <View style={cardStyles.container}>
                        <Text style={typoStyles.heading}>Top products by use</Text>
                        {topProducts.map((food, index) => (
                            <View key={food.id}>
                                <Text>#{index + 1}. {food.name} ({food.totalUse})</Text>
                            </View>
                        ))}
                    </View>

                    <View style={cardStyles.container}>
                        <FoodCard item={averagePerGroup} readonly={true}/>
                    </View>
                </View>
            </ScrollView>

            <View style={layoutStyles.footer}></View>
        </View>
    );
}

const styles = StyleSheet.create({});
