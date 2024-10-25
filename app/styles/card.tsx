import { StyleSheet } from 'react-native';
import { defaultOffset } from './variables.tsx';

export const cardStyles = StyleSheet.create({
    container: {
        padding: defaultOffset,
        backgroundColor: '#e6e6e6',
        borderRadius: 4,
        gap: defaultOffset,
    },
    containerOut: {
        padding: defaultOffset,
        gap: defaultOffset
    }
});
