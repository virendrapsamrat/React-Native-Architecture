import React, { useEffect, useMemo } from 'react';
import { Animated, ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { profileTemplateStyles } from './ProfileTemplate.styles';

interface ProfileTemplateProps {
  header: React.ReactNode;
  stats?: React.ReactNode;
  children?: React.ReactNode;
}

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
  header,
  stats,
  children,
}) => {
  const { theme } = useTheme();
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(16), []);

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(16);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 90,
        friction: 12,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, theme.mode]);

  return (
    <SafeAreaView
      style={[profileTemplateStyles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView
        contentContainerStyle={profileTemplateStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            profileTemplateStyles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {header}
          {stats}
          {children}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};
