import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  Easing,
  withSequence,
  withDelay,
  useAnimatedProps,
  type SharedValue,
} from 'react-native-reanimated';
import { Svg, Path } from 'react-native-svg';

// Create animated components for SVG
const AnimatedPath = Animated.createAnimatedComponent(Path);

export type CheckboxProps = {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Callback when the checkbox state changes */
  onPress?: (checked: boolean) => void;
  /** Text label to display next to the checkbox */
  label?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Style for the checkbox container */
  containerStyle?: ViewStyle;
  /** Style for the checkbox itself */
  checkboxStyle?: ViewStyle;
  /** Style for the label */
  labelStyle?: TextStyle;
  /** Custom size for the checkbox */
  size?: number;
  /** Color when checked */
  checkedColor?: string;
  /** Color when unchecked */
  uncheckedColor?: string;
  /** Color for the check mark */
  checkMarkColor?: string;
  /** Color for the disabled state */
  disabledColor?: string;
  /** Whether to show the check mark */
  showCheckMark?: boolean;
  /** Optional icon to use as the check mark */
  checkMarkIcon?: React.ReactNode;
  /** Whether the component can be controlled or not */
  controlled?: boolean;
  /** Shape of the checkbox: 'round' or 'square' */
  shape?: 'round' | 'square';
  /** Border radius for square shape (has no effect if shape is 'round') */
  borderRadius?: number;
  /** Border width */
  borderWidth?: number;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Style of the checkmark: 'line' or 'check' */
  checkMarkStyle?: 'line' | 'check';
  /** Shadow style */
  withShadow?: boolean;
};

// Add a separate component for the check mark
const CheckMark = ({
  checked,
  checkMarkColor,
  size,
  checkMarkOpacity,
}: {
  checked: boolean;
  checkMarkColor: string;
  size: number;
  checkMarkOpacity: SharedValue<number>;
}) => {
  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [30],
    strokeDashoffset: checked ? 0 : 30,
  }));

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        { opacity: checkMarkOpacity.value },
      ]}
    >
      <Svg
        width={size * 0.7}
        height={size * 0.7}
        viewBox="0 0 24 24"
        stroke={checkMarkColor}
        strokeWidth={3}
        fill="none"
      >
        <AnimatedPath
          d="M5,12 L10,17 L19,8"
          strokeLinecap="round"
          strokeLinejoin="round"
          animatedProps={animatedProps}
        />
      </Svg>
    </Animated.View>
  );
};

/**
 * A customizable checkbox component with various states and styles
 */
const Checkbox = ({
  checked: checkedProp,
  onPress,
  label,
  disabled = false,
  containerStyle,
  checkboxStyle,
  labelStyle,
  size = 24,
  checkedColor = '#ff4040',
  uncheckedColor = '#ffffff',
  checkMarkColor = '#ffffff',
  disabledColor = '#e0e0e0',
  showCheckMark = true,
  checkMarkIcon,
  controlled = false,
  shape = 'round',
  borderRadius = 4,
  borderWidth = 1.5,
  animationDuration = 200,
  checkMarkStyle = 'check',
  withShadow = false,
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(false);

  const checked = controlled ? checkedProp : internalChecked;

  const progress = useSharedValue(checked ? 1 : 0);
  const checkMarkScale = useSharedValue(checked ? 1 : 0);
  const checkMarkOpacity = useSharedValue(checked ? 1 : 0);
  const checkPathLength = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: animationDuration,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

    if (checked) {
      checkMarkScale.value = withSequence(
        withTiming(0.8, { duration: animationDuration * 0.4 }),
        withTiming(1.1, { duration: animationDuration * 0.3 }),
        withTiming(1, { duration: animationDuration * 0.3 })
      );
      checkMarkOpacity.value = withTiming(1, {
        duration: animationDuration * 0.6,
      });
      checkPathLength.value = withDelay(
        animationDuration * 0.1,
        withTiming(1, { duration: animationDuration * 0.8 })
      );
    } else {
      checkMarkScale.value = withTiming(0, {
        duration: animationDuration * 0.3,
      });
      checkMarkOpacity.value = withTiming(0, {
        duration: animationDuration * 0.2,
      });
      checkPathLength.value = withTiming(0, {
        duration: animationDuration * 0.2,
      });
    }
  }, [
    checked,
    progress,
    checkMarkScale,
    checkMarkOpacity,
    checkPathLength,
    animationDuration,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [uncheckedColor, checkedColor]
    );

    return {
      backgroundColor: disabled ? disabledColor : backgroundColor,
      borderColor: disabled
        ? disabledColor
        : checked
          ? checkedColor
          : '#cccccc',
    };
  });

  const handlePress = () => {
    if (disabled) return;

    const newValue = !checked;

    if (!controlled) {
      setInternalChecked(newValue);
    }

    onPress?.(newValue);
  };

  const renderCheckMark = () => {
    if (!showCheckMark) return null;

    if (checkMarkIcon) {
      return (
        <Animated.View
          style={[styles.checkMark, { opacity: checkMarkOpacity.value }]}
        >
          {checkMarkIcon}
        </Animated.View>
      );
    }

    if (checkMarkStyle === 'line') {
      return (
        <Animated.View
          style={[styles.checkMark, { opacity: checkMarkOpacity.value }]}
        >
          <View
            style={[styles.checkMarkLine1, { backgroundColor: checkMarkColor }]}
          />
          <View
            style={[styles.checkMarkLine2, { backgroundColor: checkMarkColor }]}
          />
        </Animated.View>
      );
    }

    return (
      <CheckMark
        checked={checked ?? false}
        checkMarkColor={checkMarkColor}
        size={size}
        checkMarkOpacity={checkMarkOpacity}
      />
    );
  };

  const getBorderRadius = () => {
    if (shape === 'round') {
      return size / 2;
    }
    return borderRadius;
  };

  const shadowStyle = withShadow
    ? {
        shadowColor: checked ? checkedColor : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: checked ? 0.4 : 0,
        shadowRadius: 3,
        elevation: checked ? 4 : 0,
      }
    : {};

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, containerStyle]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.checkbox,
          {
            width: size,
            height: size,
            borderRadius: getBorderRadius(),
            borderWidth: borderWidth,
          },
          shadowStyle,
          animatedStyle,
          checkboxStyle,
        ]}
      >
        {renderCheckMark()}
      </Animated.View>

      {label && (
        <Text
          style={[
            styles.label,
            { color: disabled ? disabledColor : '#000000' },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#cccccc',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  checkMark: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMarkLine1: {
    position: 'absolute',
    width: '30%',
    height: 2.5,
    bottom: '45%',
    left: '25%',
    transform: [{ rotate: '45deg' }],
  },
  checkMarkLine2: {
    position: 'absolute',
    width: '50%',
    height: 2.5,
    bottom: '45%',
    right: '20%',
    transform: [{ rotate: '-45deg' }],
  },
});

export default Checkbox;
