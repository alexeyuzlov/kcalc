import {Button, View} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {ID} from '../domain/id.ts';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../routes.tsx';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SectionProps = PropsWithChildren<{
  id?: ID;
}>;

export function FoodEditCta({id}: SectionProps): React.JSX.Element {
    const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const title = id ? 'Edit Food' : 'Add Food';

    return (
      <View>
        <Button
          onPress={() => navigation.navigate('FoodEdit', {id})}
          title={title}
        />
      </View>
    );
}

