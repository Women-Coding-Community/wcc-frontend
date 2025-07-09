// path: /mentorship/code-of-conduct

import { Typography, Box } from '@mui/material';

const MentorshipCodeOfConductPage = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(270deg, #9FCCEC 0%, #C7E7FF 100%)',
        height: {
          xs: '136px',
          sm: '160px',
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: {
            xs: '2rem',
            sm: '3rem',
          },
          fontWeight: 600,
          textAlign: 'center',
        }}
      >
        Mentorship Code of Conduct
      </Typography>
    </Box>
  );
};

export default MentorshipCodeOfConductPage;
