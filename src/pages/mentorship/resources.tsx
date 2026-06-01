import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

import { Title, ResourcesCard, Footer, BreadCrumbsDynamic } from '@components';
import { useIsMobile } from '@utils/theme-utils';
import { FooterResponse, MentorshipResourcesResponse } from '@utils/types';
import { fetchData } from 'lib/api';
import pageData from 'lib/responses/mentorshipResources.json';

type CombinedResponse = {
  data: MentorshipResourcesResponse;
  footer: FooterResponse;
};

type MentorshipResourcesPageProps = {
  data?: MentorshipResourcesResponse;
  footer: FooterResponse;
};

const MentorshipResourcesPage: React.FC<MentorshipResourcesPageProps> = ({
  data,
  footer,
}) => {
  const isMobile = useIsMobile();
  const page = (data ?? pageData) as MentorshipResourcesResponse;
  const { heroSection, section, resourcesSection } = page;

  return (
    <>
      {isMobile ? null : <BreadCrumbsDynamic />}

      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Title title={heroSection.title} />

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
              {section.description}
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
              {resourcesSection.items.map((res, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                  <ResourcesCard
                    image={res.image.path}
                    title={res.title}
                    description={res.description ?? ''}
                    buttonText={res.link.label}
                    link={res.link.uri}
                    buttonIcon={<OpenInNewIcon />}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Footer {...footer} />
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const combinedResponse: CombinedResponse = await fetchData(
      'mentorship/resources',
    );

    return {
      props: {
        data: combinedResponse.data,
        footer: combinedResponse.footer,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    };
  }
};

export default MentorshipResourcesPage;
