import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { PropsWithChildren, useRef } from 'react';
import { FoodCard } from './FoodCard.tsx';
import { formStyles } from '../styles/form.tsx';
import { useAppSelector } from '../domain/hooks.ts';
import { food } from '../domain/store.ts';
import { ID } from '../domain/id.ts';
import { FoodEditCta } from './FoodEditCta.tsx';
import { layoutStyles } from '../styles/layout.tsx';
import { typoStyles } from '../styles/typo.tsx';

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
    const items = useAppSelector(food);

    const searchRef = useRef<TextInput>(null);

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

            <TextInput ref={searchRef} style={styles.search} placeholder="Search"/>

            <FlatList
                style={styles.list}
                data={items}
                keyExtractor={item => item.id}
                contentContainerStyle={{gap: 8}}
                renderItem={({item}) => (
                    <FoodCard
                        item={item}
                        selectable={selectable}
                        selected={selectedIds ? selectedIds.includes(item.id) : false}
                        select={() => prepareSelectedIds(item)}
                    />
                )}
            />

            <View style={formStyles.button}>
                <Button title={'Select ' + selectedIds.length} onPress={select}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        gap: 8,
        margin: 8,
    },
    search: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 8,
        borderRadius: 4,
    },
});
