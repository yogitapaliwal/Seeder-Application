import Typography from '@/components/atoms/Typography/Typography';
import {
  ButtonContainer,
  CardContainer,
  TextContainer,
  getDescriptionStyles,
  getHighlightStyles,
  getTitleStyles,
} from '@/components/molecules/CashKickCard/CashKickCard.styles';
import { CashKickCardProps } from '@/components/molecules/CashKickCard/CashKickCard.types';

const CashKickCard = ({ title, description, highlightText, button }: CashKickCardProps) => {
  const parts = description.split(highlightText);

  return (
    <CardContainer>
      <TextContainer>
        <Typography variant="heading2" sx={getTitleStyles()}>
          {title}
        </Typography>

        <Typography variant="body1" sx={getDescriptionStyles()}>
          {parts[0]}
          <Typography component="span" variant="body1" sx={getHighlightStyles()}>
            {highlightText}
          </Typography>
          {parts[1]}
        </Typography>
      </TextContainer>

      <ButtonContainer>{button}</ButtonContainer>
    </CardContainer>
  );
};

export default CashKickCard;
