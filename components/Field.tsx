import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formStyles } from '../styles/form.tsx';

type SectionProps = PropsWithChildren<{
    label: string;
    errors?: string
    children: React.ReactNode;
}>;

export function Field({
                          label,
                          errors,
                          children
                      }: SectionProps): React.JSX.Element {
    return (
        <View>
            <Text>{label}</Text>
            {children}
            {errors ? (
                <Text style={formStyles.error}>{errors}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({});
