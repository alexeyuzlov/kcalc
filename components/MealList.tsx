import { SectionList, StyleSheet, Text, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Meal } from '../domain/meal.ts';
import { MealCard } from './MealCard.tsx';
import { MealGroup } from '../domain/meal-groups.ts';
import { SectionListData } from 'react-native/Libraries/Lists/SectionList';
import { Summary } from './Summary.tsx';
import { useAppSelector } from '../domain/hooks.ts';
import { getMealGroups } from '../domain/store.ts';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { MealEditCta } from './MealEditCta.tsx';
import { DateGroup } from '../domain/date.ts';

type SectionProps = PropsWithChildren<{}>;

export function MealList({}: SectionProps): React.JSX.Element {
    const dateGroup: DateGroup = 'day';

    const groups: SectionListData<Meal, MealGroup>[] = useAppSelector(getMealGroups(dateGroup));

    return (
        <View style={styles.container}>
            <View style={layoutStyles.header}>
                <Text style={typoStyles.heading}>Meal List</Text>
                <MealEditCta/>
            </View>
            <SectionList
                sections={groups}
                keyExtractor={item => item.id}
                contentContainerStyle={{gap: 8}}
                renderSectionHeader={data => (
                    <Text style={styles.sectionHeading}>
                        {data.section.rangeAsString}
                    </Text>
                )}
                renderItem={({item}) => (
                    <MealCard item={item}/>
                )}
                renderSectionFooter={data => <Summary name={`${dateGroup} summary`} items={data.section.data}/>}
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
