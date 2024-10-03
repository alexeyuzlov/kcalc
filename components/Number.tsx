import { Text } from 'react-native';
import React, { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  value: number;
}>;

export function Number({value}: SectionProps): React.JSX.Element {
  let prepared = (value).toFixed(2);

  if (prepared.length > 3 + 3) {
    prepared = `${prepared.slice(0, -3 - 3)}K`;
  }

  if (prepared.length > 6 + 3) {
    prepared = `${prepared.slice(0, -6 - 3)}M`;
  }

  return <Text>{prepared}</Text>;
}
