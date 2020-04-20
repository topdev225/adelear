export const palette = {
  white: {
    light: '#FFFFFF' as const
  },
  blue: {
    dark: '#285C99' as const,
    extraLight: '#DAE9F5' as const,
    light: '#93b5ee' as const,
    medium: '#4A90E2' as const
  },
  green: {
    extraLight: '#6fc610' as const,
    light: '#5fb600' as const
  },
  gray: {
    dark: '#333333' as const,
    extraLight: '#f7f7f7' as const,
    light: '#cecece' as const,
    medium: '#777777' as const
  },
  red: {
    light: '#FFBABA' as const,
    medium: '#D8000C' as const
  }
};

export const colors = {
  ...palette,
  border: {
    blue: palette.blue.extraLight,
    dark: palette.gray.dark,
    light: palette.gray.light,
    green: palette.green.light
  },
  text: {
    dark: palette.gray.dark,
    light: palette.gray.light,
    informative: palette.blue.medium,
    medium: palette.gray.medium
  }
};
