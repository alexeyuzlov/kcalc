import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {FoodState} from './domain/food.state.ts';
import {MealState} from './domain/meal.state.ts';
import {NavigationContainer} from '@react-navigation/native';
import {StateContext} from './State.tsx';
import {mockFood} from './domain/mock-food.ts';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CalendarState} from './domain/calendar.state.ts';
import {MealTab} from './components/MealTab.tsx';
import {FoodTab} from './components/FoodTab.tsx';

const Tab = createBottomTabNavigator();

const foodState = new FoodState([
  mockFood[0],
  mockFood[1],
]);
const mealState = new MealState([
  {
    id: '1',
    date: new Date('2021-01-01'),
    weight: 150,
    foodId: mockFood[0].id,
  },
  {
    id: '3',
    date: new Date('2021-01-02'),
    weight: 200,
    foodId: mockFood[0].id,
  },
  {
    id: '4',
    date: new Date('2021-01-02'),
    weight: 200,
    foodId: mockFood[1].id,
  },
], foodState);
const calendarState = new CalendarState(mealState);

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar/>

      <StateContext.Provider value={{foodState, mealState, calendarState}}>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="MealTab" screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="MealTab"
              component={MealTab}
            />
            <Tab.Screen
              name="FoodTab"
              component={FoodTab}
            />
          </Tab.Navigator>
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
