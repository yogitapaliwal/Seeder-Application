import { StyledCheckbox } from '@/components/atoms/Checkbox/Checkbox.styles';
import { CheckboxProps } from '@/components/atoms/Checkbox/Checkbox.types';

const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};

export default Checkbox;
