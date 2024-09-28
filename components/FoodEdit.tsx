import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {PropsWithChildren, useContext, useEffect, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Food, FoodType} from '../domain/food.state.ts';
import {StateContext} from '../State.tsx';
import {formStyles} from '../styles/form.tsx';

type SectionProps = PropsWithChildren<{
  route: any;
  navigation: any;
}>;

interface FoodForm {
  id?: string;
  name: string;
  weight: string;
  type: FoodType;
  kcal: string;
  protein: string;
  fat: string;
  carbs: string;
}

const defaultFood: FoodForm = {
  name: '',
  weight: '',
  type: FoodType.Default,
  kcal: '',
  protein: '',
  fat: '',
  carbs: '',
};

function toFoodForm(food: Food): FoodForm {
  return {
    ...food,
    weight: food.weight.toString(),
    kcal: food.kcal.toString(),
    protein: food.protein.toString(),
    fat: food.fat.toString(),
    carbs: food.carbs.toString(),
  };
}

const types = Object.keys(FoodType).map(key => {
  // @ts-ignore
  return {label: key, value: FoodType[key]};
});

export function FoodEdit({navigation, route}: SectionProps): React.JSX.Element {
  const state = useContext(StateContext);

  const exist = state.foodState.find(route.params?.id);
  const [food] = useState(exist ? toFoodForm(exist) : defaultFood);

  useEffect(() => {
    const title = food.id ? 'Edit Food' : 'Add Food';
    navigation.setOptions({ title });
  }, [navigation, food]);

  const [name, setName] = useState(food.name);
  const [weight, setWeight] = useState(food.weight);
  const [type, setType] = useState(food.type);
  const [kcal, setKcal] = useState(food.kcal);
  const [protein, setProtein] = useState(food.protein);
  const [fat, setFat] = useState(food.fat);
  const [carbs, setCarbs] = useState(food.carbs);

  const handleSubmit = () => {
    const foodEdit = {
      name,
      weight: parseFloat(weight) || 0,
      type,
      kcal: parseFloat(kcal),
      protein: parseFloat(protein) || 0,
      fat: parseFloat(fat) || 0,
      carbs: parseFloat(carbs) || 0,
    };

    if (food.id) {
      state.foodState.update(food.id, foodEdit);
      // TODO add to database
      navigation.navigate('FoodList', {update: true});
    } else {
      state.foodState.add(foodEdit);
      // TODO add to database
      navigation.navigate('FoodList', {update: true});
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={formStyles.form}>
          <View>
            <Text>Name</Text>
            <TextInput
              style={formStyles.input}
              inputMode={'text'}
              value={name}
              onChangeText={setName}
            />
          </View>

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
            <Text>Type</Text>
            <View style={formStyles.input}>
              <RNPickerSelect
                value={type}
                onValueChange={value => setType(value)}
                items={types}
              />
            </View>
          </View>

          <View>
            <Text>Kcal</Text>
            <TextInput
              style={formStyles.input}
              inputMode={'numeric'}
              value={kcal}
              onChangeText={setKcal}
              placeholder={'0'}
            />
          </View>

          <View>
            <Text>Protein</Text>
            <TextInput
              style={formStyles.input}
              inputMode={'numeric'}
              value={protein}
              onChangeText={setProtein}
              placeholder={'0'}
            />
          </View>

          <View>
            <Text>Fat</Text>
            <TextInput
              style={formStyles.input}
              inputMode={'numeric'}
              value={fat}
              onChangeText={setFat}
              placeholder={'0'}
            />
          </View>

          <View>
            <Text>Carbs</Text>
            <TextInput
              style={formStyles.input}
              inputMode={'numeric'}
              value={carbs}
              onChangeText={setCarbs}
              placeholder={'0'}
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
