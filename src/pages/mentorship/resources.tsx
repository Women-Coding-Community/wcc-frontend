import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

import { Title, ResourcesCard, Footer } from '@components';
import footerData from 'lib/responses/footer.json';
import pageData from 'lib/responses/mentorshipResources.json';

const MentorshipResourcesPage: React.FC = () => {
  const { heroTitle, heroDescription, resources } = pageData;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Title title={heroTitle} />

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
            {heroDescription}
          </Typography>
        </Box>

        <Box
          sx={{
            paddingX: 2,
            maxWidth: 1000,
            margin: '0 auto',
            marginBottom: 15,
          }}
        >
          <Grid container spacing={4}>
            {resources.map((res, index) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                <ResourcesCard
                  image={res.image}
                  title={res.title}
                  description={res.description}
                  buttonText={res.buttonText}
                  link={res.link}
                  buttonIcon={<OpenInNewIcon />}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer {...footerData} />
    </Box>
  );
};

export default MentorshipResourcesPage;
