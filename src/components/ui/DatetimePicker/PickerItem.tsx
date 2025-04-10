import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { VISIBLE_ITEMS, ITEM_HEIGHT } from './constants';

interface PickerItemProps {
  item: string;
  isSelected: boolean;
  index: number;
  totalItems: number;
  onPress?: () => void;
}

// Memoized picker item with position-based animation
const PickerItem = React.memo(
  ({ item, isSelected, index, totalItems, onPress }: PickerItemProps) => {
    // Apply scaling effect based on position
    const position = index - Math.floor(VISIBLE_ITEMS / 2);
    const opacity = Math.max(0.3, 1 - Math.abs(position) * 0.15);
    const scale = Math.max(0.85, 1 - Math.abs(position) * 0.08);

    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.pickerItem,
          isSelected && styles.selectedPickerItem,
          {
            opacity,
            transform: [{ scale }],
          },
        ]}
      >
        <Text
          style={[
            styles.pickerItemText,
            isSelected && styles.selectedPickerItemText,
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {item}
        </Text>
      </Pressable>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison function for memoization
    return (
      prevProps.item === nextProps.item &&
      prevProps.isSelected === nextProps.isSelected &&
      prevProps.index === nextProps.index &&
      Math.abs(prevProps.index - nextProps.index) > 2 // Only re-render items that moved significantly
    );
  }
);

const styles = StyleSheet.create({
  pickerItem: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  selectedPickerItem: {
    backgroundColor: 'rgba(0, 102, 204, 0.08)',
    borderRadius: 8,
  },
  pickerItemText: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  selectedPickerItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0066CC',
  },
});

export default PickerItem;
