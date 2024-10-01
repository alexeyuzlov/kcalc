import {StyleSheet} from 'react-native';

export const formStyles = StyleSheet.create({
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
  select: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 0,
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    borderColor: 'gray',
    borderTopWidth: 1,
  },
  error: {
    color: '#bb0000'
  }
});
