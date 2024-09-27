import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {PropsWithChildren, useContext, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Food, FoodType} from '../domain/food.state.ts';
import {StateContext} from '../State.tsx';

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

export function FoodEdit({navigation, route}: SectionProps): React.JSX.Element {
  const state = useContext(StateContext);

  const exist = state.foodState.find(route.params?.id);
  const [food] = useState(exist ? toFoodForm(exist) : defaultFood);

  const [name, setName] = useState(food.name);
  const [weight, setWeight] = useState(food.weight);
  const [type, setType] = useState(food.type);
  const [kcal, setKcal] = useState(food.kcal);
  const [protein, setProtein] = useState(food.protein);
  const [fat, setFat] = useState(food.fat);
  const [carbs, setCarbs] = useState(food.carbs);

  const types = Object.keys(FoodType).map(key => {
    // @ts-ignore
    return {label: key, value: FoodType[key]};
  });

  const handleSubmit = () => {
    const foodEdit = {
      name,
      weight: parseFloat(weight),
      type,
      kcal: parseFloat(kcal),
      protein: parseFloat(protein),
      fat: parseFloat(fat),
      carbs: parseFloat(carbs),
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
        <View style={styles.form}>
          <View>
            <Text>Name {name}</Text>
            <TextInput
              style={styles.input}
              inputMode={'text'}
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text>Weight {weight}</Text>
            <TextInput
              style={styles.input}
              inputMode={'numeric'}
              value={weight}
              onChangeText={setWeight}
              placeholder={'0'}
            />
          </View>

          <View>
            <Text>Type {type}</Text>
            <View style={styles.input}>
              <RNPickerSelect
                value={type}
                onValueChange={value => setType(value)}
                items={types}
              />
            </View>
          </View>

          <View>
            <Text>Kcal {kcal}</Text>
            <TextInput
              style={styles.input}
              inputMode={'numeric'}
              value={kcal}
              onChangeText={setKcal}
              placeholder={'0'}
            />
          </View>

          <View>
            <Text>Protein {protein}</Text>
            <TextInput
              style={styles.input}
              inputMode={'numeric'}
              value={protein}
              onChangeText={setProtein}
              placeholder={'0'}
            />
          </View>

          <View>
            <Text>Fat {fat}</Text>
            <TextInput
              style={styles.input}
              inputMode={'numeric'}
              value={fat}
              onChangeText={setFat}
              placeholder={'0'}
            />
          </View>

          <View>
            <Text>Carbs {carbs}</Text>
            <TextInput
              style={styles.input}
              inputMode={'numeric'}
              value={carbs}
              onChangeText={setCarbs}
              placeholder={'0'}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.button}>
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
  form: {
    gap: 10,
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  button: {
    padding: 10,
    borderColor: 'gray',
    borderTopWidth: 1,
  },
});
