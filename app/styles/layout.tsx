import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { borderColor, defaultOffset } from './variables.tsx';

const row: ViewStyle | TextStyle | ImageStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: defaultOffset,
};

export const layoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    spacer: {
        flex: 1,
    },
    row,
    rowText: {
        flexShrink: 1,
    },
    header: {
        ...row,
        padding: defaultOffset,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
    },
    footer: {
        ...row,
        padding: defaultOffset,
        borderTopColor: borderColor,
        borderTopWidth: 1,
    },
});
