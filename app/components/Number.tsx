import {Text} from 'react-native';
import React, {PropsWithChildren, useMemo} from 'react';

type SectionProps = PropsWithChildren<{
  value: number;
}>;

export function Number({value}: SectionProps): React.JSX.Element {
  const prepared = useMemo(() => {
    return value.toFixed(2);
  }, [value]);

  return <Text>{prepared}</Text>;
}
