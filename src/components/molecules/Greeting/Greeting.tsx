import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { GreetingProps } from '@/components/molecules/Greeting/Greeting.types';
import {
  getDateStyles,
  getGreetingStyles,
  getTitleStyles,
  getWaveEmojiStyles,
} from '@/components/molecules/Greeting/Greeting.styles';
import Typography from '@/components/atoms/Typography/Typography';

const Greeting = ({ title, date, showWaveEmoji = false, sx }: GreetingProps) => {
  const theme = useTheme();

  return (
    <Box sx={[getGreetingStyles(), ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography variant="title" sx={getTitleStyles(theme)}>
        {title}
        {showWaveEmoji && (
          <>
            {' '}
            <Typography
              component="span"
              variant="heading2"
              sx={getWaveEmojiStyles()}
              aria-hidden="true"
            >
              👋
            </Typography>
          </>
        )}
      </Typography>

      <Typography variant="heading3" sx={getDateStyles(theme)}>
        {date}
      </Typography>
    </Box>
  );
};

export default Greeting;
