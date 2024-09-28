import React from 'react';
import {FoodList} from './FoodList.tsx';
import {FoodEdit} from './FoodEdit.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function FoodTab(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FoodList"
        component={FoodList}
        options={{title: 'Food List'}}
      />
      <Stack.Screen
        name="FoodEdit"
        component={FoodEdit}
      />
    </Stack.Navigator>
  );
}
