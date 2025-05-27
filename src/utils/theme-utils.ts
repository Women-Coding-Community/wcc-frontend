import { useMediaQuery } from '@mui/material';

import theme from 'theme';

export const useIsMobile = () => useMediaQuery(theme.breakpoints.down(750));
