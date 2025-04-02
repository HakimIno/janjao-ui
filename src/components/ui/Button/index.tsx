import React, { memo, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  View,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// Types
type ButtonVariant =
  | 'solid'
  | 'faded'
  | 'bordered'
  | 'light'
  | 'flat'
  | 'ghost'
  | 'shadow';
type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  isIconOnly?: boolean;
  rounded?: boolean;
  shadow?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

// Button Component
const Button: React.FC<ButtonProps> = memo(
  ({
    title,
    onPress,
    variant = 'solid',
    size = 'medium',
    color = '#007AFF',
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
    isIconOnly = false,
    rounded = false,
    shadow = false,
    style,
    textStyle,
  }) => {
    // Animation
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    // Handlers
    const handlePressIn = useCallback(() => {
      scale.value = withTiming(0.97, { duration: 100, easing: Easing.ease });
    }, [scale]);

    const handlePressOut = useCallback(() => {
      scale.value = withTiming(1, { duration: 100, easing: Easing.ease });
    }, [scale]);

    // Style Generators
    const getSizeStyles = useCallback((): ViewStyle => {
      if (isIconOnly) {
        switch (size) {
          case 'small':
            return { width: 36, height: 36, padding: 0, minHeight: 36 };
          case 'large':
            return { width: 52, height: 52, padding: 0, minHeight: 52 };
          default:
            return { width: 44, height: 44, padding: 0, minHeight: 44 };
        }
      }

      switch (size) {
        case 'small':
          return { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 };
        case 'large':
          return { paddingVertical: 14, paddingHorizontal: 24, minHeight: 52 };
        default:
          return { paddingVertical: 10, paddingHorizontal: 20, minHeight: 44 };
      }
    }, [size, isIconOnly]);

    const getVariantStyles = useCallback((): ViewStyle => {
      const baseColor = disabled ? '#999999' : color;
      switch (variant) {
        case 'solid':
          return {
            backgroundColor: baseColor,
            borderColor: 'transparent',
          };
        case 'faded':
          return {
            backgroundColor: `${baseColor}80`,
            borderColor: 'transparent',
          };
        case 'bordered':
          return {
            backgroundColor: 'transparent',
            borderWidth: 1.5,
            borderColor: baseColor,
          };
        case 'light':
          return {
            backgroundColor: `${baseColor}15`,
            borderColor: 'transparent',
          };
        case 'flat':
          return {
            backgroundColor: baseColor,
            borderColor: 'transparent',
            shadowOpacity: 0,
            elevation: 0,
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          };
        case 'shadow':
          return {
            backgroundColor: baseColor,
            borderColor: 'transparent',
            shadowColor: baseColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          };
        default:
          return {};
      }
    }, [variant, color, disabled]);

    const getTextColor = useCallback(() => {
      if (disabled) return '#FFFFFF99';
      return ['solid', 'faded', 'flat', 'shadow'].includes(variant)
        ? '#FFFFFF'
        : color;
    }, [variant, color, disabled]);

    // Combined Styles
    const buttonStyles: ViewStyle[] = [
      styles.button,
      getSizeStyles(),
      getVariantStyles(),
      fullWidth ? styles.fullWidth : {},
      rounded ? styles.rounded : {},
      variant === 'shadow' ? {} : shadow ? styles.shadow : {}, // Don't apply default shadow if variant is 'shadow'
      disabled ? styles.disabled : {},
      isIconOnly && rounded ? { borderRadius: 999 } : {},
      style || {},
    ];

    // Content
    const content = (
      <View style={styles.content}>
        {icon && !loading && (
          <View style={[styles.icon, isIconOnly ? styles.iconOnly : {}]}>
            {icon}
          </View>
        )}
        {loading ? (
          <ActivityIndicator size="small" color={getTextColor()} />
        ) : (
          !isIconOnly && (
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
              {title}
            </Text>
          )
        )}
      </View>
    );

    // Render
    return (
      <Pressable
        onPress={disabled || loading ? undefined : onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // เพิ่ม touch area
      >
        <Animated.View style={[animatedStyle]}>
          <View style={buttonStyles}>{content}</View>
        </Animated.View>
      </Pressable>
    );
  }
);

// Styles
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.6,
  },
  rounded: {
    borderRadius: 999,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  icon: {
    marginRight: 8,
  },
  iconOnly: {
    marginRight: 0,
  },
});

Button.displayName = 'Button';

export { Button };
