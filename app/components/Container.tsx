import React, { PropsWithChildren } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

type Props = PropsWithChildren<{
    children?: React.ReactNode;
}>;

export function Container({
                              children,
                          }: Props): React.JSX.Element {
    const colorScheme = useColorScheme();

    const containerStyles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: colorScheme === 'dark' ? '#111' : '#eee',
        },
    });

    return (
        <View style={containerStyles.container}>
            {children}
        </View>
    );
}
