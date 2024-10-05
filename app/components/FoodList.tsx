import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { PropsWithChildren, useState } from 'react';
import { FoodCard } from './FoodCard.tsx';
import { formStyles } from '../styles/form.tsx';
import { useAppSelector } from '../domain/hooks.ts';
import { ID } from '../domain/id.ts';
import { FoodEditCta } from './FoodEditCta.tsx';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';
import { defaultOffset } from '../styles/variables.tsx';

type SectionProps = PropsWithChildren<{
    selectable: boolean;
    selectedIds: Array<ID>;
    setSelectedIds: (ids: Array<ID>) => void;
    select: () => void;
}>;

export function FoodList({
                             selectable,
                             selectedIds,
                             setSelectedIds,
                             select,
                         }: SectionProps): React.JSX.Element {
    const food = useAppSelector((state) => state.food.items);

    const [search, setSearch] = useState<string>('');

    const filteredFood = search
        ? food.filter(m => m.name?.toLowerCase().includes(search.toLowerCase()))
        : food;

    const prepareSelectedIds = (item: { id: ID }) => {
        if (selectedIds && setSelectedIds) {
            if (selectedIds.includes(item.id)) {
                setSelectedIds(selectedIds.filter(id => id !== item.id));
            } else {
                setSelectedIds([...selectedIds, item.id]);
            }
        }
    };

    return (
        <View style={layoutStyles.container}>
            <View style={layoutStyles.header}>
                <Text style={typoStyles.heading}>Food List</Text>
                <FoodEditCta/>
            </View>

            <TextInput
                style={formStyles.search}
                placeholder="Search"
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                style={styles.list}
                data={filteredFood}
                keyExtractor={item => item.id}
                contentContainerStyle={{gap: defaultOffset}}
                renderItem={({item}) => (
                    <FoodCard
                        item={item}
                        selectable={selectable}
                        selected={selectedIds ? selectedIds.includes(item.id) : false}
                        select={() => prepareSelectedIds(item)}
                    />
                )}
            />

            <View style={layoutStyles.footer}>
                <View style={{flex: 1}}>
                    <Button title={'Select ' + selectedIds.length} onPress={select}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        gap: defaultOffset,
        margin: defaultOffset,
    },
});
