import { FC, SVGProps } from 'react';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';

// Multi-color / fixed-palette assets — rendered as plain images, not recolorable.
import logo from '@/assets/icons/logo.svg';
import cheque from '@/assets/icons/cheque.svg';
import coinBag from '@/assets/icons/coins-bag.svg';
import warning from '@/assets/icons/warning.svg';
import financePlanning from '@/assets/icons/finance-planning.svg';
import reviewGif from '@/assets/icons/review.gif';

// Single-tone glyphs — inlined as components so their color can be controlled via CSS.
import Home from '@/assets/icons/home.svg?react';
import CashAcceleration from '@/assets/icons/cash-acceleration.svg?react';
import Flash from '@/assets/icons/flash.svg?react';
import Sort from '@/assets/icons/sort.svg?react';
import NoTickSquare from '@/assets/icons/no-tick-square.svg?react';
import InfoCircle from '@/assets/icons/info-circle.svg?react';
import ArrowBottom from '@/assets/icons/arrow-bottom.svg?react';
import ArrowRight from '@/assets/icons/arrow-right.svg?react';
import ArrowLeft from '@/assets/icons/arrow-left.svg?react';
import Calendar from '@/assets/icons/calendar.svg?react';
import Document from '@/assets/icons/document.svg?react';
import ReceiptText from '@/assets/icons/receipt-text.svg?react';
import PercentageSquare from '@/assets/icons/percentage-square.svg?react';
import Refresh from '@/assets/icons/refresh.svg?react';
import Close from '@/assets/icons/close.svg?react';
import BackBtn from '@/assets/icons/back-arrow.svg?react';

export type IconName =
  | 'logo'
  | 'home'
  | 'cash-acceleration'
  | 'flash'
  | 'sort'
  | 'no-tick-square'
  | 'info-circle'
  | 'arrow-right'
  | 'arrow-left'
  | 'calendar'
  | 'percentage-square'
  | 'receipt-text'
  | 'document'
  | 'refresh'
  | 'close'
  | 'cheque'
  | 'coin-bag'
  | 'warning'
  | 'finance-planning'
  | 'back-btn'
  | 'review-gif'
  | 'arrow-bottom';

type SvgIconComponent = FC<SVGProps<SVGSVGElement>>;

const svgIcons: Partial<Record<IconName, SvgIconComponent>> = {
  home: Home,
  'cash-acceleration': CashAcceleration,
  flash: Flash,
  sort: Sort,
  'no-tick-square': NoTickSquare,
  'info-circle': InfoCircle,
  'arrow-bottom': ArrowBottom,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  calendar: Calendar,
  document: Document,
  'receipt-text': ReceiptText,
  'percentage-square': PercentageSquare,
  refresh: Refresh,
  close: Close,
  'back-btn': BackBtn,
};

const imageIcons: Partial<Record<IconName, string>> = {
  logo,
  cheque,
  'coin-bag': coinBag,
  warning,
  'finance-planning': financePlanning,
  'review-gif': reviewGif,
};

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  sx?: SxProps<Theme>;
}

const Icon = ({ name, size = 24, color = 'currentColor', sx }: IconProps) => {
  const SvgComponent = svgIcons[name];
  const sxArray = Array.isArray(sx) ? sx : [sx];

  if (SvgComponent) {
    return <Box component={SvgComponent} width={size} height={size} sx={[{ color }, ...sxArray]} />;
  }

  return (
    <Box
      component="img"
      src={imageIcons[name]}
      width={size}
      height={size}
      alt={name}
      sx={sxArray}
    />
  );
};

export default Icon;
