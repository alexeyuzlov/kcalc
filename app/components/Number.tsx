import {Text} from 'react-native';
import React, {PropsWithChildren, useMemo} from 'react';

type SectionProps = PropsWithChildren<{
  value: number;
  children?: React.ReactNode;
}>;

export function Number({value, children}: SectionProps): React.JSX.Element {
  const prepared = useMemo(() => {
    return value.toFixed(2);
  }, [value]);

  return (
    <Text>
      {prepared} {children}
    </Text>
  );
}
