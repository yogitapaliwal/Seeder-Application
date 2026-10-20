import { useTheme } from '@mui/material/styles';

import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography/Typography';

import {
  Container,
  getActionButtonStyles,
  getSubtitleStyles,
  getTitleStyles,
  TextContainer,
} from '@/components/molecules/EmptyState/EmptyState.styles';
import { EmptyStateProps } from '@/components/molecules/EmptyState/EmptyState.types';

const EmptyState = ({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  variant,
  sx,
}: EmptyStateProps) => {
  const theme = useTheme();

  return (
    <Container sx={sx}>
      {icon}

      <TextContainer>
        <Typography variant="heading3" sx={getTitleStyles(theme, variant)}>
          {title}
        </Typography>

        {subtitle && (
          <Typography variant="caption" sx={getSubtitleStyles(theme)}>
            {subtitle}
          </Typography>
        )}

        {actionLabel && onAction && (
          <Button variant="text" size="medium" onClick={onAction} sx={getActionButtonStyles()}>
            {actionLabel}
          </Button>
        )}
      </TextContainer>
    </Container>
  );
};

export default EmptyState;
