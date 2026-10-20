import graphOne from '@/assets/icons/graph-one.svg';
import graphTwo from '@/assets/icons/graph-two.svg';
import graphThree from '@/assets/icons/graph-three.svg';

import { StyledSparkline } from '@/components/atoms/Sparkline/Sparkline.styles';
import { SparklineProps } from '@/components/atoms/Sparkline/Sparkline.types';

const graphs = {
  one: graphOne,
  two: graphTwo,
  three: graphThree,
};

const Sparkline = ({ variant = 'one' }: SparklineProps) => {
  return (
    <StyledSparkline>
      <img src={graphs[variant]} alt="Sparkline graph" />
    </StyledSparkline>
  );
};

export default Sparkline;
