import { janJaoColors } from '../../../../shared/colors';
import type { BackgroundColorOption } from '../button.type';

export const getBackgroundColor = (
  backgroundColorOption?: BackgroundColorOption
): string | undefined => {
  if (!backgroundColorOption) return undefined;
  const { variant, color, mode, level } = backgroundColorOption;

  switch (variant) {
    case 'solid':
    case 'soft':
    case 'outline':
    case 'surface':
      return janJaoColors[color][mode][Number(level)];
    default:
      return undefined;
  }
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  const validHex = /^([A-Fa-f0-9]{6})$/.test(cleanHex);
  if (!validHex) {
    throw new Error('Invalid HEX color.');
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
