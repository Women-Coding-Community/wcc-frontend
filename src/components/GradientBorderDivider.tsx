import { Divider } from '@mui/material';
import React from 'react';

interface GradientBorderDividerProps {
  height: string;
  width: string;
  gradientColors: string;
  margin?: string;
}

export const GradientBorderDivider: React.FC<GradientBorderDividerProps> = ({
  height,
  width,
  gradientColors,
  margin,
}) => {
  return (
    <Divider
      sx={{
        height: height,
        width: width,
        backgroundImage: gradientColors,
        margin: margin,
      }}
    />
  );
};
