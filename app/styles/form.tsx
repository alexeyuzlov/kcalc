import {StyleSheet} from 'react-native';
import { dangerColor } from './variables.tsx';

const input = {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 4,
}

export const formStyles = StyleSheet.create({
  form: {
    gap: 10,
    margin: 10,
  },
  input,
  search: {
    ...input,
    margin: 8,
  },
  select: {
    ...input,
    justifyContent: 'center',
    padding: 0,
  },
  button: {
    padding: 10,
    borderColor: 'gray',
    borderTopWidth: 1,
  },
  error: {
    color: dangerColor
  }
});
