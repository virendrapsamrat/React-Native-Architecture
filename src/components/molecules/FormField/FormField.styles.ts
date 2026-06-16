import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export const formFieldStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  error: {
    marginTop: 4,
    color: Colors.error,
  },
});
