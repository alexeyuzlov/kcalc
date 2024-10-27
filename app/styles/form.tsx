import { StyleSheet } from 'react-native';
import { defaultOffset, secondaryColor } from './variables.tsx';

export const formStyles = StyleSheet.create({
    form: {
        gap: defaultOffset,
        margin: defaultOffset,
    },
    error: {
        color: secondaryColor,
    },
});
