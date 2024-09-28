import {Text} from 'react-native';
import React, {PropsWithChildren} from 'react';

type SectionProps = PropsWithChildren<{
  value: number;
}>;

export function Number({value}: SectionProps): React.JSX.Element {
  const prepared = value.toFixed(2);
  return <Text>{prepared}</Text>;
}
