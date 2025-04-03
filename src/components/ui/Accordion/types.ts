import type { ReactNode } from 'react';
import type { AccordionTheme } from './theme';

export type AccordionItemData = {
  id: string;
  title: string;
  content?: string | string[] | ReactNode;
  children?: AccordionItemData[];
  icon?: ReactNode;
  isOpen?: boolean;
  badge?: string | number;
  badgeStyle?: 'default' | 'modern' | 'pill';
  badgeColor?: string;
  description?: string;
  rightIcon?: ReactNode;
};

export type AccordionVariant =
  | 'light'
  | 'shadow'
  | 'bordered'
  | 'splitted'
  | 'flat'
  | 'modern'
  | 'neumorphic'
  | 'glassmorphism'
  | 'ios'
  | 'material';

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
  chevronPosition?: 'right' | 'left';
  roundedCorners?: boolean;
};
