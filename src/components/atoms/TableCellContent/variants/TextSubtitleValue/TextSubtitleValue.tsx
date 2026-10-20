import {
  Content,
  TitleContainer,
  SubtitleContainer,
  getTitleStyles,
  getSubtitleStyles,
} from '@/components/atoms/TableCellContent/variants/TextSubtitleValue/TextSubtitleValue.styles';

import Typography from '@/components/atoms/Typography/Typography';
import { TextSubtitleValueProps } from '@/components/atoms/TableCellContent/TableCellContent.types';
import { Root } from '@/components/atoms/TableCellContent/TableCellContent.styles';

const TextSubtitleValue = ({
  title,
  subtitle,
  titleColor,
  subtitleColor,
}: TextSubtitleValueProps) => {
  return (
    <Root>
      <Content>
        <TitleContainer>
          <Typography variant="body2" noWrap sx={getTitleStyles(titleColor)}>
            {title}
          </Typography>
        </TitleContainer>

        <SubtitleContainer>
          <Typography variant="caption" noWrap sx={getSubtitleStyles(subtitleColor)}>
            {subtitle}
          </Typography>
        </SubtitleContainer>
      </Content>
    </Root>
  );
};

export default TextSubtitleValue;
