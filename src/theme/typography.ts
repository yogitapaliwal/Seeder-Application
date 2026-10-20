import { TypographyVariantsOptions } from '@mui/material/styles';

export const typography: TypographyVariantsOptions = {
  fontFamily: 'Manrope, sans-serif',

  title: {
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: '42px',
    letterSpacing: '-0.015em',
  },
  // Added heading1 its not mentiod in typography page on figma. but its mentiod on figma screnn.
  heading1: {
    fontWeight: 600,
    fontSize: '28px',
    lineHeight: '28px',
    letterSpacing: '-0.005em',
  },

  heading2: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '24px',
    letterSpacing: '-0.005em',
  },

  heading3: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '27px',
    letterSpacing: '0',
  },

  body1: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22.4px',
    letterSpacing: '0',
  },

  body2: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '14px',
    letterSpacing: '0.01em',
  },

  caption: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '12px',
    letterSpacing: '0.02em',
  },

  button: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0',
    textTransform: 'capitalize',
  },
};
