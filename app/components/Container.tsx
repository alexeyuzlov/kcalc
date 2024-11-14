import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppSelector } from '../domain/hooks.ts';

type Props = PropsWithChildren<{
    children?: React.ReactNode;
}>;

export function Container({
                              children,
                          }: Props): React.JSX.Element {
    const theme = useAppSelector(state => state.settings.theme);

    const containerStyles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: theme === 'dark' ? '#111' : '#eee',
        },
    });

    return (
        <View style={containerStyles.container}>
            {children}
        </View>
    );
}
