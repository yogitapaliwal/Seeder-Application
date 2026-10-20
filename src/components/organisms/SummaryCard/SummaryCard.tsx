import Divider from '@/components/atoms/Divider/Divider';
import Typography from '@/components/atoms/Typography/Typography';
import SummaryMetadata from '@/components/molecules/SummaryMetadata';
import {
  AutoSelectWrapper,
  Container,
  DividerWrapper,
  Footer,
  Header,
  MetadataSection,
  TotalSection,
  getTitleStyles,
  getTotalLabelStyles,
  getTotalValueStyles,
} from '@/components/organisms/SummaryCard/SummaryCard.styles';
import { SummaryCardProps } from '@/components/organisms/SummaryCard/SummaryCard.types';

const SummaryCard = ({
  title = 'Summary',
  topItems,
  autoSelect,
  bottomItems,
  total,
  footer,
  infoIcon,
}: SummaryCardProps) => {
  const hasTopItems = Boolean(topItems?.length);
  const hasBottomItems = Boolean(bottomItems?.length);
  const hasTotal = Boolean(total?.label && total?.value);

  return (
    <Container>
      <Header>
        <Typography variant="heading3" sx={getTitleStyles()}>
          {title}
        </Typography>
        {infoIcon}
      </Header>

      {hasTopItems && (
        <MetadataSection>
          {topItems!.map((item) => (
            <SummaryMetadata
              key={item.id}
              label={item.label}
              value={item.value}
              secondaryValue={item.secondaryValue}
            />
          ))}
        </MetadataSection>
      )}

      {autoSelect && <AutoSelectWrapper>{autoSelect}</AutoSelectWrapper>}

      {hasBottomItems && (
        <MetadataSection>
          {bottomItems!.map((item) => (
            <SummaryMetadata
              key={item.id}
              label={item.label}
              value={item.value}
              secondaryValue={item.secondaryValue}
            />
          ))}
        </MetadataSection>
      )}

      {hasTotal && (
        <>
          <DividerWrapper>
            <Divider color="border.primary" aria-hidden="true" />
          </DividerWrapper>

          <TotalSection>
            <Typography variant="heading3" sx={getTotalLabelStyles()}>
              {total!.label}
            </Typography>
            <Typography variant="heading2" sx={getTotalValueStyles()}>
              {total!.value}
            </Typography>
          </TotalSection>
        </>
      )}

      {footer && <Footer>{footer}</Footer>}
    </Container>
  );
};

export default SummaryCard;
