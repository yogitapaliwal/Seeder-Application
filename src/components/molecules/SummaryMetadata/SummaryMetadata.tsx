import Typography from '@/components/atoms/Typography/Typography';

import {
  Container,
  RightSection,
  getLabelStyles,
  getSecondaryValueStyles,
  getValueStyles,
} from '@/components/molecules/SummaryMetadata/SummaryMetadata.styles';
import { SummaryMetadataProps } from '@/components/molecules/SummaryMetadata/SummaryMetadata.types';

const SummaryMetadata = ({ label, value, secondaryValue }: SummaryMetadataProps) => {
  return (
    <Container>
      <Typography variant="body1" sx={getLabelStyles()}>
        {label}
      </Typography>

      <RightSection>
        {secondaryValue && (
          <Typography variant="caption" sx={getSecondaryValueStyles()}>
            {secondaryValue}
          </Typography>
        )}

        <Typography variant="body1" sx={getValueStyles()}>
          {value}
        </Typography>
      </RightSection>
    </Container>
  );
};

export default SummaryMetadata;
