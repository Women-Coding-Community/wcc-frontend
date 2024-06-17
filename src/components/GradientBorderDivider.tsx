import React from 'react';
import { Divider } from '@mui/material';

interface GradientBorderDividerProps {
  height: string;
  width: string;
  gradientColors: string;
  margin?: string;
}

const GradientBorderDivider: React.FC<GradientBorderDividerProps> = ({
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

export default GradientBorderDivider;
