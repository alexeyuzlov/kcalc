import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {FoodState} from './domain/food.state.ts';
import {MealState} from './domain/meal.state.ts';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FoodList} from './components/FoodList.tsx';
import {FoodEdit} from './components/FoodEdit.tsx';
import {StateContext} from './State.tsx';
import {mockFood} from './domain/mock-food.ts';
import {MealList} from './components/MealList.tsx';
import {MealEdit} from './components/MealEdit.tsx';

const Stack = createNativeStackNavigator();

const foodState = new FoodState([
  mockFood[0],
  mockFood[1],
]);
const mealState = new MealState([], foodState);

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>

      <StateContext.Provider value={{foodState, mealState}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MealList">
            <Stack.Screen
              name="MealList"
              component={MealList}
              options={{title: 'Meal List'}}
            />
            <Stack.Screen
              name="MealEdit"
              component={MealEdit}
            />
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
        </NavigationContainer>
      </StateContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
