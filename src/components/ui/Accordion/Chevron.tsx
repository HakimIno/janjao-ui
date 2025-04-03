import { View, StyleSheet } from 'react-native';
import { memo } from 'react';
import Animated, {
  useAnimatedStyle,
  type SharedValue,
  interpolateColor,
} from 'react-native-reanimated';
import { styles } from './styles';

type ChevronProps = {
  progress: SharedValue<number>;
  color: string;
  customStyle?: object;
  size?: 'small' | 'medium' | 'large';
  variant?:
    | 'default'
    | 'modern'
    | 'neumorphic'
    | 'glassmorphism'
    | 'ios'
    | 'material';
};

const Chevron = memo<ChevronProps>(
  ({ progress, color, customStyle, size = 'medium', variant = 'default' }) => {
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { rotateZ: `${progress.value * 180}deg` },
          { scale: 0.9 + progress.value * 0.2 }, // Add subtle scaling effect
        ],
        opacity: 0.8 + progress.value * 0.2,
        backgroundColor: interpolateColor(
          progress.value,
          [0, 1],
          ['rgba(0, 0, 0, 0.03)', `rgba(${hexToRgb(color)}, 0.1)`]
        ),
      };
    });

    const getSize = () => {
      switch (size) {
        case 'small':
          return { container: 20, arrow: 5 };
        case 'large':
          return { container: 28, arrow: 7 };
        default:
          return { container: 24, arrow: 6 };
      }
    };

    const sizeValues = getSize();

    // Get the appropriate container style based on variant
    const getContainerStyle = () => {
      switch (variant) {
        case 'modern':
          return styles.modernChevronContainer;
        case 'neumorphic':
          return styles.neumorphicChevronContainer;
        case 'glassmorphism':
          return styles.glassmorphicChevronContainer;
        default:
          return {};
      }
    };

    return (
      <Animated.View
        style={[
          localStyles.chevronContainer,
          {
            width: sizeValues.container,
            height: sizeValues.container,
            borderRadius: sizeValues.container / 2,
          },
          getContainerStyle(),
          animatedStyle,
          customStyle,
        ]}
      >
        <View
          style={[
            localStyles.chevron,
            {
              width: sizeValues.arrow,
              height: sizeValues.arrow,
              borderRightWidth: Math.max(2, sizeValues.arrow / 2),
              borderBottomWidth: Math.max(2, sizeValues.arrow / 2),
              borderColor: color,
            },
          ]}
        />
      </Animated.View>
    );
  }
);

// Helper function for hex to rgb conversion
const hexToRgb = (hex: string): string => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse the hex values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Return as RGB string
  return `${r}, ${g}, ${b}`;
};

const localStyles = StyleSheet.create({
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  chevron: {
    borderRightWidth: 2.5,
    borderBottomWidth: 2.5,
    transform: [{ rotate: '45deg' }],
  },
});

export default Chevron;
