import '@mui/material/styles';
import '@mui/material/Typography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    title: React.CSSProperties;
    heading1: React.CSSProperties;
    heading2: React.CSSProperties;
    heading3: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    heading1?: React.CSSProperties;
    heading2?: React.CSSProperties;
    heading3?: React.CSSProperties;
  }

  interface Palette {
    brand: {
      white500: string;
      purple600: string;
      purple500: string;
      purple400: string;
      white600: string;
    };

    border: {
      primary: string;
      secondary: string;
    };

    icon: {
      primary: string;
      secondary: string;
    };

    surface: {
      elevation0: string;
      elevation1: string;
      elevation2: string;
    };

    text: {
      primary: string;
      secondary: string;
      disabled: string;
      white: string;
    };
  }

  interface PaletteOptions {
    brand?: {
      white500: string;
      purple600: string;
      purple500: string;
      purple400: string;
      white600: string;
    };

    border?: {
      primary: string;
      secondary: string;
    };

    icon?: {
      primary: string;
      secondary: string;
    };

    surface?: {
      elevation0: string;
      elevation1: string;
      elevation2: string;
    };

    text?: {
      primary: string;
      secondary: string;
      disabled: string;
      white: string;
    };
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    title: true;
    heading1: true;
    heading2: true;
    heading3: true;
  }
}
