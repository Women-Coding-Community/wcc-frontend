import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import React from 'react';

import { Title, ResourcesCard, Footer, BreadCrumbsDynamic } from '@components';
import { useIsMobile } from '@utils/theme-utils';
import { FooterResponse, MentorshipResourcesResponse } from '@utils/types';
import { fetchData } from 'lib/api';

interface MentorshipResourcesPageProps {
  data: MentorshipResourcesResponse;
  footer: FooterResponse;
}

const MentorshipResourcesPage: React.FC<MentorshipResourcesPageProps> = ({
  data,
  footer,
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? null : <BreadCrumbsDynamic />}

      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Title title={data.heroSection.title} />

          {data.section?.description && (
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
                {data.section.description}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              paddingX: 2,
              maxWidth: 1000,
              margin: '0 auto',
              marginBottom: 15,
            }}
          >
            <Grid container spacing={4}>
              {data.resourcesSection.items.map((item, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
                  <ResourcesCard
                    image={item.image.path}
                    title={item.title}
                    description=""
                    buttonText={item.link.label}
                    link={item.link.uri}
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
    const combinedResponse = await fetchData('mentorship/resources');

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
