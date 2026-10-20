import { useTheme } from '@mui/material/styles';

import Icon from '@/components/atoms/Icon/Icon';
import Typography from '@/components/atoms/Typography/Typography';

import {
  IconContainer,
  Metric,
  Container,
  TitleWrapper,
  getTitleStyles,
  getValueStyles,
} from '@/components/organisms/CashAccelerationCard/CashAccelerationCard.styles';

import { CashAccelerationCardProps } from '@/components/organisms/CashAccelerationCard/CashAccelerationCard.types';

const CashAccelerationCard = ({ items }: CashAccelerationCardProps) => {
  const theme = useTheme();

  return (
    <Container>
      {items.map((item) => (
        <Metric key={item.id}>
          <IconContainer>
            <Icon
              name={item.iconName}
              size={40}
              color={item.iconColor ?? theme.palette.icon.primary}
            />
          </IconContainer>

          <TitleWrapper>
            <Typography variant="body1" sx={getTitleStyles()}>
              {item.title}
            </Typography>

            {item.infoIcon && (
              <Icon name="info-circle" size={16} color={theme.palette.icon.secondary} />
            )}
          </TitleWrapper>

          <Typography variant="heading2" sx={getValueStyles()}>
            {item.value}
          </Typography>
        </Metric>
      ))}
    </Container>
  );
};

export default CashAccelerationCard;
