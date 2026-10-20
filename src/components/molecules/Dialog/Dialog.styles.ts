import Box from '@mui/material/Box';
import { styled, Theme } from '@mui/material/styles';

// Not a reusable design token — single-use overlay color specific to Dialog.
// Flag to design if this should be promoted to a real palette token later.
export const DIALOG_OVERLAY_COLOR = '#100F1CB8';

export const getDialogPaperStyles = (theme: Theme) => ({
  width: 640,
  borderRadius: '12px',
  border: `1px solid ${theme.palette.border.secondary}`,
  backgroundColor: theme.palette.grey[100],
  boxShadow: [
    '0px 11px 15px 0px #00000033',
    '0px 9px 46px 0px #0000001F',
    '0px 24px 38px 0px #00000024',
  ].join(', '),
});

export const getDialogBackdropStyles = () => ({
  backgroundColor: DIALOG_OVERLAY_COLOR,
  backdropFilter: 'blur(16px)',
});

export const DialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
  padding: '24px 40px',
}));

export const TitleColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const DialogContentArea = styled(Box)(({ theme }) => ({
  padding: '24px 40px',
  backgroundColor: theme.palette.grey[100],
}));

export const DialogFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(1.5),
  padding: '32px 40px 24px',
}));

export const getTitleStyles = () => ({
  color: 'text.primary',
});

export const getSubTitleStyles = () => ({
  color: 'text.disabled',
});
