import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { buttonStyles } from './Button.styles';
import { Colors } from '@/constants/Colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  testID,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        buttonStyles.base,
        buttonStyles[variant],
        buttonStyles[size],
        isDisabled && buttonStyles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.textLight} />
      ) : (
        <Text
          style={[
            buttonStyles.text,
            variant === 'outline' || variant === 'ghost'
              ? buttonStyles.outlineText
              : buttonStyles.primaryText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};
