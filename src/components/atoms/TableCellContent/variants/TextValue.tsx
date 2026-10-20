import { TextValueProps } from '@/components/atoms/TableCellContent/TableCellContent.types';
import {
  EllipsisContainer,
  Root,
  getTextValueStyles,
} from '@/components/atoms/TableCellContent/TableCellContent.styles';
import Typography from '@/components/atoms/Typography/Typography';

const TextValue = ({ text, color }: TextValueProps) => {
  return (
    <Root>
      <EllipsisContainer>
        <Typography variant="body2" noWrap sx={getTextValueStyles(color)}>
          {text}
        </Typography>
      </EllipsisContainer>
    </Root>
  );
};

export default TextValue;
