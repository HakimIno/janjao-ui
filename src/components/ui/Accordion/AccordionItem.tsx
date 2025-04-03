import { Pressable, Text, View, useWindowDimensions } from 'react-native';
import { memo, useCallback, useMemo, useRef, useEffect } from 'react';
import Animated, {
  useAnimatedRef,
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  measure,
  useDerivedValue,
  withTiming,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';

import type {
  AccordionItemData,
  AccordionVariant,
  AnimationType,
} from './types';
import type { AccordionTheme } from './theme';
import { hexToRgb } from './theme';
import Chevron from './Chevron';
import Badge from './Badge';
import { styles, getResponsiveStyles } from './styles';

export type AccordionItemProps = {
  item: AccordionItemData;
  level: number;
  variant: AccordionVariant;
  maxDepth: number;
  compact: boolean;
  animationType: AnimationType;
  animationDuration: number;
  theme: AccordionTheme;
  parentHeightValue?: SharedValue<number>;
  customStyles?: {
    container?: object;
    title?: object;
    content?: object;
    chevron?: object;
    badge?: object;
    description?: object;
  };
  onItemPress?: (item: AccordionItemData) => void;
  isLastInLevel?: boolean;
  singleOpenMode?: boolean;
};

const AccordionItem = memo<AccordionItemProps>(
  ({
    item,
    level,
    variant,
    maxDepth,
    compact,
    animationType,
    animationDuration,
    theme,
    parentHeightValue,
    customStyles,
    onItemPress,
    isLastInLevel = false,
    singleOpenMode = false,
  }) => {
    const { width } = useWindowDimensions();
    const listRef = useAnimatedRef<View>();
    const heightValue = useSharedValue(0);
    const open = useSharedValue(item.isOpen || false);

    const previousIsOpenRef = useRef(item.isOpen);

    const progress = useDerivedValue(() =>
      open.value
        ? animationType === 'spring'
          ? withSpring(1, { duration: animationDuration })
          : withTiming(1, { duration: animationDuration })
        : animationType === 'spring'
          ? withSpring(0, { duration: animationDuration })
          : withTiming(0, { duration: animationDuration })
    );

    useEffect(() => {
      if (item.isOpen) {
        setTimeout(() => {
          runOnUI(() => {
            'worklet';
            const measured = measure(listRef);
            if (!measured) return;

            const targetHeight = measured.height;
            heightValue.value = targetHeight;
            open.value = true;
          })();
        }, 50);
      } else {
        heightValue.value = 0;
        open.value = false;
      }
    }, [item.isOpen, listRef, heightValue, open]);

    useEffect(() => {
      if (item.isOpen) {
        runOnUI(() => {
          'worklet';
          const measured = measure(listRef);
          if (!measured) return;

          heightValue.value = measured.height;
        })();
      }

      return () => {
        if (parentHeightValue && open.value) {
          runOnUI(() => {
            'worklet';
            const measured = measure(listRef);
            if (!measured) return;

            parentHeightValue.value = Math.max(
              0,
              parentHeightValue.value - measured.height
            );
          })();
        }
      };
    }, [item.isOpen, parentHeightValue, heightValue, listRef, open.value]);

    useEffect(() => {
      if (previousIsOpenRef.current !== item.isOpen) {
        previousIsOpenRef.current = item.isOpen;

        if (open.value !== (item.isOpen || false)) {
          if (item.isOpen) {
            runOnUI(() => {
              'worklet';
              const measured = measure(listRef);
              if (!measured) return;

              const targetHeight = measured.height;
              const animation =
                animationType === 'spring'
                  ? withSpring(targetHeight, {
                      duration: animationDuration,
                      damping: 18,
                      stiffness: 120,
                    } as any)
                  : withTiming(targetHeight, { duration: animationDuration });

              heightValue.value = animation;

              if (parentHeightValue) {
                if (!open.value) {
                  parentHeightValue.value =
                    animationType === 'spring'
                      ? withSpring(parentHeightValue.value + targetHeight, {
                          duration: animationDuration,
                          damping: 18,
                          stiffness: 120,
                        } as any)
                      : withTiming(parentHeightValue.value + targetHeight, {
                          duration: animationDuration,
                        });
                }
              }
              open.value = true;
            })();
          } else if (open.value) {
            runOnUI(() => {
              'worklet';
              const measured = measure(listRef);
              if (!measured) return;

              const animation =
                animationType === 'spring'
                  ? withSpring(0, {
                      duration: animationDuration,
                      damping: 18,
                      stiffness: 120,
                    } as any)
                  : withTiming(0, { duration: animationDuration });

              heightValue.value = animation;

              if (parentHeightValue) {
                if (open.value) {
                  parentHeightValue.value =
                    animationType === 'spring'
                      ? withSpring(
                          Math.max(
                            0,
                            parentHeightValue.value - measured.height
                          ),
                          {
                            duration: animationDuration,
                            damping: 18,
                            stiffness: 120,
                          } as any
                        )
                      : withTiming(
                          Math.max(
                            0,
                            parentHeightValue.value - measured.height
                          ),
                          { duration: animationDuration }
                        );
                }
              }
              open.value = false;
            })();
          }
        }
      }
    }, [
      item.isOpen,
      animationType,
      animationDuration,
      parentHeightValue,
      open,
      heightValue,
      listRef,
    ]);

    const heightAnimationStyle = useAnimatedStyle(() => ({
      height: heightValue.value,
      overflow: 'hidden' as const,
    }));

    const getVariantStyle = useCallback(() => {
      const levelOpacity = 1 - level * 0.05;
      const alpha = (opacity: number) => Math.max(0.5, opacity * levelOpacity);
      const borderRadiusValue = level === 0 ? 16 : 12;

      switch (variant) {
        case 'light':
          return {
            backgroundColor: level === 0 ? theme.secondary : 'transparent',
            borderColor: level === 0 ? theme.primary : 'transparent',
            borderWidth: level === 0 ? 1 : 0,
            titleColor: theme.text,
            contentBgColor:
              level === 0
                ? `rgba(${hexToRgb(theme.secondary)}, ${alpha(0.3)})`
                : 'transparent',
            elevation: level === 0 ? 2 : 0,
            titleBg: level === 0 ? theme.secondary : 'transparent',
            borderRadius: level === 0 ? borderRadiusValue : 0,
            showNestedIndicator: level > 0,
            nestedIndicatorColor: theme.accent || theme.primary,
          };
        case 'shadow':
          return {
            backgroundColor: level === 0 ? theme.background : 'transparent',
            borderColor: 'transparent',
            borderWidth: 0,
            titleColor: theme.text,
            contentBgColor:
              level === 0
                ? `rgba(${hexToRgb(theme.secondary)}, 0.2)`
                : 'transparent',
            elevation: level === 0 ? 4 : 0,
            titleBg: level === 0 ? theme.background : 'transparent',
            borderRadius: level === 0 ? borderRadiusValue : 0,
            showNestedIndicator: level > 0,
            nestedIndicatorColor: theme.accent || theme.primary,
          };
        case 'bordered':
          return {
            backgroundColor: level === 0 ? theme.background : 'transparent',
            borderColor: level === 0 ? theme.primary : 'transparent',
            borderWidth: level === 0 ? 1 : 0,
            titleColor: theme.text,
            contentBgColor:
              level === 0
                ? `rgba(${hexToRgb(theme.secondary)}, 0.2)`
                : 'transparent',
            elevation: 0,
            titleBg: level === 0 ? theme.background : 'transparent',
            borderRadius: level === 0 ? borderRadiusValue : 0,
            showNestedIndicator: level > 0,
            nestedIndicatorColor: theme.accent || theme.primary,
          };
        case 'splitted':
          return {
            backgroundColor: level === 0 ? theme.background : 'transparent',
            borderColor: level === 0 ? theme.border : 'transparent',
            borderWidth: 0,
            titleColor: theme.text,
            contentBgColor:
              level === 0
                ? `rgba(${hexToRgb(theme.secondary)}, 0.3)`
                : 'transparent',
            elevation: 0,
            titleBg: level === 0 ? theme.background : 'transparent',
            borderRadius: level === 0 ? borderRadiusValue : 0,
            marginBottom: level === 0 ? 12 : 0,
            showNestedIndicator: level > 0,
            nestedIndicatorColor: theme.accent || theme.primary,
          };
        case 'flat':
          return {
            backgroundColor:
              level === 0
                ? `rgba(${hexToRgb(theme.secondary)}, 0.05)`
                : 'transparent',
            borderColor: theme.border,
            borderWidth: 0,
            titleColor: theme.text,
            contentBgColor:
              level === 0
                ? `rgba(${hexToRgb(theme.secondary)}, 0.03)`
                : 'transparent',
            elevation: 0,
            titleBg:
              level === 0
                ? `rgba(${hexToRgb(theme.secondary)}, 0.1)`
                : 'transparent',
            borderRadius: 12,
            borderBottomWidth: level === 0 || !isLastInLevel ? 1 : 0,
            showNestedIndicator: level > 0,
            nestedIndicatorColor: theme.accent || theme.primary,
            flatNested: true,
            transitionColor: `rgba(${hexToRgb(theme.primary)}, 0.15)`,
          };
        case 'modern':
          return {
            backgroundColor: level === 0 ? theme.background : 'transparent',
            borderColor: level === 0 ? theme.border : 'transparent',
            borderWidth: level === 0 ? 0 : 0,
            titleColor: theme.text,
            contentBgColor: level === 0 ? theme.background : 'transparent',
            elevation: level === 0 ? 3 : 0,
            titleBg: level === 0 ? theme.background : 'transparent',
            borderRadius: level === 0 ? 18 : 14,
            showNestedIndicator: level > 0,
            nestedIndicatorColor: theme.accent || theme.primary,
          };
        default:
          return {
            backgroundColor: level === 0 ? theme.background : 'transparent',
            borderColor: level === 0 ? theme.border : 'transparent',
            borderWidth: level === 0 ? 1 : 0,
            titleColor: theme.text,
            contentBgColor:
              level === 0
                ? `rgba(${hexToRgb(theme.secondary)}, 0.2)`
                : 'transparent',
            elevation: 0,
            titleBg: level === 0 ? theme.background : 'transparent',
            borderRadius: level === 0 ? borderRadiusValue : 0,
            showNestedIndicator: level > 0,
            nestedIndicatorColor: theme.accent || theme.primary,
          };
      }
    }, [variant, theme, level, isLastInLevel]);

    const currentVariantStyle = getVariantStyle();
    const levelIndent = compact ? 10 * level : 18 * level;

    const toggleAccordion = useCallback(() => {
      onItemPress?.(item);

      if (!item.content && (!item.children || !item.children.length)) return;

      if (singleOpenMode) return;

      runOnUI(() => {
        'worklet';
        const measured = measure(listRef);
        if (!measured) return;

        const isClosing = open.value;
        const targetHeight = isClosing ? 0 : measured.height;

        const animation =
          animationType === 'spring'
            ? withSpring(targetHeight, {
                duration: animationDuration,
                damping: 18,
                stiffness: 120,
              } as any)
            : withTiming(targetHeight, { duration: animationDuration });

        heightValue.value = animation;

        if (parentHeightValue) {
          const heightChange = isClosing ? -measured.height : measured.height;

          const newParentHeight = Math.max(
            0,
            parentHeightValue.value + heightChange
          );

          parentHeightValue.value =
            animationType === 'spring'
              ? withSpring(newParentHeight, {
                  duration: animationDuration,
                  damping: 18,
                  stiffness: 120,
                } as any)
              : withTiming(newParentHeight, { duration: animationDuration });
        }

        open.value = !open.value;
      })();
    }, [
      item,
      animationType,
      animationDuration,
      onItemPress,
      parentHeightValue,
      singleOpenMode,
      heightValue,
      listRef,
      open,
    ]);

    const renderContent = useCallback(() => {
      if (!item.content) return null;

      const contentStyle = [
        styles.content,
        {
          backgroundColor: currentVariantStyle.contentBgColor,
          borderTopColor: variant === 'flat' ? 'transparent' : theme.border,
          borderBottomLeftRadius: variant === 'modern' ? 14 : 8,
          borderBottomRightRadius: variant === 'modern' ? 14 : 8,
        },
        variant === 'splitted' && styles.splittedContent,
        variant === 'flat' && {
          paddingHorizontal: 18,
          paddingVertical: 14,
        },
        customStyles?.content,
      ];

      return <View style={contentStyle}>{item.content}</View>;
    }, [
      item.content,
      variant,
      currentVariantStyle,
      customStyles?.content,
      theme,
    ]);

    const renderChildren = useCallback(() => {
      if (!item.children?.length || level >= maxDepth) return null;

      return item.children.map((child, index) => (
        <AccordionItem
          key={child.id}
          item={child}
          level={level + 1}
          variant={variant}
          maxDepth={maxDepth}
          compact={compact}
          animationType={animationType}
          animationDuration={animationDuration}
          theme={theme}
          parentHeightValue={heightValue}
          customStyles={customStyles}
          onItemPress={onItemPress}
          isLastInLevel={index === (item.children?.length ?? 0) - 1}
          singleOpenMode={singleOpenMode}
        />
      ));
    }, [
      item.children,
      level,
      maxDepth,
      variant,
      compact,
      animationType,
      animationDuration,
      theme,
      customStyles,
      onItemPress,
      singleOpenMode,
      heightValue,
    ]);

    const responsiveStyles = useMemo(() => getResponsiveStyles(width), [width]);

    const containerStyle = useMemo(
      () => [
        styles.container,
        responsiveStyles.container,
        variant === 'modern' && styles.modernContainer,
        {
          marginLeft: levelIndent,
          width: level > 0 ? `calc(100% - ${levelIndent}px)` : '100%',
          backgroundColor: currentVariantStyle.backgroundColor,
          borderWidth: currentVariantStyle.borderWidth,
          borderColor: currentVariantStyle.borderColor,
          borderRadius: currentVariantStyle.borderRadius,
          elevation: currentVariantStyle.elevation,
          shadowOpacity: currentVariantStyle.elevation > 0 ? 0.15 : 0,
          shadowRadius: currentVariantStyle.elevation,
          ...(variant === 'flat' && {
            borderBottomWidth: level === 0 || !isLastInLevel ? 0.8 : 0,
            borderBottomColor: theme.border,
            marginVertical: level === 0 ? 8 : 4,
            marginHorizontal: 0,
            overflow: 'hidden',
          }),
          ...(variant === 'splitted' && { marginBottom: 10 }),
        },
        level > 0 && variant !== 'flat' && styles.nestedContainer,
        compact && styles.compactContainer,
        customStyles?.container,
      ],
      [
        levelIndent,
        currentVariantStyle,
        level,
        compact,
        customStyles?.container,
        variant,
        theme,
        responsiveStyles,
        isLastInLevel,
      ]
    );

    const titleContainerStyle = useMemo(
      () => [
        styles.titleContainer,
        responsiveStyles.titleContainer,
        { backgroundColor: currentVariantStyle.titleBg },
        compact && styles.compactTitleContainer,
        variant === 'flat' && [
          styles.flatTitleContainer,
          {
            paddingVertical: 14,
            paddingHorizontal: 18,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
        ],
        variant === 'modern' && styles.modernTitleContainer,
        level > 0 && styles.nestedTitleContainer,
        level > 0 && variant === 'flat' && styles.flatNestedTitleContainer,
      ],
      [currentVariantStyle.titleBg, compact, variant, level, responsiveStyles]
    );

    const titleTextStyle = useMemo(
      () => [
        styles.textTitle,
        responsiveStyles.textTitle,
        {
          color: currentVariantStyle.titleColor,
          fontWeight: level === 0 ? '600' : '500',
          fontSize: level === 0 ? 16 : 16 - level * 0.5,
          letterSpacing: 0.15,
        },
        compact && styles.compactTitle,
        customStyles?.title,
      ],
      [
        currentVariantStyle.titleColor,
        level,
        compact,
        customStyles?.title,
        responsiveStyles,
      ]
    );

    const chevronSize = useMemo(() => {
      if (compact) return 'small';
      return level === 0 ? 'medium' : 'small';
    }, [compact, level]);

    return (
      <View style={containerStyle}>
        {/* Nested Indicators */}
        {level > 0 &&
          currentVariantStyle.showNestedIndicator &&
          !currentVariantStyle.flatNested && (
            <View
              style={[
                styles.nestedIndicator,
                {
                  backgroundColor: currentVariantStyle.nestedIndicatorColor,
                  left: -12,
                  height: '100%',
                  opacity: 0.7,
                  width: 2,
                },
              ]}
            />
          )}

        {level > 0 && currentVariantStyle.flatNested && (
          <View
            style={[
              styles.flatNestedIndicator,
              {
                backgroundColor: currentVariantStyle.nestedIndicatorColor,
                left: -16 * level,
                height: '100%',
                opacity:
                  variant === 'flat' ? 0.6 - level * 0.05 : 0.4 - level * 0.05,
                width: variant === 'flat' ? 3 : 2,
              },
            ]}
          />
        )}

        <Pressable
          onPress={toggleAccordion}
          style={titleContainerStyle}
          android_ripple={{
            color: `rgba(${hexToRgb(theme.primary)}, 0.1)`,
            borderless: false,
          }}
        >
          {level > 0 && !currentVariantStyle.flatNested && (
            <View
              style={[
                styles.levelIndicator,
                { backgroundColor: currentVariantStyle.nestedIndicatorColor },
              ]}
            />
          )}

          {level > 0 && currentVariantStyle.flatNested && (
            <View
              style={[
                styles.flatLevelIndicator,
                { backgroundColor: currentVariantStyle.nestedIndicatorColor },
              ]}
            />
          )}

          {item.icon && <View style={styles.iconContainer}>{item.icon}</View>}

          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={titleTextStyle} numberOfLines={2}>
                {item.title}
              </Text>
              {item.description && (
                <Text
                  style={[
                    {
                      fontSize: compact ? 13 : 14,
                      color: `rgba(${hexToRgb(theme.text)}, 0.7)`,
                      marginTop: 4,
                      letterSpacing: 0.1,
                    },
                    customStyles?.description,
                  ]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              )}
            </View>

            {item.badge && (
              <Badge
                value={item.badge}
                theme={theme}
                customStyle={customStyles?.badge}
                badgeStyle={item.badgeStyle}
                badgeColor={item.badgeColor}
              />
            )}
          </View>

          {item.rightIcon && (
            <View style={{ marginLeft: 8 }}>{item.rightIcon}</View>
          )}

          {(item.content || (item.children && item.children.length > 0)) && (
            <Chevron
              progress={progress}
              color={theme.primary}
              customStyle={customStyles?.chevron}
              size={chevronSize}
              variant={
                variant === 'neumorphic'
                  ? 'neumorphic'
                  : variant === 'glassmorphism'
                    ? 'glassmorphism'
                    : variant === 'modern'
                      ? 'modern'
                      : 'default'
              }
            />
          )}
        </Pressable>

        <Animated.View style={heightAnimationStyle}>
          <Animated.View ref={listRef} style={[styles.contentContainer]}>
            {renderContent()}
            {renderChildren()}
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
);

export default AccordionItem;
