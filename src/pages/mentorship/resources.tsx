import { Box, Grid } from '@mui/material';
import React from 'react';

import { Footer } from '@components';

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
      buttonIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.7435 13.3337C3.43661 13.3337 3.18039 13.2309 2.97484 13.0253C2.76928 12.8198 2.6665 12.5635 2.6665 12.2567V3.74399C2.6665 3.4371 2.76928 3.18088 2.97484 2.97533C3.18039 2.76977 3.43661 2.66699 3.7435 2.66699H7.487V3.33366H3.7435C3.64084 3.33366 3.54678 3.37638 3.46134 3.46183C3.37589 3.54727 3.33317 3.64133 3.33317 3.74399V12.2567C3.33317 12.3593 3.37589 12.4534 3.46134 12.5388C3.54678 12.6243 3.64084 12.667 3.7435 12.667H12.2562C12.3588 12.667 12.4529 12.6243 12.5383 12.5388C12.6238 12.4534 12.6665 12.3593 12.6665 12.2567V8.51316H13.3332V12.2567C13.3332 12.5635 13.2304 12.8198 13.0248 13.0253C12.8193 13.2309 12.5631 13.3337 12.2562 13.3337H3.7435ZM6.49217 9.97983L6.02034 9.50799L12.1947 3.33366H9.33317V2.66699H13.3332V6.66699H12.6665V3.80549L6.49217 9.97983Z"
            fill="#fff"
          />
        </svg>
      ),
    },
    {
      image: '/mentor_pocketbookMedia.jpg',
      title: 'Mentor’s Pocketbook',
      description: '',
      buttonText: 'View Pocketbook',
      link: '#',
      buttonIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.7435 13.3337C3.43661 13.3337 3.18039 13.2309 2.97484 13.0253C2.76928 12.8198 2.6665 12.5635 2.6665 12.2567V3.74399C2.6665 3.4371 2.76928 3.18088 2.97484 2.97533C3.18039 2.76977 3.43661 2.66699 3.7435 2.66699H7.487V3.33366H3.7435C3.64084 3.33366 3.54678 3.37638 3.46134 3.46183C3.37589 3.54727 3.33317 3.64133 3.33317 3.74399V12.2567C3.33317 12.3593 3.37589 12.4534 3.46134 12.5388C3.54678 12.6243 3.64084 12.667 3.7435 12.667H12.2562C12.3588 12.667 12.4529 12.6243 12.5383 12.5388C12.6238 12.4534 12.6665 12.3593 12.6665 12.2567V8.51316H13.3332V12.2567C13.3332 12.5635 13.2304 12.8198 13.0248 13.0253C12.8193 13.2309 12.5631 13.3337 12.2562 13.3337H3.7435ZM6.49217 9.97983L6.02034 9.50799L12.1947 3.33366H9.33317V2.66699H13.3332V6.66699H12.6665V3.80549L6.49217 9.97983Z"
            fill="#fff"
          />
        </svg>
      ),
    },
    {
      image: '/mentor_guideeMedia.jpg',
      title: 'Mentor’s Guide',
      description: '',
      buttonText: 'View Guide',
      link: '#',
      buttonIcon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.7435 13.3337C3.43661 13.3337 3.18039 13.2309 2.97484 13.0253C2.76928 12.8198 2.6665 12.5635 2.6665 12.2567V3.74399C2.6665 3.4371 2.76928 3.18088 2.97484 2.97533C3.18039 2.76977 3.43661 2.66699 3.7435 2.66699H7.487V3.33366H3.7435C3.64084 3.33366 3.54678 3.37638 3.46134 3.46183C3.37589 3.54727 3.33317 3.64133 3.33317 3.74399V12.2567C3.33317 12.3593 3.37589 12.4534 3.46134 12.5388C3.54678 12.6243 3.64084 12.667 3.7435 12.667H12.2562C12.3588 12.667 12.4529 12.6243 12.5383 12.5388C12.6238 12.4534 12.6665 12.3593 12.6665 12.2567V8.51316H13.3332V12.2567C13.3332 12.5635 13.2304 12.8198 13.0248 13.0253C12.8193 13.2309 12.5631 13.3337 12.2562 13.3337H3.7435ZM6.49217 9.97983L6.02034 9.50799L12.1947 3.33366H9.33317V2.66699H13.3332V6.66699H12.6665V3.80549L6.49217 9.97983Z"
            fill="#fff"
          />
        </svg>
      ),
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
