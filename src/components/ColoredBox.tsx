import { Box } from '@mui/material';
import { HTMLAttributes } from 'react';

type ColoredBoxProps = {
  color: string;
} & HTMLAttributes<HTMLDivElement>;

export const ColoredBox = ({ color, ...props }: ColoredBoxProps) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        color: 'inherit',
        padding: '3rem 1rem',
      }}
      {...props}
    />
  );
};
