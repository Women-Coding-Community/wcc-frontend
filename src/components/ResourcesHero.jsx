import { Typography, Box, Paper } from '@mui/material';

const ResourcesHero = () => {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'lightblue',
          paddingY: 6,
          textAlign: 'center',
          width: '100%',
          marginTop: 0,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: 'black',
            fontWeight: 'bold',
            marginBottom: 0,
            fontSize: {
              xs: '2rem',
              md: '3rem',
            },
          }}
        >
          Mentorship Resources
        </Typography>
      </Paper>

      <Box
        sx={{
          maxWidth: 800,
          margin: '40px auto',
          paddingX: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.4rem' },
            lineHeight: 1.5,
          }}
        >
          Whether you're a mentee looking to navigate your journey, a mentor
          aiming to provide the best guidance, or a seasoned mentor seeking
          quick tips, we have the tools you need. Explore our guides for
          insightful mentorship advice and strategies.
        </Typography>
      </Box>
    </>
  );
};

export default ResourcesHero;
