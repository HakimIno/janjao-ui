import type { JanJaoColors } from '../../../shared/colors/types';

type Level =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11';

type Variant = 'solid' | 'outline' | 'soft' | 'surface';

export type BackgroundColorOption = {
  variant: Variant;
  color: keyof JanJaoColors;
  mode: 'light' | 'dark';
  level: Level; // ค่าระดับของสี
};

// export type OutlineBackgroundColorOption = {
//     type: 'outline';
//     color: keyof JanJaoColors;
//     mode: 'light' | 'dark';
//     level: Level
// };

// export type SoftBackgroundColorOption = {
//     type: 'soft';
//     color: keyof JanJaoColors;
//     mode: 'light' | 'dark';
//     level: Level
// };

// export type SurfaceBackgroundColorOption = {
//     type: 'surface';
//     color: keyof JanJaoColors;
//     mode: 'light' | 'dark';
//     level: Level,
// };

// export type GradientBackgroundColorOption = {
//     type: 'gradient';
//     gradientColors: GradientColorOptions;  // ตัวเลือก gradient
// };

// การรวมประเภททั้งหมดของ BackgroundColorOption
