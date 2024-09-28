import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import {StateContext} from '../State.tsx';
import {Meal} from '../domain/meal.state.ts';
import {formStyles} from '../styles/form.tsx';
import {Food} from '../domain/food.state.ts';
import {FoodCard} from './FoodCard.tsx';

type SectionProps = PropsWithChildren<{
  route: any;
  navigation: any;
}>;

type MealForm = Partial<Meal>;

const defaultMeal: MealForm = {};

function toMealForm(meal: Meal): MealForm {
  return {
    ...meal,
  };
}

export function MealEdit({navigation, route}: SectionProps): React.JSX.Element {
  const state = useContext(StateContext);

  const exist = state.mealState.find(route.params?.id);
  const [meal] = useState(exist ? toMealForm(exist) : defaultMeal);

  const [weight, setWeight] = useState(meal.weight?.toString());
  const [weightAsNumber, setWeightAsNumber] = useState(0);
  const [foodId, setFoodId] = useState(meal.foodId);
  const [food, setFood] = useState<Food | undefined>();

  useEffect(() => {
    setWeightAsNumber(parseFloat(weight!) || 0);
  }, [weight]);

  useEffect(() => {
    if (route.params?.foodId) {
      setFoodId(route.params?.foodId);
    }
  }, [route.params?.foodId, state.foodState]);

  useEffect(() => {
    if (foodId) {
      const food = state.foodState.find(foodId);
      setFood(food);

      if (weightAsNumber === 0) {
        setWeight(food?.weight?.toString());
      }
    }
  }, [foodId, state.foodState]);

  useEffect(() => {
    const title = route.params?.id ? 'Edit Meal' : 'Add Meal';
    navigation.setOptions({title});
  }, [navigation, route.params?.id]);

  const handleSubmit = () => {
    const mealEdit = {
      weight: weightAsNumber,
      foodId: foodId!,
    };

    if (meal.id) {
      state.mealState.update(meal.id, mealEdit);
      // TODO add to database
      navigation.navigate('MealList', {update: true});
    } else {
      state.mealState.add(mealEdit);
      // TODO add to database
      navigation.navigate('MealList', {update: true});
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={formStyles.form}>
          <View>
            <Text>Weight</Text>
            <TextInput
              style={formStyles.input}
              inputMode={'numeric'}
              value={weight}
              onChangeText={setWeight}
              placeholder={'0'}
            />
          </View>

          <View>
            {food && (
              <FoodCard
                item={food}
                navigation={navigation}
                overrideWeight={weightAsNumber}
              />
            )}
          </View>

          <View>
            {!food && (<Text>Food</Text>)}
            <Button
              title={'Select Food'}
              onPress={() => navigation.navigate('FoodList', {select: true})}
            />
          </View>
        </View>
      </ScrollView>

      <View style={formStyles.button}>
        <Button title={'Save'} onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
