import React, { PropsWithChildren } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { defaultOffset } from '../styles/variables.tsx';

type Props = PropsWithChildren<{
    children?: React.ReactNode;
    out?: boolean;
}>;

export function Card({
                         children,
                         out,
                     }: Props): React.JSX.Element {
    const colorScheme = useColorScheme();

    const container = {
        padding: defaultOffset,
        gap: defaultOffset,
    };

    const cardStyles = StyleSheet.create({
        container: {
            ...container,
            borderRadius: 4,
            backgroundColor: colorScheme === 'dark' ? '#333' : '#e6e6e6',
        },
        containerOut: container,
    });

    return (
        <View style={out ? cardStyles.containerOut : cardStyles.container}>
            {children}
        </View>
    );
}
