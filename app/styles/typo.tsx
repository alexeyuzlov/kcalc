import { StyleSheet } from 'react-native';
import { secondaryColor } from './variables.tsx';

export const typoStyles = StyleSheet.create({
    heading: {
        fontSize: 16,
    },
    headingPrimary: {
        fontSize: 16,
        color: secondaryColor,
    },
    text: {
        fontSize: 14,
    },
    textSpecial: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});
