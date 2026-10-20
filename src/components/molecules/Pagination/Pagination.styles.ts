import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import {
  NavigationButtonProps,
  PageItemProps,
} from '@/components/molecules/Pagination/Pagination.types';

export const Container = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const NavigationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const PageItemsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const NavigationButton = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'disabled',
})<NavigationButtonProps>(({ theme, disabled }) => ({
  width: 32,
  height: 32,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',

  cursor: disabled ? 'not-allowed' : 'pointer',
  pointerEvents: disabled ? 'none' : 'auto',

  ...(disabled
    ? {
        backgroundColor: theme.palette.surface.elevation2,
        opacity: '0.4',
      }
    : {
        border: `1px solid ${theme.palette.brand.white500}`,
        backgroundColor: theme.palette.surface.elevation0,
      }),
}));

export const PageItem = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'active',
})<PageItemProps>(({ theme, active }) => ({
  width: 32,
  height: 32,
  borderRadius: 8,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${active ? theme.palette.brand.purple400 : theme.palette.border.primary}`,
  boxSizing: 'border-box',
  backgroundColor: active ? theme.palette.brand.purple600 : theme.palette.grey[100],
}));

export const getPageItemLabelStyles = (isPageActive: boolean) => ({
  color: isPageActive ? 'brand.purple400' : 'text.secondary',
});
