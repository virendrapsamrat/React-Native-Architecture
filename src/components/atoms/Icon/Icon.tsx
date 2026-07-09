import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { type LucideIcon } from 'lucide-react-native';
import * as LucideIcons from 'lucide-react-native';
import { useTheme } from '@/theme/ThemeProvider';

const EMOJI_MAP: Record<string, keyof typeof LucideIcons> = {
  '🔍': 'Search',
  '🎚️': 'SlidersHorizontal',
  '🏠': 'Home',
  '👤': 'User',
  '⚙️': 'Settings',
  '❓': 'CircleHelp',
};

const STRING_MAP: Record<string, keyof typeof LucideIcons> = {
  'search': 'Search',
  'filter': 'SlidersHorizontal',
  'options': 'SlidersHorizontal',
  'home': 'Home',
  'profile': 'User',
  'person': 'User',
  'settings': 'Settings',
  'help': 'CircleHelp',
  'question': 'CircleHelp',
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  style,
  strokeWidth = 2,
}) => {
  const { theme } = useTheme();

  // Resolve the Lucide icon name from emoji or string mappings
  let lucideName: keyof typeof LucideIcons | undefined;

  if (name in EMOJI_MAP) {
    lucideName = EMOJI_MAP[name];
  } else if (name.toLowerCase() in STRING_MAP) {
    lucideName = STRING_MAP[name.toLowerCase()];
  } else {
    // If the name is already a valid PascalCase Lucide icon name, use it.
    // Otherwise try converting kebab-case/snake-case/lowercase to PascalCase.
    const resolvedName = (name.charAt(0).toUpperCase() + name.slice(1)) as keyof typeof LucideIcons;
    if (resolvedName in LucideIcons) {
      lucideName = resolvedName;
    }
  }

  // Fallback to CircleHelp if no matching icon is found
  const SelectedIcon = (lucideName ? LucideIcons[lucideName] : LucideIcons.CircleHelp) as LucideIcon;

  return (
    <SelectedIcon
      size={size}
      color={color ?? theme.colors.text}
      style={style}
      strokeWidth={strokeWidth}
    />
  );
};

