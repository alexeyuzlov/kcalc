import {Text, View} from 'react-native';
import React, {PropsWithChildren} from 'react';

type SectionProps = PropsWithChildren<{}>;

export function HomeScreen({}: SectionProps): React.JSX.Element {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}
