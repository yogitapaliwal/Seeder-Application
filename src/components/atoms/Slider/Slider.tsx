import { StyledSlider } from '@/components/atoms/Slider/Slider.styles';
import { SliderProps } from '@/components/atoms/Slider/Slider.types';

const Slider = ({ disabled = false, warning = false, ...props }: SliderProps) => {
  return <StyledSlider disabled={disabled} warning={warning} {...props} />;
};

export default Slider;
