import React from 'react';
import { StyleSheet, TextInput, useColorScheme } from 'react-native';
import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';
import { defaultOffset } from '../styles/variables.tsx';

export function Input(props: TextInputProps): React.JSX.Element {
    const colorScheme = useColorScheme();

    const formStyles = StyleSheet.create({
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
            borderRadius: 4,
            paddingHorizontal: defaultOffset,
        },
    });

    return (
        <TextInput {...props} style={[props.style, formStyles.input]} />
    );
}
