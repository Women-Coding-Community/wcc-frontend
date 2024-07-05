import { Box } from '@mui/material';
import { HTMLAttributes } from 'react';

type GradientBoxProps = {
  colors: Array<string>;
} & HTMLAttributes<HTMLDivElement>;

export const GradientBox = (props: GradientBoxProps) => {
  const colorString = props.colors.join(', ');

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${colorString})`,
        padding: '3rem 1rem',
      }}
      {...props}
    ></Box>
  );
};
