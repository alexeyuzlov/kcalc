import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {persistor, store} from './store.ts';
import {PersistGate} from 'redux-persist/integration/react';
import {MealList} from './components/MealList.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FoodEdit} from './components/FoodEdit.tsx';
import {layoutStyles} from './styles/layout.tsx';
import {RootStackParamList} from './routes.tsx';
import {MealEdit} from './components/MealEdit.tsx';
import {FoodList} from './components/FoodList.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={layoutStyles.container}>
      <StatusBar />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={'MealList'}>
              <Stack.Screen
                name="MealList"
                component={MealList}
                options={{title: 'Meal List', headerShown: false}}
              />
              <Stack.Screen
                name="FoodList"
                component={FoodList}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="FoodEdit"
                component={FoodEdit}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="MealEdit"
                component={MealEdit}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
