import React, { PropsWithChildren, useMemo } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View } from 'react-native';
import { formStyles } from '../styles/form.tsx';

type SectionProps = PropsWithChildren<{
    items: { heading: string; value: any }[];
    value: any;
    onChange: (value: any) => void;
}>;

export function Select({
                           items,
                           value,
                           onChange,
                       }: SectionProps): React.JSX.Element {
    const prepared = useMemo(() => {
        return items.map((item) => ({
            label: item.heading,
            value: item.value
        }));
    }, [items]);

    return (
        <View style={formStyles.select}>
            <RNPickerSelect
                value={value}
                onValueChange={onChange}
                items={prepared}
            />
        </View>
    );
}
