import {StyleSheet} from 'react-native';
import { dangerColor } from './variables.tsx';


export const typoStyles = StyleSheet.create({
    heading: {
        fontSize: 16,
        color: '#000',
    },
    headingPrimary: {
        fontSize: 16,
        color: dangerColor,
    },
});
