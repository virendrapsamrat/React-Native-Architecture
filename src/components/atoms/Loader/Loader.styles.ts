import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export const loaderStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    backgroundColor: Colors.overlay,
    justifyContent: 'center',
  },
});
