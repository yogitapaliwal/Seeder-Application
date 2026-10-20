import MuiDialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import Icon from '@/components/atoms/Icon/Icon';
import Typography from '@/components/atoms/Typography/Typography';

import {
  DialogContentArea,
  DialogFooter,
  DialogHeader,
  getDialogBackdropStyles,
  getDialogPaperStyles,
  getSubTitleStyles,
  getTitleStyles,
  TitleColumn,
} from '@/components/molecules/Dialog/Dialog.styles';
import { DialogProps } from '@/components/molecules/Dialog/Dialog.types';

const Dialog = ({
  open,
  onClose,
  title,
  children,
  footer,
  disableClose = false,
  sx,
  subTitle,
}: DialogProps) => {
  const theme = useTheme();

  const handleClose = (_event: unknown, reason?: 'backdropClick' | 'escapeKeyDown') => {
    if (disableClose && (reason === 'backdropClick' || reason === 'escapeKeyDown')) {
      return;
    }
    onClose();
  };

  return (
    <MuiDialog
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: { sx: getDialogBackdropStyles() },
        paper: { sx: [getDialogPaperStyles(theme), ...(Array.isArray(sx) ? sx : [sx])] },
      }}
    >
      <DialogHeader>
        <TitleColumn>
          <Typography variant="heading1" sx={getTitleStyles()}>
            {title}
          </Typography>
          <Typography variant="heading3" sx={getSubTitleStyles()}>
            {subTitle}
          </Typography>
        </TitleColumn>

        {!disableClose && (
          <IconButton onClick={onClose} size="small" aria-label="Close dialog">
            <Icon name="close" size={32} />
          </IconButton>
        )}
      </DialogHeader>

      <DialogContentArea>{children}</DialogContentArea>

      {footer && <DialogFooter>{footer}</DialogFooter>}
    </MuiDialog>
  );
};

export default Dialog;
