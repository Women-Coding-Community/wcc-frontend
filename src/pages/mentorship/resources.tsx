import { Box, Grid } from '@mui/material';
import React from 'react';

import { Footer } from '@components';

import ArrowIcon from '../../components/ArrowIcon';
import { ResourcesCard } from '../../components/ResourcesCard';
import ResourcesHero from '../../components/ResourcesHero';
import footerData from '../../lib/responses/footer.json';

const MentorshipResourcesPage: React.FC = () => {
  const resources = [
    {
      image: '/mentee_guideMedia.jpg',
      title: 'Mentee’s Guide',
      description: '',
      buttonText: 'View Guide',
      link: '#',
      buttonIcon: <ArrowIcon />,
    },
    {
      image: '/mentor_pocketbookMedia.jpg',
      title: 'Mentor’s Pocketbook',
      description: '',
      buttonText: 'View Pocketbook',
      link: '#',
      buttonIcon: <ArrowIcon />,
    },
    {
      image: '/mentor_guideeMedia.jpg',
      title: 'Mentor’s Guide',
      description: '',
      buttonText: 'View Guide',
      link: '#',
      buttonIcon: <ArrowIcon />,
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flexGrow: 1 }}>
        <ResourcesHero />

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
                  buttonIcon={res.buttonIcon}
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
