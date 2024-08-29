import React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  Pressable,
} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import type { BackgroundColorOption } from './button.type';
import { getBackgroundColor, hexToRgba } from './helpers';

export type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
  backgroundColorOption?: BackgroundColorOption;
  animated?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  backgroundColorOption,
  animated = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (animated) {
      scale.value = withTiming(0.95, {
        duration: 150,
        easing: Easing.out(Easing.quad),
      });
    }
  };

  const handlePressOut = () => {
    if (animated) {
      scale.value = withTiming(1, {
        duration: 150,
        easing: Easing.out(Easing.quad),
      });
    }
  };

  const backgroundColor = getBackgroundColor(backgroundColorOption);
  const borderColor = getBackgroundColor(backgroundColorOption);

  // const gradientColors = backgroundColorOption?.type === 'gradient'
  //   ? gradientColorsMap[backgroundColorOption.gradientColors]
  //   : undefined;

  const defaultStyle: StyleProp<ViewStyle> = {};

  const combinedStyle = [defaultStyle, style];

  const renderButtonContent = () =>
    loading ? (
      <ActivityIndicator
        size="small"
        color={getTextColor(backgroundColorOption, backgroundColor)}
      />
    ) : (
      <Text
        style={[
          styles.text,
          textStyle,
          { color: getTextColor(backgroundColorOption, backgroundColor) },
        ]}
      >
        {title}
      </Text>
    );

  const getTextColor = (
    option: BackgroundColorOption | undefined,
    color: string | undefined
  ): ColorValue => {
    if (
      option?.variant === 'soft' ||
      option?.variant === 'outline' ||
      option?.variant === 'surface'
    ) {
      return hexToRgba(color ?? '#e93d82', 1);
    }
    return '#fff';
  };

  return (
    <Pressable
      style={[disabled && styles.disabledButton]}
      onPress={!disabled && !loading ? onPress : undefined}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[animatedStyle, combinedStyle]}>
        <View
          style={[
            styles.contentContainer,
            getBackgroundStyle(
              backgroundColorOption,
              borderColor,
              backgroundColor
            ),
            combinedStyle,
          ]}
        >
          {renderButtonContent()}
        </View>

        {/* {gradientColors ? (
          <LinearGradient colors={gradientColors} style={styles.gradient}>
            <View style={styles.contentContainer}>
              {renderButtonContent()}
            </View>
          </LinearGradient>
        ) : (
          <View
            style={[
              styles.contentContainer,
              getBackgroundStyle(backgroundColorOption, borderColor, backgroundColor),
              combinedStyle,
            ]}
          >
            {renderButtonContent()}
          </View>
        )} */}
      </Animated.View>
    </Pressable>
  );
};

const getBackgroundStyle = (
  option: BackgroundColorOption | undefined,
  borderColor: string | undefined,
  backgroundColor: string | undefined
): StyleProp<ViewStyle> => {
  switch (option?.variant) {
    case 'solid':
      return { backgroundColor: hexToRgba(backgroundColor ?? '#e93d82', 1) };
    case 'outline':
      return { borderColor: borderColor ?? '#e93d82', borderWidth: 1 };
    case 'soft':
      return { backgroundColor: hexToRgba(backgroundColor ?? '#e93d82', 0.1) };
    case 'surface':
      return {
        backgroundColor: hexToRgba(backgroundColor ?? '#e93d82', 0.1),
        borderColor: borderColor ?? '#e93d82',
        borderWidth: 1,
        elevation: 10,
      };
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  gradient: {
    borderRadius: 5,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Button };
