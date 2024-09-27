/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Food} from './domain/food.state.ts';
import {FoodList} from './components/FoodList.tsx';
import {FoodEdit} from './components/FoodEdit.tsx';
import {mockFood} from './domain/mock-food.ts';

function App(): React.JSX.Element {
  const [foodItems, setFoodItems] = useState<Food[]>(mockFood);
  const isDarkMode = useColorScheme() === 'dark';
  const [foodEditVisible, setFoodEditVisible] = useState(true);
  const [foodListVisible, setFoodListVisible] = useState(false);

  const saveFood = (food: Food) => {
    console.info('Adding new food', food);
    setFoodItems([...foodItems, food]);
    setFoodListVisible(true);
    setFoodEditVisible(false);
  };

  const back = () => {
    setFoodListVisible(false);
    setFoodEditVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {foodEditVisible && <FoodEdit save={saveFood} />}

      {foodListVisible && <FoodList items={foodItems} closeList={back} />}
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
