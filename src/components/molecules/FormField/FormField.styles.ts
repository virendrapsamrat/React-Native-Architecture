import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export const formFieldStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  error: {
    color: Colors.error,
    marginTop: 4,
  },
  input: {
    borderColor: Colors.border,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: {
    marginBottom: 6,
  },
});
