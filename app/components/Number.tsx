import { Text } from 'react-native';
import React, { PropsWithChildren, useMemo } from 'react';
import { typoStyles } from '../styles/typo.tsx';

type Props = PropsWithChildren<{
    value: number;
    children?: React.ReactNode;
    special?: boolean;
}>;

export function Number({value, children, special}: Props): React.JSX.Element {
    const prepared = useMemo(() => {
        return value.toFixed(2);
    }, [value]);

    return (
        <Text style={special ? typoStyles.textSpecial : ''}>
            {prepared}{children ? ' ' + children : ''}
        </Text>
    );
}
