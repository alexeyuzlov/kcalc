import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MealTab } from './components/MealTab.tsx';
import { FoodTab } from './components/FoodTab.tsx';
import { Provider } from 'react-redux';
import { persistor, store } from './domain/store.ts';
import { PersistGate } from 'redux-persist/integration/react';

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Tab.Navigator
                  initialRouteName="MealTab"
                  screenOptions={{headerShown: false}}>
                <Tab.Screen name="MealTab" component={MealTab}/>
                <Tab.Screen name="FoodTab" component={FoodTab}/>
              </Tab.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
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
