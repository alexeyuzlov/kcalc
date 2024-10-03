import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ErrorMessage } from 'formik';
import { formStyles } from '../styles/form.tsx';

type SectionProps = PropsWithChildren<{
    children: React.ReactNode;
    label?: string;
    name?: string;
}>;

export function Field({
                          children,
                          label,
                          name
                      }: SectionProps): React.JSX.Element {
    return (
        <View>
            {label && <Text>{label}</Text>}
            {children}
            {name &&
                <ErrorMessage name={name} render={(value: any) => {
                    if (typeof value !== 'string') {
                        return null;
                    }

                    return <Text style={formStyles.error}>{value}</Text>;
                }}/>
            }
        </View>
    );
}

const styles = StyleSheet.create({});
