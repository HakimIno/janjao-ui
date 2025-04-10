import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { FlatList, StyleSheet, View, Text, Platform } from 'react-native';
import type {
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { ITEM_HEIGHT, VISIBLE_ITEMS } from './constants';
import type { WheelPickerColumnProps } from './datepicker.type';

const WheelPickerColumn: React.FC<WheelPickerColumnProps> = ({
  data,
  selectedValue,
  onValueChange,
  pickerType,
  color,
}) => {
  const listRef = useRef<FlatList<string>>(null);
  const scrolling = useRef(false);
  const currentValue = useRef(selectedValue);
  const [visualValue, setVisualValue] = useState(selectedValue);
  const isScrollingProgrammatically = useRef(false);
  const lastScrollPosition = useRef(0);
  const scrollDirection = useRef<'up' | 'down' | null>(null);
  const lastScrollTime = useRef(0);
  const androidSnapToOffsetTimer = useRef<NodeJS.Timeout | null>(null);
  const lastAndroidSnap = useRef<number | null>(null);
  const pendingValueUpdate = useRef<string | null>(null);
  const isAtBoundary = useRef(false);

  const scrollThrottleMs = Platform.OS === 'android' ? 8 : 8;

  const placeholderCount = Math.floor(VISIBLE_ITEMS / 2);
  const paddedData = useMemo(() => {
    const topPlaceholders = Array(placeholderCount).fill('');
    const bottomPlaceholders = Array(placeholderCount).fill('');
    return [...topPlaceholders, ...data, ...bottomPlaceholders];
  }, [data]);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const handleScrollBegin = useCallback(() => {
    if (isScrollingProgrammatically.current) return;
    scrolling.current = true;
    isAtBoundary.current = false;

    if (listRef.current && Platform.OS === 'android') {
      listRef.current.setNativeProps({ scrollEnabled: true });
    }
  }, []);

  const updateValue = useCallback((newValue: string) => {
    if (newValue !== currentValue.current) {
      currentValue.current = newValue;

      if (Platform.OS === 'ios') {
        setVisualValue(newValue);
      } else {
        if (pendingValueUpdate.current !== newValue) {
          pendingValueUpdate.current = newValue;
          setTimeout(() => {
            if (pendingValueUpdate.current === newValue) {
              setVisualValue(newValue);
              pendingValueUpdate.current = null;
            }
          }, 0);
        }
      }
    }
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isScrollingProgrammatically.current) return;

      const now = Date.now();
      if (now - lastScrollTime.current < scrollThrottleMs) return;
      lastScrollTime.current = now;

      const y = event.nativeEvent.contentOffset.y;
      const currentScrollPosition = y;

      // Determine scrolling direction for boundary detection
      lastScrollPosition.current = currentScrollPosition;

      // Allow scrolling in opposite direction even at boundary
      if (isAtBoundary.current) {
        const index = Math.round(y / ITEM_HEIGHT);
        const actualIndex = index - placeholderCount;

        const isAtTopBoundary = actualIndex <= 0;
        const isAtBottomBoundary = actualIndex >= data.length - 1;

        // Allow scrolling down when at top boundary
        if (isAtTopBoundary && scrollDirection.current === 'down') {
          isAtBoundary.current = false;
          return;
        }

        // Allow scrolling up when at bottom boundary
        if (isAtBottomBoundary && scrollDirection.current === 'up') {
          isAtBoundary.current = false;
          return;
        }

        // Only block if still at boundary and trying to go further in same direction
        if (
          isAtBoundary.current &&
          ((isAtTopBoundary && scrollDirection.current === 'up') ||
            (isAtBottomBoundary && scrollDirection.current === 'down'))
        ) {
          return;
        }
      }

      const index = Math.round(y / ITEM_HEIGHT);
      const actualIndex = index - placeholderCount;

      // Detect boundary conditions
      if (actualIndex < 0 && scrollDirection.current === 'up') {
        isAtBoundary.current = true;
        const minOffset = placeholderCount * ITEM_HEIGHT;

        if (listRef.current) {
          isScrollingProgrammatically.current = true;
          listRef.current.scrollToOffset({
            offset: minOffset,
            animated: false,
          });

          // Don't disable scrolling completely on Android, to allow scrolling down later
          if (Platform.OS === 'android') {
            listRef.current.setNativeProps({ scrollEnabled: true });
          }

          setTimeout(() => {
            isScrollingProgrammatically.current = false;
          }, 100);
        }

        if (data.length > 0) {
          updateValue(data[0] as string);
        }
        return;
      }

      if (actualIndex >= data.length && scrollDirection.current === 'down') {
        isAtBoundary.current = true;
        const maxOffset = (data.length - 1 + placeholderCount) * ITEM_HEIGHT;

        if (listRef.current) {
          isScrollingProgrammatically.current = true;
          listRef.current.scrollToOffset({
            offset: maxOffset,
            animated: false,
          });

          // Don't disable scrolling completely on Android, to allow scrolling up later
          if (Platform.OS === 'android') {
            listRef.current.setNativeProps({ scrollEnabled: true });
          }

          setTimeout(() => {
            isScrollingProgrammatically.current = false;
          }, 100);
        }

        if (data.length > 0) {
          updateValue(data[data.length - 1] as string);
        }
        return;
      }

      const clampedIndex = Math.max(0, Math.min(actualIndex, data.length - 1));
      const newValue = data[clampedIndex];

      if (newValue !== undefined) {
        updateValue(newValue);
      }
    },
    [data, placeholderCount, updateValue]
  );

  const androidSnapToOffset = useCallback(
    (offset: number) => {
      if (!listRef.current) return;
      isScrollingProgrammatically.current = true;

      if (androidSnapToOffsetTimer.current) {
        clearTimeout(androidSnapToOffsetTimer.current);
      }

      if (lastAndroidSnap.current === offset) {
        isScrollingProgrammatically.current = false;
        return;
      }
      lastAndroidSnap.current = offset;

      listRef.current.setNativeProps({ scrollEnabled: false });

      listRef.current.scrollToOffset({
        offset,
        animated: false,
      });

      androidSnapToOffsetTimer.current = setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollToOffset({
            offset,
            animated: false,
          });

          // Only re-enable scrolling if not at boundaries
          const actualIndex =
            Math.round(offset / ITEM_HEIGHT) - placeholderCount;
          const isAtTopBoundary = actualIndex <= 0;
          const isAtBottomBoundary = actualIndex >= data.length - 1;

          if (!isAtTopBoundary && !isAtBottomBoundary) {
            listRef.current.setNativeProps({ scrollEnabled: true });
          }

          isScrollingProgrammatically.current = false;
        }
      }, 16);
    },
    [data, placeholderCount]
  );

  const handleScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!scrolling.current || isScrollingProgrammatically.current) return;

      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / ITEM_HEIGHT);
      const actualIndex = index - placeholderCount;

      // Check if we're at boundaries
      const isAtTopBoundary = actualIndex <= 0;
      const isAtBottomBoundary = actualIndex >= data.length - 1;

      // Clamp the index to valid data range
      const clampedIndex = Math.max(0, Math.min(actualIndex, data.length - 1));
      const newValue = data[clampedIndex];

      if (newValue !== undefined) {
        const exactOffset = (clampedIndex + placeholderCount) * ITEM_HEIGHT;

        const currentOffset = event.nativeEvent.contentOffset.y;
        const isAlignmentOff = Math.abs(currentOffset - exactOffset) > 1.0;
        const isOutOfBounds = actualIndex < 0 || actualIndex >= data.length;

        updateValue(newValue);

        if (newValue !== selectedValue) {
          onValueChange(newValue);
        }

        if ((isAlignmentOff || isOutOfBounds) && listRef.current) {
          isScrollingProgrammatically.current = true;

          if (Platform.OS === 'android') {
            androidSnapToOffset(exactOffset);

            // Only set boundary flag for the current direction
            if (
              (isAtTopBoundary && scrollDirection.current === 'up') ||
              (isAtBottomBoundary && scrollDirection.current === 'down')
            ) {
              isAtBoundary.current = true;
            }
          } else {
            listRef.current.scrollToOffset({
              offset: exactOffset,
              animated: true,
            });

            // For iOS, apply boundary detection only for the current direction
            if (
              (isAtTopBoundary && scrollDirection.current === 'up') ||
              (isAtBottomBoundary && scrollDirection.current === 'down')
            ) {
              isAtBoundary.current = true;
            }

            setTimeout(() => {
              isScrollingProgrammatically.current = false;
            }, 100);
          }
        } else {
          isScrollingProgrammatically.current = false;
        }
      }

      scrolling.current = false;
    },
    [
      data,
      onValueChange,
      placeholderCount,
      androidSnapToOffset,
      selectedValue,
      updateValue,
    ]
  );

  const handleMomentumScrollBegin = useCallback(() => {
    if (isScrollingProgrammatically.current) return;
    scrolling.current = true;
  }, []);

  const handleScrollEndDrag = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = event.nativeEvent.contentOffset.y;
      const index = Math.round(y / ITEM_HEIGHT);
      const actualIndex = index - placeholderCount;

      // Check if we're at boundaries
      const isAtTopBoundary = actualIndex <= 0;
      const isAtBottomBoundary = actualIndex >= data.length - 1;

      if (
        (isAtTopBoundary && scrollDirection.current === 'up') ||
        (isAtBottomBoundary && scrollDirection.current === 'down')
      ) {
        // Only set boundary for the current direction
        isAtBoundary.current = true;

        const clampedIndex = Math.max(
          0,
          Math.min(actualIndex, data.length - 1)
        );
        const exactOffset = (clampedIndex + placeholderCount) * ITEM_HEIGHT;

        if (listRef.current) {
          isScrollingProgrammatically.current = true;
          listRef.current.scrollToOffset({
            offset: exactOffset,
            animated: false,
          });

          // Don't disable scrolling completely - only restrict the boundary direction
          if (Platform.OS === 'android') {
            listRef.current.setNativeProps({ scrollEnabled: true });
          }

          setTimeout(() => {
            isScrollingProgrammatically.current = false;
          }, 100);
        }
      } else if (actualIndex < 0 || actualIndex >= data.length) {
        const clampedIndex = Math.max(
          0,
          Math.min(actualIndex, data.length - 1)
        );
        const exactOffset = (clampedIndex + placeholderCount) * ITEM_HEIGHT;

        if (listRef.current) {
          isScrollingProgrammatically.current = true;
          listRef.current.scrollToOffset({
            offset: exactOffset,
            animated: false,
          });

          setTimeout(() => {
            isScrollingProgrammatically.current = false;
          }, 16);
        }
      }
    },
    [data, placeholderCount]
  );

  useEffect(() => {
    if (!scrolling.current && selectedValue) {
      const index = data.indexOf(selectedValue);

      if (index !== -1) {
        isScrollingProgrammatically.current = true;
        const targetOffset = (index + placeholderCount) * ITEM_HEIGHT;

        if (Platform.OS === 'android') {
          if (listRef.current) {
            listRef.current.setNativeProps({ scrollEnabled: true });
            isAtBoundary.current = false;

            listRef.current.scrollToOffset({
              offset: targetOffset,
              animated: false,
            });

            currentValue.current = selectedValue;
            setVisualValue(selectedValue);

            setTimeout(() => {
              if (listRef.current) {
                listRef.current.scrollToOffset({
                  offset: targetOffset,
                  animated: false,
                });

                isScrollingProgrammatically.current = false;
              }
            }, 16);
          }
        } else {
          if (listRef.current) {
            listRef.current.scrollToOffset({
              offset: targetOffset,
              animated: false,
            });

            currentValue.current = selectedValue;
            setVisualValue(selectedValue);

            // Don't set boundary flags for iOS either - allow bidirectional scrolling
            isAtBoundary.current = false;

            setTimeout(() => {
              isScrollingProgrammatically.current = false;
            }, 16);
          }
        }
      }
    }
  }, [selectedValue, data, placeholderCount]);

  useEffect(() => {
    if (selectedValue) {
      const index = data.indexOf(selectedValue);

      if (index !== -1) {
        const targetOffset = (index + placeholderCount) * ITEM_HEIGHT;

        if (Platform.OS === 'android') {
          if (listRef.current) {
            // Allow bidirectional scrolling
            listRef.current.setNativeProps({ scrollEnabled: true });
            isAtBoundary.current = false;

            listRef.current.scrollToOffset({
              offset: targetOffset,
              animated: false,
            });

            setTimeout(() => {
              if (listRef.current) {
                listRef.current.scrollToOffset({
                  offset: targetOffset,
                  animated: false,
                });
              }
            }, 16);
          }
        } else {
          if (listRef.current) {
            requestAnimationFrame(() => {
              if (listRef.current) {
                listRef.current.scrollToOffset({
                  offset: targetOffset,
                  animated: false,
                });

                if (selectedValue !== visualValue) {
                  setVisualValue(selectedValue);
                }

                // Allow bidirectional scrolling on iOS too
                isAtBoundary.current = false;
              }
            });
          }
        }
      }
    }
  }, []);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => {
      if (!item) {
        return <View style={styles.placeholder} />;
      }

      const isVisibleItem =
        index >= placeholderCount && index < placeholderCount + data.length;
      if (!isVisibleItem) {
        return <View style={styles.placeholder} />;
      }

      const isSelected = item === visualValue;

      // Apply dynamic styles based on selection state and color
      const itemStyle = isSelected
        ? [styles.selectedItemText, { color: color || '#1a1a1a' }]
        : styles.itemText;

      return (
        <View style={styles.itemContainer}>
          <Text numberOfLines={1} style={itemStyle} allowFontScaling={false}>
            {item}
          </Text>
        </View>
      );
    },
    [visualValue, data, placeholderCount, color]
  );

  const keyExtractor = useCallback(
    (_: string, index: number) => `${pickerType}-${index}`,
    [pickerType]
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={paddedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        decelerationRate={Platform.OS === 'ios' ? 0.85 : 0.75}
        onScrollBeginDrag={handleScrollBegin}
        onScroll={handleScroll}
        onScrollEndDrag={handleScrollEndDrag}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={8}
        removeClippedSubviews={true}
        initialNumToRender={Math.min(paddedData.length, 20)}
        maxToRenderPerBatch={8}
        windowSize={9}
        updateCellsBatchingPeriod={30}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: (VISIBLE_ITEMS / 2 - 0.5) * ITEM_HEIGHT,
            paddingBottom: (VISIBLE_ITEMS / 2 - 0.5) * ITEM_HEIGHT,
          },
        ]}
        bounces={false}
        overScrollMode="never"
        extraData={visualValue}
        maintainVisibleContentPosition={{
          minIndexForVisible: 0,
          autoscrollToTopThreshold: 10,
        }}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={false}
        onEndReachedThreshold={0.5}
        {...(Platform.OS === 'android'
          ? {
              nestedScrollEnabled: true,
              fadingEdgeLength: 40,
              contentInsetAdjustmentBehavior: 'never' as 'never',
              automaticallyAdjustContentInsets: false,
              snapToOffsets: Array.from(
                { length: data.length },
                (_, i) => (i + placeholderCount) * ITEM_HEIGHT
              ),
            }
          : {})}
      />
      <View style={styles.selectionOverlay} pointerEvents="none" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingVertical: 0,
  },
  selectionOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: ITEM_HEIGHT,
    marginTop: -ITEM_HEIGHT / 2,
    backgroundColor: 'rgba(249, 250, 251, 1)',
    zIndex: -2,
  },

  placeholder: {
    height: ITEM_HEIGHT,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1a1a1a',
    textAlign: 'center',
    paddingHorizontal: 2,
    width: '100%',
    opacity: 0.6,
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: 'center',
        lineHeight: ITEM_HEIGHT - 4,
      },
      ios: {
        paddingBottom: 2,
        lineHeight: ITEM_HEIGHT - 2,
      },
    }),
  },
  selectedItemText: {
    fontSize: Platform.OS === 'ios' ? 16 : 18,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    paddingHorizontal: 2,
    width: '100%',
    opacity: 1,
  },
});

export default React.memo(WheelPickerColumn);
