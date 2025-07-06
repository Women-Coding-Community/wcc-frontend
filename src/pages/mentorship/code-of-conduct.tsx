// path: /mentorship/code-of-conduct

import { Typography, Box } from '@mui/material';

const MentorshipCodeOfConductPage = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(270deg, #9FCCEC 0%, #C7E7FF 100%)',
        height: '160px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
        }}
      >
        Mentorship Code of Conduct
      </Typography>
    </Box>
  );
};

export default MentorshipCodeOfConductPage;
