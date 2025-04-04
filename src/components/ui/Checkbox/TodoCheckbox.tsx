import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import Checkbox from './Checkbox';

export interface TodoCheckboxProps {
  /** Text to display for the todo item */
  text: string;
  /** Whether the todo is completed */
  completed?: boolean;
  /** Callback when the todo completion status changes */
  onToggle?: (completed: boolean) => void;
  /** Style for the container */
  containerStyle?: ViewStyle;
  /** Style for the text */
  textStyle?: TextStyle;
  /** Color for the checkbox when checked */
  checkedColor?: string;
  /** Whether the todo item is disabled */
  disabled?: boolean;
  /** Whether the component is controlled externally */
  controlled?: boolean;
  /** Additional content to render */
  children?: React.ReactNode;
  /** Emoji or icon to show at the end of the text */
  emoji?: string;
  /** Shape of the checkbox */
  shape?: 'round' | 'square';
  /** Border radius for square checkbox */
  borderRadius?: number;
  /** Whether to show shadow */
  withShadow?: boolean;
  /** Style of the checkmark: 'line' or 'check' */
  checkMarkStyle?: 'line' | 'check';
  /** Size of the checkbox */
  size?: number;
}

/**
 * A TodoCheckbox component that combines a checkbox with text for a todo item
 */
const TodoCheckbox = ({
  text,
  completed: completedProp,
  onToggle,
  containerStyle,
  textStyle,
  checkedColor,
  disabled = false,
  controlled = false,
  children,
  size = 24,
  emoji,
  shape = 'round',
  borderRadius = 4,
  withShadow = false,
  checkMarkStyle = 'check',
}: TodoCheckboxProps) => {
  // Internal state for uncontrolled component
  const [internalCompleted, setInternalCompleted] = React.useState(false);

  // Determine if component is controlled or not
  const completed = controlled ? completedProp : internalCompleted;

  // Animation values for text strikethrough
  const textProgress = useSharedValue(completed ? 1 : 0);

  // Update animation when completed state changes
  React.useEffect(() => {
    textProgress.value = withTiming(completed ? 1 : 0, {
      duration: 300,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [completed, textProgress]);

  // Animated style for text
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolateColor(textProgress.value, [0, 1], [1, 0.5]);

    return {
      opacity,
      textDecorationLine: textProgress.value > 0.5 ? 'line-through' : 'none',
    };
  });

  // Handle checkbox toggle
  const handleToggle = (checked: boolean) => {
    if (!controlled) {
      setInternalCompleted(checked);
    }

    onToggle?.(checked);
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => handleToggle(!completed)}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Checkbox
        checked={completed}
        onPress={handleToggle}
        disabled={disabled}
        controlled
        checkedColor={checkedColor}
        size={size}
        shape={shape}
        borderRadius={borderRadius}
        animationDuration={250}
        withShadow={withShadow}
        checkMarkStyle={checkMarkStyle}
      />

      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.text,
            animatedTextStyle,
            textStyle,
          ]}
        >
          {text}
        </Animated.Text>

        {emoji && <Text style={styles.emoji}>{emoji}</Text>}
      </View>

      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    marginLeft: 12,
    flex: 1,
  },
  emoji: {
    fontSize: 18,
    marginLeft: 8,
  },
});

export default TodoCheckbox;
