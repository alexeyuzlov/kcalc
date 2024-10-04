import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { MealList } from './components/MealList.tsx';

function App(): React.JSX.Element {
  return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <MealList/>
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
