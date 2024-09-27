import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {Food, FoodType} from '../domain/food.state.ts';
import {generateId} from '../domain/id.ts';

type SectionProps = PropsWithChildren<{
  save: (food: Food) => void;
}>;

export function FoodEdit({save}: SectionProps): React.JSX.Element {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [type, setType] = useState(FoodType.Default);
  const [kcal, setKcal] = useState('');
  const [protein, setProtein] = useState('');
  const [fat, setFat] = useState('');
  const [carbs, setCarbs] = useState('');

  const types = Object.keys(FoodType).map(key => {
    // @ts-ignore
    return {label: key, value: FoodType[key]};
  });

  const handleSubmit = () => {
    const newFood: Food = {
      id: generateId(),
      name: name,
      weight: parseInt(weight, 10),
      type: type,
      kcal: parseInt(kcal, 10),
      protein: parseInt(protein, 10),
      fat: parseInt(fat, 10),
      carbs: parseInt(carbs, 10),
    };

    // TODO add to database
    console.info('Adding new food', newFood);
    save(newFood);
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
  },
  button: {
    padding: 10,
    borderColor: 'gray',
    borderTopWidth: 1,
  },
});
