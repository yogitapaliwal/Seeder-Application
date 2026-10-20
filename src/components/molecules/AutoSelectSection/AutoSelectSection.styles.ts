import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const Root = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const TitleRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

export const getTitleStyles = () => ({
  color: 'text.disabled',
});

export const getSelectedAmountStyles = () => ({
  color: 'brand.purple400',
});

export const getSelectedOfLabelStyles = () => ({
  color: 'text.disabled',
});

export const getTotalAmountStyles = () => ({
  color: 'text.primary',
});

export const getRemainingAmountStyles = (isRemainingZero?: boolean) => ({
  color: isRemainingZero ? 'error.main' : 'text.disabled',
});

export const SelectedAmount = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  // This theme's body/caption variants use ~1:1 line-height:font-size (no
  // built-in leading), so a small gap here still reads as touching text -
  // needs more breathing room than a typical line-spacing gap would.
  gap: '8px',
});

// Deliberately NOT flexbox: this renders a single sentence made of
// differently-styled inline spans ("$X selected of $Y"), matching the design
// (one line). Flex-wrap recomputes every child's position on each change and
// can visibly stutter/overlap under rapid updates (e.g. while dragging the
// autoselect slider); plain inline text wraps the same way a browser wraps
// any paragraph - the cheapest, most stable layout path for fast-changing
// text, and it only wraps to a second line in the rare case the text is too
// long for the container (e.g. very large committed amounts).
export const SelectedAmountSentence = styled(Box)({
  display: 'block',
});
