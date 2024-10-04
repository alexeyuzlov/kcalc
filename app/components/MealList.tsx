import { SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Meal, MealForm, toMealForm } from '../domain/meal.ts';
import { MealCard } from './MealCard.tsx';
import { Summary } from './Summary.tsx';
import { useAppSelector } from '../domain/hooks.ts';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { MealEditCta } from './MealEditCta.tsx';
import { DateGroup } from '../domain/date.ts';
import { formStyles } from '../styles/form.tsx';
import { mealGroups } from '../domain/meal-groups.ts';

type SectionProps = PropsWithChildren<{}>;

export function MealList({}: SectionProps): React.JSX.Element {
    const dateGroup: DateGroup = 'day';

    const [search, setSearch] = useState<string>('');

    const meal = useAppSelector(state => state.meal.items);
    const food = useAppSelector(state => state.food.items);

    const filteredMeal = search
        ? meal.filter(m => m.name?.toLowerCase().includes(search.toLowerCase()))
        : meal;

    const groups = mealGroups(filteredMeal, food, dateGroup);

    const [newMeal, setNewMeal] = useState<MealForm>();

    useEffect(() => {
        setSearch('');
        setNewMeal(undefined);
    }, [meal]);

    const copyMeal = (meal: Meal) => {
        const newMeal: MealForm = toMealForm({
            ...meal,
            date: new Date().toISOString()
        });
        delete newMeal.id;

        setSearch('');
        setNewMeal(newMeal);
    };

    return (
        <View style={styles.container}>
            <View style={layoutStyles.header}>
                <Text style={typoStyles.heading}>Meal List</Text>
                <MealEditCta newMeal={newMeal}/>
            </View>

            <TextInput
                style={formStyles.search}
                placeholder="Search by meal name"
                value={search}
                onChangeText={setSearch}
            />

            <SectionList
                sections={groups}
                keyExtractor={item => item.id}
                contentContainerStyle={search ? null : {gap: 8}}
                renderSectionHeader={data =>
                    <Text style={styles.sectionHeading}>
                        {data.section.rangeAsString}
                    </Text>
                }
                renderItem={({item}) => (
                    <MealCard item={item} copy={() => copyMeal(item)}/>
                )}
                renderSectionFooter={data => search
                    ? null
                    : <Summary name={`${dateGroup} summary`} items={data.section.data}/>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    sectionHeading: {
        backgroundColor: '#f0f0f0',
        padding: 8,
    },
    list: {
        flex: 1,
        margin: 10,
    },
});
