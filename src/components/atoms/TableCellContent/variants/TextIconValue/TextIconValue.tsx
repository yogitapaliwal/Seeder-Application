import Typography from '@/components/atoms/Typography/Typography';
import {
  Root,
  EllipsisContainer,
} from '@/components/atoms/TableCellContent/TableCellContent.styles';
import { TextIconValueProps } from '@/components/atoms/TableCellContent/TableCellContent.types';
import {
  Content,
  IconContainer,
} from '@/components/atoms/TableCellContent/variants/TextIconValue/TextIconValue.styles';

const TextIconValue = ({ text, icon, iconPosition = 'left', textColor }: TextIconValueProps) => {
  return (
    <Root>
      <Content>
        {iconPosition === 'left' && <IconContainer>{icon}</IconContainer>}

        <EllipsisContainer>
          <Typography variant="body2" sx={textColor}>
            {text}
          </Typography>
        </EllipsisContainer>

        {iconPosition === 'right' && <IconContainer>{icon}</IconContainer>}
      </Content>
    </Root>
  );
};

export default TextIconValue;
