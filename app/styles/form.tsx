import { StyleSheet } from 'react-native';
import { dangerColor, defaultOffset } from './variables.tsx';

const input = {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: defaultOffset,
};

export const formStyles = StyleSheet.create({
    form: {
        gap: defaultOffset,
        margin: defaultOffset,
    },
    input,
    search: {
        ...input,
        margin: defaultOffset,
    },
    button: {
        backgroundColor: 'red',
        margin: defaultOffset,
        color: 'red',
    },
    select: {
        ...input,
        justifyContent: 'center',
        padding: 0,
    },
    error: {
        color: dangerColor
    }
});
