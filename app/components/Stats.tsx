import { Button, ScrollView, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes.tsx';
import { food, meal } from '../features/store.ts';
import { useAppSelector } from '../domain/hooks.ts';
import { groupByUsing, MealGroup, mealGroups } from '../domain/meal-groups.ts';
import { emptyFood, Food } from '../domain/food.ts';
import { defaultOffset, primaryColor } from '../styles/variables.tsx';
import { FoodCard } from './FoodCard.tsx';
import { DateGroup, printDate } from '../domain/date.ts';
import { mealTable } from '../domain/report.ts';
import { PATH_TO_REPORT_FILE_NAME, saveInternalFile } from '../domain/file.ts';
import Share from 'react-native-share';
import { Card } from './Card.tsx';
import { Container } from './Container.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'Stats'>;

function average(name: string, groups: MealGroup[]): Food {
    const result: Food = emptyFood(name);

    groups.forEach(group => {
        result.weight += group.summary.weight;
        result.kcal += group.summary.kcal;
        result.protein += group.summary.protein;
        result.fat += group.summary.fat;
        result.carbs += group.summary.carbs;
        result.fiber = result.fiber! + group.summary.fiber!;
        result.salt = result.salt! + group.summary.salt!;
    });

    const days = groups.length || 1;

    return {
        ...result,
        weight: result.weight / days,
        kcal: result.kcal / days,
        protein: result.protein / days,
        fat: result.fat / days,
        carbs: result.carbs / days,
        fiber: result.fiber! / days,
        salt: result.salt! / days,
    };
}

export function Stats({navigation, route}: Props): React.JSX.Element {
    const mealState = useAppSelector(meal);
    const foodState = useAppSelector(food);
    const totalProducts = 25;

    const [dateGroup, setDateGroup] = useState<DateGroup>('day');

    const groups = useMemo(() => {
        return mealGroups(mealState, foodState, dateGroup);
    }, [mealState, foodState, dateGroup]);

    const topProducts = useMemo(() => {
        const products = groupByUsing(groups, foodState);
        return Object.values(products)
            .sort((a, b) => b.totalUse - a.totalUse)
            .slice(0, totalProducts);
    }, [groups, foodState]);

    const averagePerGroup = useMemo(() => {
        return average(`Average (total ${dateGroup}s: ${groups.length})`, groups);
    }, [groups, dateGroup]);

    const averagePerLastNDays = useMemo(() => {
        const totalDays = 30;
        const lastNDays = groups.slice(0, totalDays);
        return average('Average (last 30 days)', lastNDays);
    }, [groups]);

    const toHTML = async () => {
        const content: string = mealTable(groups);

        // console.info('Content', content);
        // return;

        await saveInternalFile({
            path: PATH_TO_REPORT_FILE_NAME,
            content,
        });

        const options = {
            url: `file://${PATH_TO_REPORT_FILE_NAME}`,
            type: 'text/plain',
            message: `Food Report ${printDate(new Date())}`,
        };

        try {
            await Share.open(options); // Открываем окно для шаринга
        } catch (error) {
            console.error('Share Error', error);
        }
    };

    return (
        <Container>
            <View style={layoutStyles.header}>
                <Text style={typoStyles.heading}>Stats</Text>

                <Button color={primaryColor} title={'HTML'} onPress={toHTML} />
            </View>

            <ScrollView style={{margin: defaultOffset}}>
                <View style={{gap: defaultOffset}}>
                    <FoodCard item={averagePerLastNDays} readonly={true} />

                    <FoodCard item={averagePerGroup} readonly={true} />

                    <Card>
                        <Text style={typoStyles.heading}>Top {totalProducts} products by use</Text>
                        {topProducts.map((food, index) => (
                            <View key={food.id}>
                                <Text>#{index + 1}. {food.name} ({food.totalUse})</Text>
                            </View>
                        ))}
                    </Card>
                </View>
            </ScrollView>

            <View style={layoutStyles.footer}>
                <View style={layoutStyles.row}>
                    <Button
                        color={primaryColor}
                        title={'Meal List'}
                        onPress={() => navigation.navigate('MealList')}
                    />

                    <Button
                        color={primaryColor}
                        title={'Food List'}
                        onPress={() => navigation.navigate('FoodList', {})}
                    />
                </View>

                <View style={layoutStyles.spacer} />
                <View style={layoutStyles.row}>
                    <Button
                        color={primaryColor}
                        title={'Settings'}
                        onPress={() => navigation.navigate('Settings')}
                    />
                </View>
            </View>
        </Container>
    );
}
