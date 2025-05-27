import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

type GradientBoxProps = {
  colors: Array<string>;
};

export const GradientBox = ({
  colors,
  children,
  ...rest
}: PropsWithChildren<GradientBoxProps>) => {
  const theme = useTheme();
  const colorString = colors.join(', ');

  return (
    <Box
      sx={{
        background: `linear-gradient(to right, ${colorString})`,
        ...theme.custom.containerBox,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
