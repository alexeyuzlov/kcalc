import React from 'react';
import {MealList} from './MealList.tsx';
import {MealEdit} from './MealEdit.tsx';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export function MealTab(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MealList"
        component={MealList}
        options={{title: 'Meal List'}}
      />
      <Stack.Screen
        name="MealEdit"
        component={MealEdit}
      />
    </Stack.Navigator>
  );
}
