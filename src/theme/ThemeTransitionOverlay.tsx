import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, Mask, Rect } from 'react-native-svg';
import { useTheme, type Theme } from './ThemeProvider';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const getRevealRadius = (width: number, height: number) =>
  Math.ceil(Math.sqrt(width * width + height * height));

export const ThemeTransitionOverlay = () => {
  const { theme } = useTheme();
  const [windowSize, setWindowSize] = useState(Dimensions.get('window'));
  const [previousTheme, setPreviousTheme] = useState<Theme | null>(null);
  const lastTheme = useRef(theme);
  const revealRadius = useMemo(() => new Animated.Value(0), []);
  const maxRadius = getRevealRadius(windowSize.width, windowSize.height);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowSize(window);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (lastTheme.current.mode === theme.mode) return;

    setPreviousTheme(lastTheme.current);
    revealRadius.setValue(0);

    Animated.timing(revealRadius, {
      toValue: maxRadius,
      duration: 1800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setPreviousTheme(null);
      }
    });

    lastTheme.current = theme;
  }, [maxRadius, revealRadius, theme]);

  if (!previousTheme) return null;

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <Svg height={windowSize.height} width={windowSize.width}>
        <Defs>
          <Mask id="theme-reveal-mask">
            <Rect fill="white" height="100%" width="100%" x="0" y="0" />
            <AnimatedCircle
              cx={windowSize.width}
              cy={0}
              fill="black"
              r={revealRadius}
            />
          </Mask>
        </Defs>
        <Rect
          fill={previousTheme.colors.background}
          height="100%"
          mask="url(#theme-reveal-mask)"
          width="100%"
          x="0"
          y="0"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 999,
  },
});
