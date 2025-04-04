import { StyleSheet, View } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import AccordionItem from './AccordionItem';
import { THEMES, type AccordionTheme } from './theme';

const DEFAULT_ANIMATION_DURATION = 350;
const DEFAULT_MAX_DEPTH = 5;

export type AccordionItemData = {
  id: string;
  title: string;
  content?: string | string[] | React.ReactNode;
  children?: AccordionItemData[];
  icon?: React.ReactNode;
  isOpen?: boolean;
  badge?: string | number;
  badgeStyle?: 'default' | 'modern' | 'pill';
  badgeColor?: string;
  rightIcon?: React.ReactNode;
  description?: string;
};

export type AccordionVariant =
  | 'light'
  | 'shadow'
  | 'bordered'
  | 'splitted'
  | 'flat'
  | 'modern';
export type AnimationType = 'timing' | 'spring';

export type AccordionProps = {
  data: AccordionItemData[];
  variant?: AccordionVariant;
  maxDepth?: number;
  compact?: boolean;
  animationType?: AnimationType;
  animationDuration?: number;
  theme?: string | Partial<AccordionTheme>;
  customStyles?: {
    container?: object;
    title?: object;
    content?: object;
    chevron?: object;
    badge?: object;
    description?: object;
  };
  onItemPress?: (item: AccordionItemData) => void;
  defaultOpenIds?: string[];
  singleOpen?: boolean;
  showItemSeparator?: boolean;
  chevronPosition?: 'left' | 'right';
  roundedCorners?: boolean;
};

const AccordionUnified: React.FC<AccordionProps> = ({
  data,
  variant = 'material' as AccordionVariant,
  maxDepth = DEFAULT_MAX_DEPTH,
  compact = false,
  animationType = 'spring',
  animationDuration = DEFAULT_ANIMATION_DURATION,
  theme = 'material',
  customStyles,
  onItemPress,
  defaultOpenIds,
  singleOpen = false,
  roundedCorners = true,
}) => {
  const themeObject = useMemo(() => {
    const defaultTheme = THEMES.material;

    if (!theme) {
      return defaultTheme;
    }

    if (typeof theme === 'string') {
      return THEMES[theme] || defaultTheme;
    }

    return { ...defaultTheme, ...theme };
  }, [theme]);

  const [openItemsMap, setOpenItemsMap] = useState<{
    [key: string]: string | null;
  }>(() => {
    const initialMap: { [key: string]: string | null } = {};

    if (defaultOpenIds && defaultOpenIds.length > 0) {
      initialMap.root = defaultOpenIds[0] ?? null;

      const findParentChildRelationships = (items: AccordionItemData[]) => {
        for (const item of items) {
          if (item.children?.length && defaultOpenIds.includes(item.id)) {
            const openChild = item.children.find((child) =>
              defaultOpenIds.includes(child.id)
            );
            initialMap[item.id] = openChild?.id ?? null;

            findParentChildRelationships(item.children);
          }
        }
      };

      if (singleOpen) {
        findParentChildRelationships(data);
      }
    }

    return initialMap;
  });

  const handleItemPress = useCallback(
    (item: AccordionItemData) => {
      if (singleOpen) {
        let parentId = 'root';

        const findParent = (
          items: AccordionItemData[],
          id: string,
          currentParent = 'root'
        ): boolean => {
          for (const current of items) {
            if (current.id === id) {
              parentId = currentParent;
              return true;
            }
            if (
              current.children?.length &&
              findParent(current.children, id, current.id)
            ) {
              return true;
            }
          }
          return false;
        };

        findParent(data, item.id);

        setOpenItemsMap((prevMap) => {
          const newMap = { ...prevMap };
          newMap[parentId] = prevMap[parentId] === item.id ? null : item.id;
          return newMap;
        });
      }

      onItemPress?.(item);
    },
    [singleOpen, data, onItemPress]
  );

  const processedData = useMemo(() => {
    if (!singleOpen && !defaultOpenIds?.length) {
      return data;
    }

    const processItem = (
      item: AccordionItemData,
      parentId: string = 'root'
    ): AccordionItemData => {
      let isOpen = false;

      if (singleOpen) {
        isOpen = openItemsMap[parentId] === item.id;
      } else {
        isOpen = defaultOpenIds?.includes(item.id) || false;
      }

      const processedChildren = item.children?.map((child) =>
        processItem(child, item.id)
      );

      return {
        ...item,
        isOpen: isOpen,
        children: processedChildren,
      };
    };

    return data.map((item) => processItem(item));
  }, [data, defaultOpenIds, singleOpen, openItemsMap]);

  const containerStyle = useMemo(
    () => [
      styles.accordionContainer,
      roundedCorners && { overflow: 'hidden' as const },
      customStyles?.container,
    ],
    [roundedCorners, customStyles?.container]
  );

  return (
    <View style={containerStyle}>
      {processedData.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          level={0}
          variant={variant}
          maxDepth={maxDepth}
          compact={compact}
          animationType={animationType}
          animationDuration={animationDuration}
          theme={themeObject as AccordionTheme}
          customStyles={customStyles}
          onItemPress={handleItemPress}
          isLastInLevel={index === processedData.length - 1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    width: '100%',
    paddingHorizontal: 8,
  },
  container: {
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    position: 'relative',
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  nestedContainer: {
    marginVertical: 2,
    borderRadius: 0,
    paddingLeft: 10,
    marginLeft: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  compactContainer: {
    marginVertical: 2,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },
  textTitle: {
    fontSize: 16,
    flex: 1,
    letterSpacing: 0.1,
    fontWeight: '500',
    color: '#1F2937',
  },
  compactTitle: {
    fontSize: 14,
    letterSpacing: 0.05,
  },
  titleContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  nestedTitleContainer: {
    paddingVertical: 12,
    paddingLeft: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  compactTitleContainer: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },
  flatTitleContainer: {
    paddingHorizontal: 0,
    paddingVertical: 14,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },
  content: {
    padding: 16,
    borderTopWidth: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },
  splittedContent: {
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
  },
  textContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  chevronContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
  },
  chevron: {
    width: Math.min(6, 6),
    height: Math.min(6, 6),
    borderRightWidth: 2.5,
    borderBottomWidth: 2.5,
    transform: [{ rotate: '45deg' }],
    borderColor: '#6B7280',
  },
  iconContainer: {
    marginRight: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 8,
    padding: 6,
  },
  nestedIndicator: {
    position: 'absolute',
    width: 2,
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  levelIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  flatNestedTitleContainer: {
    paddingLeft: 16,
    backgroundColor: 'transparent',
  },
  flatNestedIndicator: {
    position: 'absolute',
    width: 1,
    top: 0,
    height: '100%',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  flatLevelIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default memo(AccordionUnified);
