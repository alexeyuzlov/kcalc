import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './features/store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { MealList } from './components/MealList.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FoodEdit } from './components/FoodEdit.tsx';
import { layoutStyles } from './styles/layout.tsx';
import { RootStackParamList } from './routes.tsx';
import { MealEdit } from './components/MealEdit.tsx';
import { FoodList } from './components/FoodList.tsx';
import { Stats } from './components/Stats.tsx';
import { Settings } from './components/Settings.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaView style={layoutStyles.container}>
                    <StatusBar />

                    <NavigationContainer>
                        <Stack.Navigator initialRouteName={'MealList'}>
                            <Stack.Screen
                                name="MealList"
                                component={MealList}
                                options={{headerShown: false}}
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
                            <Stack.Screen
                                name="Stats"
                                component={Stats}
                                options={{headerShown: false}}
                            />
                            <Stack.Screen
                                name="Settings"
                                component={Settings}
                                options={{headerShown: false}}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </PersistGate>
        </Provider>

    );
}

export default App;
