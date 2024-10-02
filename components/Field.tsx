import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formStyles } from '../styles/form.tsx';

type SectionProps = PropsWithChildren<{
    children: React.ReactNode;
    label: string;
    errors?: string;
    touched?: boolean;
}>;

export function Field({
                          children,
                          label,
                          errors,
                          touched
                      }: SectionProps): React.JSX.Element {
    return (
        <View>
            <Text>{label}</Text>
            {children}
            {touched && errors ? (
                <Text style={formStyles.error}>{errors}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({});
