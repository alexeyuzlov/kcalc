import React, { PropsWithChildren, useMemo } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { defaultOffset } from '../styles/variables.tsx';

type Props = PropsWithChildren<{
    items: {heading: string; value: any}[];
    value: any;
    onChange: (value: any) => void;
}>;

export function Select({
                           items,
                           value,
                           onChange,
                       }: Props): React.JSX.Element {
    const prepared = useMemo(() => {
        return items.map((item) => ({
            label: item.heading,
            value: item.value,
        }));
    }, [items]);

    const colorScheme = useColorScheme();

    const formStyles = StyleSheet.create({
        select: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
            borderRadius: 4,
            paddingHorizontal: defaultOffset / 2,
            justifyContent: 'center',
            padding: 0,
        },
    });

    return (
        <View style={formStyles.select}>
            <RNPickerSelect
                darkTheme={colorScheme === 'dark'}
                value={value}
                onValueChange={onChange}
                items={prepared}
            />
        </View>
    );
}
