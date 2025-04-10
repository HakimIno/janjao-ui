import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ITEM_HEIGHT } from './constants';

interface GradientViewProps {
  style: any;
  borderColor?: string;
}

const GradientView: React.FC<GradientViewProps> = ({
  style,
  borderColor = 'rgba(0, 102, 204, 0.6)',
}) => (
  <View style={[style, styles.pickerGradientFallback]} pointerEvents="none">
    <View style={styles.gradientTop} />
    <View style={[styles.selectedItemHighlight, { borderColor }]} />
    <View style={styles.subItemHighlight} />
    <View style={styles.subBottomItemHighlight} />
    <View style={styles.gradientBottom} />
  </View>
);

const styles = StyleSheet.create({
  pickerGradientFallback: {
    backgroundColor: 'transparent',
  },
  gradientTop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  selectedItemHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
  },
  subItemHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: ITEM_HEIGHT - 1,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  subBottomItemHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: ITEM_HEIGHT - 1,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  gradientBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: ITEM_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

export default GradientView;
