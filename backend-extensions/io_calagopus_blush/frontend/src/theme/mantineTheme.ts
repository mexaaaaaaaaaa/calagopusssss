import {
  createTheme,
  type CSSVariablesResolver,
  type MantineColorsTuple,
  type MantineThemeOverride,
} from '@mantine/core';
import { BLUSH_PALETTE_SCALE, blushTokens } from './tokens';

const blushTuple: MantineColorsTuple = [...BLUSH_PALETTE_SCALE];

export const blushThemeConfig: MantineThemeOverride = {
  primaryColor: 'blush',
  primaryShade: { light: 4, dark: 4 },
  colors: {
    blush: blushTuple,
  },
  fontFamily: blushTokens.typography.fontBody,
  fontFamilyMonospace: blushTokens.typography.fontMono,
  headings: {
    fontFamily: blushTokens.typography.fontDisplay,
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '1.5rem', lineHeight: '1.25' },
      h2: { fontSize: '1.125rem', lineHeight: '1.35' },
      h3: { fontSize: '0.9375rem', lineHeight: '1.4' },
      h4: { fontSize: '0.875rem', lineHeight: '1.45' },
    },
  },
  defaultRadius: 'md',
  autoContrast: true,
  luminanceThreshold: 0.35,
  radius: {
    xs: '4px',
    sm: blushTokens.radii.sm,
    md: blushTokens.radii.md,
    lg: blushTokens.radii.lg,
    xl: blushTokens.radii.xl,
  },
  shadows: {
    xs: blushTokens.shadows.card,
    sm: blushTokens.shadows.card,
    md: blushTokens.shadows.popover,
  },
  focusRing: 'auto',
  cursorType: 'pointer',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        withBorder: true,
        radius: 'lg',
      },
    },
    Badge: {
      defaultProps: {
        variant: 'light',
        radius: 'sm',
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
      },
    },
    Modal: {
      defaultProps: {
        radius: 'lg',
        centered: true,
        transitionProps: { duration: 150, transition: 'fade' },
      },
    },
    Menu: {
      defaultProps: {
        radius: 'lg',
        transitionProps: { duration: 120, transition: 'fade' },
      },
    },
    Tooltip: {
      defaultProps: {
        radius: 'sm',
        transitionProps: { duration: 120, transition: 'fade' },
      },
    },
  },
};

export const blushMantineTheme = createTheme(blushThemeConfig);

export const blushCssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    '--mantine-font-family': blushTokens.typography.fontBody,
    '--mantine-font-family-headings': blushTokens.typography.fontDisplay,
    '--mantine-font-family-monospace': blushTokens.typography.fontMono,
    '--chart-series-1-border': blushTokens.colors.primary,
    '--chart-series-1-fill': 'rgba(244, 166, 193, 0.22)',
  },
  light: {
    '--mantine-color-body': blushTokens.colors.background,
    '--mantine-color-text': blushTokens.colors.mainText,
    '--mantine-color-dimmed': blushTokens.colors.secondaryText,
    '--mantine-color-default': blushTokens.colors.surface,
    '--mantine-color-default-hover': blushTokens.colors.primarySubtle,
    '--mantine-color-default-border': blushTokens.colors.border,
    '--mantine-color-placeholder': blushTokens.colors.secondaryText,
    '--chart-grid-color': blushTokens.colors.border,
    '--chart-tick-color': blushTokens.colors.secondaryText,
    '--chart-series-2-border': blushTokens.colors.mainText,
    '--chart-series-2-fill': 'rgba(41, 35, 42, 0.12)',
  },
  dark: {
    '--mantine-color-body': blushTokens.darkColors.background,
    '--mantine-color-text': blushTokens.darkColors.mainText,
    '--mantine-color-dimmed': blushTokens.darkColors.secondaryText,
    '--mantine-color-default': blushTokens.darkColors.surface,
    '--mantine-color-default-hover': blushTokens.darkColors.secondarySurface,
    '--mantine-color-default-border': blushTokens.darkColors.border,
    '--mantine-color-placeholder': blushTokens.darkColors.secondaryText,
    '--chart-grid-color': blushTokens.darkColors.border,
    '--chart-tick-color': blushTokens.darkColors.secondaryText,
    '--chart-series-2-border': '#C4B5FD',
    '--chart-series-2-fill': 'rgba(196, 181, 253, 0.16)',
  },
});
