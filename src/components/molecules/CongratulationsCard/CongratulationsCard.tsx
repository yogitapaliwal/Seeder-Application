import Typography from '@/components/atoms/Typography/Typography';
import {
  CardContainer,
  ContentContainer,
  TextContainer,
  getDescriptionStyles,
  getHighlightStyles,
  getTitleStyles,
} from '@/components/molecules/CongratulationsCard/CongratulationsCard.styles';
import { CongratulationsCardProps } from '@/components/molecules/CongratulationsCard/CongratulationsCard.types';

const CongratulationsCard = ({
  title,
  description,
  highlightText,
  backgroundImage,
  children,
}: CongratulationsCardProps) => {
  return (
    <CardContainer backgroundImage={backgroundImage}>
      <ContentContainer>
        <TextContainer>
          <Typography variant="heading2" sx={getTitleStyles()}>
            {title}
          </Typography>

          <Typography variant="body1" sx={getDescriptionStyles()}>
            {description}
            {highlightText && (
              <Typography component="span" variant="body1" sx={getHighlightStyles()}>
                {highlightText}
              </Typography>
            )}
          </Typography>
        </TextContainer>

        {children}
      </ContentContainer>
    </CardContainer>
  );
};

export default CongratulationsCard;
