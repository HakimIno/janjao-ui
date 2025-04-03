import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AccordionTheme } from './theme';
import { styles } from './styles';

type BadgeProps = {
  value: string | number;
  theme: AccordionTheme;
  customStyle?: object;
  badgeStyle?: 'default' | 'modern' | 'pill';
  badgeColor?: string;
};

const Badge: React.FC<BadgeProps> = ({
  value,
  theme,
  customStyle,
  badgeStyle = 'default',
  badgeColor,
}) => {
  // Convert number to string with "+" if it's greater than 99
  const displayValue =
    typeof value === 'number' && value > 99 ? '99+' : String(value);

  // Choose style based on badge style prop
  const getBadgeStyle = () => {
    switch (badgeStyle) {
      case 'modern':
        return [
          styles.modernBadge,
          {
            backgroundColor: badgeColor || theme.primary,
            shadowColor: badgeColor || theme.primary,
            shadowOpacity: 0.2,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 1 },
            elevation: 2,
          },
        ];
      case 'pill':
        return [
          styles.pillBadge,
          {
            backgroundColor:
              badgeColor || `rgba(${hexToRgb(theme.primary)}, 0.15)`,
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: 12,
          },
        ];
      default: // 'default'
        return [
          localStyles.badge,
          {
            backgroundColor: badgeColor || theme.primary,
            borderColor: theme.background,
            shadowColor: theme.shadow,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: { width: 0, height: 1 },
          },
        ];
    }
  };

  // Get text color based on badge style
  const getTextColor = () => {
    if (badgeStyle === 'pill') {
      return theme.primary; // For pill style, text matches primary color
    }
    return '#FFFFFF'; // For default and modern styles, text is white
  };

  return (
    <View style={[...getBadgeStyle(), customStyle]}>
      <Text style={[localStyles.badgeText, { color: getTextColor() }]}>
        {displayValue}
      </Text>
    </View>
  );
};

// Helper function to convert hex to RGB
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
  badge: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    borderWidth: 1.5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});

export default Badge;
