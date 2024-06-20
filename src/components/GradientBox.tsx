import { Box } from '@mui/material';
import { HTMLAttributes } from 'react';

type GradientBoxProps = {
  colors: Array<string>;
} & HTMLAttributes<HTMLDivElement>;

export default function GradientBox(props: GradientBoxProps) {
  const colorString = props.colors.join(', ');

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${colorString})`,
        padding: '5rem 1rem',
      }}
      {...props}
    ></Box>
  );
}