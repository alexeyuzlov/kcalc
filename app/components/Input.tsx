import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { TextInputProps } from 'react-native/Libraries/Components/TextInput/TextInput';
import { defaultOffset } from '../styles/variables.tsx';
import { useAppSelector } from '../domain/hooks.ts';

export function Input(props: TextInputProps): React.JSX.Element {
    const theme = useAppSelector(state => state.settings.theme);

    const formStyles = StyleSheet.create({
        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
            borderRadius: 4,
            paddingHorizontal: defaultOffset,
        },
    });

    return (
        <TextInput {...props} style={[props.style, formStyles.input]} />
    );
}
