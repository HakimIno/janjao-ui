export type AccordionTheme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  border: string;
  shadow: string;
  accent?: string;
};

export const THEMES: Record<string, AccordionTheme> = {
  blue: {
    primary: '#1A56DB',
    secondary: '#E3EDFB',
    background: '#FFFFFF',
    text: '#1F2A37',
    border: '#D1D5DB',
    shadow: 'rgba(0, 0, 0, 0.1)',
    accent: '#4F8CE9',
  },
  purple: {
    primary: '#7E3AF2',
    secondary: '#EDE9FE',
    background: '#FFFFFF',
    text: '#1F2A37',
    border: '#D1D5DB',
    shadow: 'rgba(0, 0, 0, 0.1)',
    accent: '#A78BFA',
  },
  green: {
    primary: '#0E9F6E',
    secondary: '#DEF7EC',
    background: '#FFFFFF',
    text: '#1F2A37',
    border: '#D1D5DB',
    shadow: 'rgba(0, 0, 0, 0.1)',
    accent: '#34D399',
  },
  orange: {
    primary: '#FF5A1F',
    secondary: '#FEECDC',
    background: '#FFFFFF',
    text: '#1F2A37',
    border: '#D1D5DB',
    shadow: 'rgba(0, 0, 0, 0.1)',
    accent: '#FFA266',
  },
  gray: {
    primary: '#4B5563',
    secondary: '#F3F4F6',
    background: '#FFFFFF',
    text: '#1F2A37',
    border: '#D1D5DB',
    shadow: 'rgba(0, 0, 0, 0.1)',
    accent: '#9CA3AF',
  },
  dark: {
    primary: '#374151',
    secondary: '#1F2937',
    background: '#111827',
    text: '#F9FAFB',
    border: '#374151',
    shadow: 'rgba(0, 0, 0, 0.25)',
    accent: '#6B7280',
  },
  // Modern themes with updated colors
  modernBlue: {
    primary: '#2563EB',
    secondary: '#EFF6FF',
    background: '#FFFFFF',
    text: '#1E293B',
    border: '#E2E8F0',
    shadow: 'rgba(37, 99, 235, 0.12)',
    accent: '#60A5FA',
  },
  modernPurple: {
    primary: '#8B5CF6',
    secondary: '#F5F3FF',
    background: '#FFFFFF',
    text: '#1E293B',
    border: '#E2E8F0',
    shadow: 'rgba(139, 92, 246, 0.12)',
    accent: '#A78BFA',
  },
  // New modern themes
  neumorphic: {
    primary: '#6366F1',
    secondary: '#F9FAFB',
    background: '#F1F5F9',
    text: '#334155',
    border: '#E2E8F0',
    shadow: 'rgba(15, 23, 42, 0.08)',
    accent: '#818CF8',
  },
  glassmorphism: {
    primary: '#3B82F6',
    secondary: 'rgba(255, 255, 255, 0.8)',
    background: 'rgba(255, 255, 255, 0.7)',
    text: '#1E293B',
    border: 'rgba(255, 255, 255, 0.25)',
    shadow: 'rgba(59, 130, 246, 0.15)',
    accent: '#60A5FA',
  },
  ios: {
    primary: '#007AFF',
    secondary: '#F2F2F7',
    background: '#FFFFFF',
    text: '#000000',
    border: '#E5E5EA',
    shadow: 'rgba(0, 0, 0, 0.05)',
    accent: '#5AC8FA',
  },
  material: {
    primary: '#6200EE',
    secondary: '#F5F5F5',
    background: '#FFFFFF',
    text: '#121212',
    border: '#E0E0E0',
    shadow: 'rgba(0, 0, 0, 0.08)',
    accent: '#03DAC6',
  },
  pastel: {
    primary: '#F472B6',
    secondary: '#FDFAFF',
    background: '#FFFFFF',
    text: '#334155',
    border: '#FBD5E8',
    shadow: 'rgba(244, 114, 182, 0.12)',
    accent: '#F9A8D4',
  },
  contemporary: {
    primary: '#0284C7',
    secondary: '#F0F9FF',
    background: '#FFFFFF',
    text: '#0F172A',
    border: '#E0F2FE',
    shadow: 'rgba(2, 132, 199, 0.1)',
    accent: '#38BDF8',
  },
};

// Helper function to convert hex to RGB for rgba usage
export const hexToRgb = (hex: string): string => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse the hex values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Return as RGB string
  return `${r}, ${g}, ${b}`;
};
