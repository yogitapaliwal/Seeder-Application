import { SxProps, Theme } from '@mui/material';

export interface GreetingProps {
  title: string;
  date: string;
  showWaveEmoji?: boolean;
  sx?: SxProps<Theme>;
}
