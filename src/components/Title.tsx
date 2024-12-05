import { Box, Typography } from '@mui/material';
import { GradientBox } from './GradientBox';
import theme from 'theme';

type TitleProps = {
  title: string;
};

export const Title = (props: TitleProps) => {
  return (
    <Box>
      <GradientBox colors={['#9FCCEC', '#C7E7FF']}>
        <Typography
          variant="h2"
          color={theme.palette.primary.dark}
          sx={{
            fontSize: '2.25rem',
            fontWeight: '600',
            lineHeight: '1.2',
            textAlign: 'center',
          }}
        >
          {props.title}
        </Typography>
      </GradientBox>
    </Box>
  );
};
