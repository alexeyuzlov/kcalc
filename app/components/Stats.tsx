import { Button, ScrollView, StyleSheet, Text, View, } from 'react-native';
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
import { DateGroup, printDate } from '../domain/date.ts';
import { FileImport } from './FileImport.tsx';
import { FileExport } from './FileExport.tsx';
import { mealTable } from '../domain/report.ts';
import { PATH_TO_REPORT_FILE_NAME, saveInternalFile } from '../domain/file.ts';
import Share from 'react-native-share';

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
        const result: Food = emptyFood(`Average per ${dateGroup}: ${groups.length}`);

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

    const toHTML = async () => {
        const content: string = mealTable(groups);

        // console.info('Content', content);
        // return;

        await saveInternalFile({
            path: PATH_TO_REPORT_FILE_NAME,
            content
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
        <View style={layoutStyles.container}>
            <View style={layoutStyles.header}>
                <Text style={typoStyles.heading}>Stats</Text>

                <Button title={'HTML'} onPress={toHTML}/>
            </View>

            <ScrollView style={{margin: defaultOffset}}>
                <View style={{gap: defaultOffset}}>
                    <FoodCard item={averagePerGroup} readonly={true}/>

                    <View style={cardStyles.container}>
                        <Text style={typoStyles.heading}>Top 10 products by use</Text>
                        {topProducts.map((food, index) => (
                            <View key={food.id}>
                                <Text>#{index + 1}. {food.name} ({food.totalUse})</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            <View style={layoutStyles.footer}>
                <View style={layoutStyles.row}>
                    <Button
                        title={'Meal List'}
                        onPress={() => navigation.navigate('MealList')}
                    />

                    <Button
                        title={'Food List'}
                        onPress={() => navigation.navigate('FoodList', {})}
                    />
                </View>

                <View style={layoutStyles.spacer}/>
                <View style={layoutStyles.row}>
                    <FileImport/>
                    <FileExport/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
