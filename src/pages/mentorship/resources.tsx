import { Box, Grid } from '@mui/material';
import React from 'react';

import { Footer } from 'components/Footer';
import ArrowIcon from 'components/ArrowIcon';
import { ResourcesCard } from 'components/ResourcesCard';
import ResourcesHero from 'components/ResourcesHero';

import footerData from 'lib/responses/footer.json';
import pageData from 'lib/responses/mentorshipResources.json';

const MentorshipResourcesPage: React.FC = () => {
  const { heroTitle, heroDescription, resources } = pageData;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>
        <ResourcesHero title={heroTitle} description={heroDescription} />

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
                  buttonIcon={<ArrowIcon />} // keep icon here
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
