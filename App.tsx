import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {FoodState, FoodType} from './domain/food.state.ts';
import {MealState} from './domain/meal.state.ts';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FoodList} from './components/FoodList.tsx';
import {FoodEdit} from './components/FoodEdit.tsx';
import {StateContext} from './State.tsx';

const Stack = createNativeStackNavigator();

const foodState = new FoodState([
  {
    id: '1',
    name: 'Chicken breast',
    weight: 100,
    type: FoodType.Default,
    kcal: 165,
    protein: 31,
    fat: 3.6,
    carbs: 121,
  },
]);
const mealState = new MealState([], foodState);

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>

      <StateContext.Provider value={{foodState, mealState}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="FoodList">
            <Stack.Screen
              name="FoodList"
              component={FoodList}
              options={{title: 'Food List'}}
            />
            <Stack.Screen
              name="FoodEdit"
              component={FoodEdit}
              options={({ route }) => ({ title: route.params?.title })}
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
