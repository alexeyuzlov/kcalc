import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formStyles } from '../styles/form.tsx';
import { FormikErrors } from 'formik';

type SectionProps = PropsWithChildren<{
    label: string;
    name: string;
    errors: FormikErrors<any>
    children: React.ReactNode;
}>;

export function Field({
                          label,
                          name,
                          errors,
                          children
                      }: SectionProps): React.JSX.Element {
    return (
        <View>
            <Text>{label}</Text>
            {children}
            {errors[name] ? (
                <Text style={formStyles.error}>{errors[name]}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({});
