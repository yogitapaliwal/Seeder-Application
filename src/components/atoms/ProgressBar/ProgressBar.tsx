import { ProgressFill, ProgressTrack } from '@/components/atoms/ProgressBar/ProgressBar.styles';
import { ProgressBarProps } from '@/components/atoms/ProgressBar/ProgressBar.types';

const ProgressBar = ({ value, max = 100 }: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <ProgressTrack>
      <ProgressFill percentage={percentage} />
    </ProgressTrack>
  );
};

export default ProgressBar;
