import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Text } from '../../atoms/Text';
import { useTheme } from '../../../theme/ThemeProvider';
import { formFieldStyles } from './FormField.styles';
import { Colors } from '../../../constants/Colors';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={formFieldStyles.container}>
      <Text variant="label" style={formFieldStyles.label}>
        {label}
      </Text>
      <TextInput
        style={[
          formFieldStyles.input,
          { color: theme.colors.text, borderColor: error ? Colors.error : theme.colors.border },
          style,
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
      {error && (
        <Text variant="caption" style={formFieldStyles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};
