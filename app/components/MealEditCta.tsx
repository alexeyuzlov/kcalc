import {Button, View} from 'react-native';
import React, {PropsWithChildren, useEffect} from 'react';
import {ID} from '../domain/id.ts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../routes.tsx';

type SectionProps = PropsWithChildren<{
  id?: ID;
  newMealId?: ID;
}>;

export function MealEditCta({id, newMealId}: SectionProps): React.JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const title = id ? 'Edit Meal' : 'Add Meal';

  useEffect(() => {
    if (newMealId) {
      navigation.navigate('MealEdit', {newMealId});
    }
  }, [newMealId, navigation]);

  return (
    <View>
      <Button
        onPress={() => navigation.navigate('MealEdit', {id})}
        title={title}
      />
    </View>
  );
}
