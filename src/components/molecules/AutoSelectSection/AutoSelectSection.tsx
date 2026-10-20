import Button from '@/components/atoms/Button/Button';
import Typography from '@/components/atoms/Typography/Typography';
import { AutoSelectSectionProps } from '@/components/molecules/AutoSelectSection/ AutoSelectSection.types';
import {
  getRemainingAmountStyles,
  getSelectedAmountStyles,
  getSelectedOfLabelStyles,
  getTitleStyles,
  getTotalAmountStyles,
  Header,
  Root,
  SelectedAmount,
  SelectedAmountSentence,
  TitleRow,
} from '@/components/molecules/AutoSelectSection/AutoSelectSection.styles';

const AutoSelectSection = ({
  title,
  resetLabel = 'Reset',
  onReset,
  slider,
  selectedAmount,
  totalAmount,
  remainingAmount,
  isRemainingZero,
  isResetBtnDisabled,
  infoTooltip,
}: AutoSelectSectionProps) => {
  return (
    <Root>
      <Header>
        <TitleRow>
          <Typography variant="body1" sx={getTitleStyles()}>
            {title}
          </Typography>
          {infoTooltip}
        </TitleRow>

        <Button variant="tertiary" disabled={isResetBtnDisabled} size="small" onClick={onReset}>
          {resetLabel}
        </Button>
      </Header>

      {slider}

      <SelectedAmount>
        <SelectedAmountSentence>
          <Typography component="span" variant="body1" sx={getSelectedAmountStyles()}>
            {selectedAmount}
          </Typography>
          <Typography component="span" variant="body2" sx={getSelectedOfLabelStyles()}>
            {' '}
            selected of{' '}
          </Typography>
          <Typography component="span" variant="body2" sx={getTotalAmountStyles()}>
            {totalAmount}
          </Typography>
        </SelectedAmountSentence>

        {remainingAmount && (
          <Typography variant="caption" sx={getRemainingAmountStyles(isRemainingZero)}>
            {remainingAmount} remaining
          </Typography>
        )}
      </SelectedAmount>
    </Root>
  );
};

export default AutoSelectSection;
