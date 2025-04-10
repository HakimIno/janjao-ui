import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  TouchableWithoutFeedback,
  Platform,
  BackHandler,
} from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: number[]; // Heights in pixels
  initialSnap?: number; // Index of snapPoints to initially snap to
  overlay?: boolean; // Whether to show overlay
  overlayOpacity?: number; // Opacity of overlay
  closeOnOverlayPress?: boolean; // Close on overlay press
  closeOnBackPress?: boolean; // Close on back press (Android)
  style?: StyleProp<ViewStyle>; // Style for the bottom sheet container
  handleStyle?: StyleProp<ViewStyle>; // Style for the drag handle
  contentContainerStyle?: StyleProp<ViewStyle>; // Style for the content container
  disableBackdropPress?: boolean; // Disable closing on backdrop press
  hideHandle?: boolean; // Hide the drag handle
  borderRadius?: number; // Border radius for the top corners
  enableGestureHandling?: boolean; // Enable gesture handling
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  children,
  snapPoints = [300],
  initialSnap = 0,
  overlay = true,
  overlayOpacity = 0.5,
  closeOnOverlayPress = true,
  closeOnBackPress = true,
  style,
  handleStyle,
  contentContainerStyle,
  disableBackdropPress = false,
  hideHandle = false,
  borderRadius = 16,
  enableGestureHandling = true,
}) => {
  // Animation values
  const bottomSheetHeight = useRef(
    snapPoints[initialSnap] || snapPoints[0] || 300
  );
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT));
  const overlayAnim = useRef(new Animated.Value(0));

  // State for handling modal visibility to prevent flicker
  const [modalVisible, setModalVisible] = useState(isOpen);

  // For tracking the direction of movement
  const lastGestureState = useRef({ dy: 0, vy: 0 });

  // Setup pan responder for gesture handling
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enableGestureHandling,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Don't capture touch events if gesture handling is disabled
        if (!enableGestureHandling) return false;

        // Allow dragging if already dragging downward
        if (lastGestureState.current.dy > 0) return true;

        // Only start dragging if moving downward significantly
        return (
          gestureState.dy > 10 &&
          Math.abs(gestureState.dx) < Math.abs(gestureState.dy)
        );
      },
      onPanResponderGrant: () => {
        // Stop any running animations
        translateY.current.stopAnimation();
        translateY.current.setOffset(0);
        translateY.current.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        lastGestureState.current = { dy: gestureState.dy, vy: gestureState.vy };

        // Only allow downward movement (positive dy)
        if (gestureState.dy > 0) {
          translateY.current.setValue(gestureState.dy);
        } else {
          // For upward movement, add high resistance (almost no movement)
          translateY.current.setValue(gestureState.dy / 10);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Quick flick down, close the sheet
        if (gestureState.vy > 0.7) {
          return closeBottomSheet();
        }

        // For downward movement
        if (gestureState.dy > 0) {
          // If dragged down sufficiently or with enough velocity, close it
          if (
            gestureState.dy > bottomSheetHeight.current * 0.15 ||
            gestureState.vy > 0.2
          ) {
            closeBottomSheet();
          } else {
            // Otherwise, snap back to original position
            snapBack();
          }
        } else {
          // For any upward movement, just snap back
          snapBack();
        }
      },
    })
  ).current;

  // Function to snap back to original position
  const snapBack = useCallback(() => {
    Animated.spring(translateY.current, {
      toValue: 0,
      useNativeDriver: true,
      tension: 140,
      friction: 15,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    }).start();
  }, []);

  // Handle opening and closing animations
  useEffect(() => {
    if (isOpen) {
      setModalVisible(true);
      // Reset the translateY value when opening
      translateY.current.setValue(SCREEN_HEIGHT / 2);

      Animated.parallel([
        Animated.spring(translateY.current, {
          toValue: 0,
          useNativeDriver: true,
          tension: 140,
          friction: 16,
          velocity: -2, // Initial velocity for more natural opening
          overshootClamping: false,
        }),
        Animated.timing(overlayAnim.current, {
          toValue: overlayOpacity,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // First animate the sheet out
      Animated.parallel([
        Animated.timing(translateY.current, {
          toValue: SCREEN_HEIGHT,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim.current, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setModalVisible(false);
      });
    }
  }, [isOpen, overlayOpacity]);

  // Handle Android back button
  useEffect(() => {
    if (Platform.OS === 'android' && closeOnBackPress) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          if (isOpen) {
            closeBottomSheet();
            return true;
          }
          return false;
        }
      );

      return () => backHandler.remove();
    }
  }, [isOpen, closeOnBackPress]);

  // Close bottom sheet function
  const closeBottomSheet = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Reset bottom sheet height when snapPoints change
  useEffect(() => {
    const height =
      snapPoints[initialSnap] !== undefined
        ? snapPoints[initialSnap]
        : snapPoints[0] !== undefined
          ? snapPoints[0]
          : 300;

    bottomSheetHeight.current = height;
  }, [snapPoints, initialSnap]);

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    if (closeOnOverlayPress && !disableBackdropPress) {
      closeBottomSheet();
    }
  }, [closeOnOverlayPress, disableBackdropPress, closeBottomSheet]);

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={closeOnBackPress ? closeBottomSheet : undefined}
      hardwareAccelerated
    >
      <View style={styles.container}>
        {overlay && (
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <Animated.View
              style={[
                styles.backdrop,
                {
                  opacity: overlayAnim.current,
                },
              ]}
            />
          </TouchableWithoutFeedback>
        )}

        <Animated.View
          style={[
            styles.bottomSheetContainer,
            {
              height: bottomSheetHeight.current,
              transform: [
                {
                  translateY: translateY.current,
                },
              ],
              borderTopLeftRadius: borderRadius,
              borderTopRightRadius: borderRadius,
            },
            style,
          ]}
          {...(enableGestureHandling ? panResponder.panHandlers : {})}
        >
          {!hideHandle && (
            <View style={[styles.handleContainer]}>
              <View style={[styles.handle, handleStyle]} />
            </View>
          )}
          <View style={[styles.contentContainer, contentContainerStyle]}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.24,
    shadowRadius: 4,
    elevation: 20,
  },
  handleContainer: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#BBBBBB',
    borderRadius: 100,
  },
  contentContainer: {
    flex: 1,
  },
});

export default BottomSheet;
