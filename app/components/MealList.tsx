import { Button, Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { MealCard } from './MealCard.tsx';
import { useAppSelector } from '../domain/hooks.ts';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { MealEditCta } from './MealEditCta.tsx';
import { DateGroup, dateGroups } from '../domain/date.ts';
import { MealGroup, mealGroups } from '../domain/meal-groups.ts';
import { defaultOffset, primaryColor } from '../styles/variables.tsx';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes.tsx';
import { food, meal } from '../features/store.ts';
import { Select } from './Select.tsx';
import { ID } from '../domain/id.ts';
import { Number } from './Number.tsx';
import { FoodInfo } from './FoodInfo.tsx';
import { Card } from './Card.tsx';
import { Container } from './Container.tsx';
import { Input } from './Input.tsx';

type Props = NativeStackScreenProps<RootStackParamList, 'MealList'>;

export function MealList({navigation}: Props): React.JSX.Element {
    const mealState = useAppSelector(meal);
    const foodState = useAppSelector(food);

    const [search, setSearch] = useState<string>('');
    const [dateGroup, setDateGroup] = useState<DateGroup>('day');
    const [visible, setVisible] = useState<Record<ID, boolean>>({});

    const groups = useMemo(() => {
        return mealGroups(mealState, foodState, dateGroup);
    }, [mealState, foodState, dateGroup]);

    const filteredGroups: MealGroup[] = useMemo(() => {
        if (!search) {
            return groups;
        }

        const text = search.toLowerCase();

        return groups.reduce((acc, group) => {
            const data = group.data.filter(m => {
                if (m.name?.toLowerCase().includes(text)) {
                    return true;
                }

                return m.items.some(item => {
                    return item.food?.name.toLowerCase().includes(text) ?? false;
                });
            });

            if (data.length) {
                acc.push({
                    ...group,
                    data,
                });
            }

            return acc;
        }, [] as MealGroup[]);
    }, [groups, search]);

    useEffect(() => {
        setSearch('');
    }, [mealState]);

    const toggleVisible = (id: ID) => {
        setVisible({
            ...visible,
            [id]: !visible[id],
        });
    };

    useEffect(() => {
        if (!filteredGroups.length) {
            return;
        }

        if (!search) {
            setVisible({
                [filteredGroups[0].rangeAsString]: true,
            });
        } else {
            const ids = filteredGroups.map(group => group.rangeAsString);
            setVisible(ids.reduce((acc, id) => ({...acc, [id]: true}), {}));
        }
    }, [search, filteredGroups]);

    return (
        <Container>
            <View style={layoutStyles.header}>
                <Text style={typoStyles.heading}>Meal List</Text>
                <MealEditCta />
            </View>

            <View style={{...layoutStyles.row, margin: defaultOffset}}>
                <Input
                    style={{flex: 3}}
                    placeholder="Search by meal name"
                    value={search}
                    onChangeText={setSearch}
                />

                <View style={{flex: 2}}>
                    <Select
                        value={dateGroup}
                        onChange={setDateGroup}
                        items={dateGroups}
                    />
                </View>
            </View>

            <SectionList
                sections={filteredGroups}
                keyExtractor={item => item.id}
                stickySectionHeadersEnabled={true}
                contentContainerStyle={{marginBottom: 100}}
                renderSectionHeader={data => (
                    <Card>
                        <View style={{...layoutStyles.row, alignItems: 'flex-start'}}>
                            <Pressable
                                style={layoutStyles.rowText}
                                onPress={() => toggleVisible(data.section.rangeAsString)}
                            >
                                <Text style={styles.sectionHeading}>
                                    {data.section.rangeAsString}
                                </Text>
                            </Pressable>
                            <View style={layoutStyles.spacer} />
                            <Number special={true} value={data.section.summary.kcal}>kcal</Number>
                        </View>

                        <FoodInfo item={data.section.summary} />
                    </Card>
                )}
                renderItem={section => {
                    if (visible[section.section.rangeAsString]) {
                        return <MealCard item={section.item} />;
                    }

                    return null;
                }}
            />
            <View style={layoutStyles.footer}>
                <View style={layoutStyles.row}>
                    <Button
                        color={primaryColor}
                        title={'Food List'}
                        onPress={() => navigation.navigate('FoodList', {})}
                    />

                    <Button
                        color={primaryColor}
                        title={'Stats'}
                        onPress={() => navigation.navigate('Stats')}
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

const styles = StyleSheet.create({
    sectionHeading: {
        ...typoStyles.headingPrimary,
        fontSize: 16,
    },
    sectionFooter: {
        marginBottom: defaultOffset * 2,
    },
    list: {
        flex: 1,
        margin: defaultOffset,
    },
});
