import Typography from '@/components/atoms/Typography/Typography';
import Icon from '@/components/atoms/Icon/Icon';

import {
  Container,
  Header,
  Content,
  TitleRow,
  TagWrapper,
  getTitleStyles,
} from '@/components/molecules/DashboardInfoCard/DashboardInfoCard.styles';

import { DashboardInfoCardProps } from '@/components/molecules/DashboardInfoCard/DashboardInfoCard.types';
import { formatCurrency } from '@/utils/currencyformatter';

const DashboardInfoCard = ({
  header,
  title,
  value,
  tag,
  showInfoIcon = true,
}: DashboardInfoCardProps) => {
  return (
    <Container>
      {tag && <TagWrapper>{tag}</TagWrapper>}

      <Header>{header}</Header>

      <Content>
        <TitleRow>
          <Typography variant="body1" sx={getTitleStyles()}>
            {title}
          </Typography>

          {showInfoIcon && <Icon name="info-circle" size={16} />}
        </TitleRow>

        <Typography variant="heading2">{formatCurrency(value)}</Typography>
      </Content>
    </Container>
  );
};

export default DashboardInfoCard;
