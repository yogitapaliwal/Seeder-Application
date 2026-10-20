import { StyledTag } from '@/components/atoms/Tag/Tag.styles';
import { TagProps } from '@/components/atoms/Tag/Tag.types';

const Tag = ({ label, variant = 'default' }: TagProps) => {
  return <StyledTag tagVariant={variant}>{label}</StyledTag>;
};

export default Tag;
