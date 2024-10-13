import {StyleSheet, Text} from 'react-native';
import React, {PropsWithChildren} from 'react';

type SectionProps = PropsWithChildren<{
  value: number;
}>;

export function Number({value}: SectionProps): React.JSX.Element {
  let prepared = (value).toFixed(2);

  return <Text style={styles.text}>{prepared}</Text>;
}

const styles = StyleSheet.create({
  text: {},
});
