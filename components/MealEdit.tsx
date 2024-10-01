import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Meal} from '../domain/meal.ts';
import {formStyles} from '../styles/form.tsx';
import {FoodCard} from './FoodCard.tsx';
import {generateId} from '../domain/id.ts';
import {useAppDispatch, useAppSelector} from '../domain/hooks.ts';
import {addMeal, findMealById, updateMeal} from '../features/mealSlice.tsx';
import {Food, foodWeighted} from '../domain/food.ts';

type SectionProps = PropsWithChildren<{
  route: any;
  navigation: any;
}>;

type MealForm = {
  id?: string;
  weight: string;
  foodId: string;
};

const defaultMeal: MealForm = {
  weight: '',
  foodId: '',
};

function toMealForm(meal: Meal): MealForm {
  return {
    ...meal,
    weight: meal.weight.toString(),
    foodId: meal.foodId,
  };
}

export function MealEdit({navigation, route}: SectionProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const exist = useAppSelector(state => findMealById(state, route.params?.id));
  const meal: MealForm = exist ? toMealForm(exist) : defaultMeal;

  const _food = useAppSelector(state => {
    const foodId = route.params.foodId || meal.foodId;
    return state.food.items.find(f => f.id === foodId);
  });

  const [weight, setWeight] = useState(meal.weight.toString());
  const [foodId, setFoodId] = useState(meal.foodId);

  const [food, setFood] = useState<Food | undefined>();

  const [weightTouched, setWeightTouched] = useState(false);

  useEffect(() => {
    if (!_food) {
      return;
    }

    if (!weightTouched) {
      setWeight(_food.weight.toString());
      setWeightTouched(true);
    }

    setFood(foodWeighted(_food, parseFloat(weight) || 0));
  }, [_food, weight, weightTouched]);

  // skip the screen for new meal, but only if there is no food selected
  // useEffect(() => {
  //   if (!route.params.id && !route.params.foodId) {
  //     navigation.navigate('FoodTab', {
  //       screen: 'FoodList',
  //       params: {select: generateId()},
  //     });
  //   }
  // }, [navigation, route.params?.id, route.params?.foodId]);

  useEffect(() => {
    if (route.params?.foodId) {
      setFoodId(route.params?.foodId);
    }
  }, [route.params?.foodId]);

  useEffect(() => {
    const title = route.params?.id ? 'Edit Meal' : 'Add Meal';
    navigation.setOptions({title});
  }, [route.params?.id, navigation]);

  const changeWeightText = (text: string) => {
    setWeightTouched(true);
    setWeight(text);
  };

  const handleSubmit = () => {
    const mealEdit = {
      weight: parseFloat(weight) || 0,
      foodId: foodId!,
    };

    if (meal.id) {
      dispatch(updateMeal({id: meal.id, body: mealEdit}));
      navigation.navigate('MealList');
    } else {
      dispatch(addMeal(mealEdit));
      navigation.navigate('MealList');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={formStyles.form}>
          <View>
            <Text>Weight {weight}</Text>
            <TextInput
              style={formStyles.input}
              inputMode={'numeric'}
              value={weight}
              onChangeText={changeWeightText}
              placeholder={'0'}
            />
          </View>

          <View>
            {food && (
              <FoodCard item={food} navigation={navigation} readonly={true} />
            )}
          </View>

          <View>
            {!food && <Text>Food</Text>}
            <Button
              title={'Select Food'}
              onPress={() =>
                navigation.navigate('FoodTab', {
                  screen: 'FoodList',
                  params: {select: generateId(), mealId: meal.id},
                })
              }
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
