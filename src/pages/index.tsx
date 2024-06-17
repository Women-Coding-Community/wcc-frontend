import { Box, Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LandingPageResponse } from '@utils/types';
import GradientBox from 'components/GradientBox';
import Tile from 'components/Tile';
import { fetchData } from 'lib/api';

interface HomePageProps {
  data: LandingPageResponse;
  error: string | null;
}

const HomePage = ({ data, error }: HomePageProps) => {
  const router = useRouter();

  useEffect(() => {
    if (error) {
      router.push('/500');
    }
  }, [error, router]);

  return (
    <div>
      <h1>Home Page</h1>
      <OpportunitiesProgrammes programmes={data.programmesSection.programmes} />

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

function OpportunitiesProgrammes(props: {
  programmes: LandingPageResponse['programmesSection']['programmes'];
}) {
  return (
    <GradientBox
      colors={['#FFB59D', '#FFDEA6']}
      className="opportunities-programmes"
    >
      <Box sx={{ display: 'grid', gap: '1rem', justifyItems: 'center' }}>
        <Typography
          variant="h3"
          color="text.primary"
          align="center"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Opportunities and Programmes
        </Typography>
        <Typography
          variant="h5"
          color="text.primary"
          align="center"
          sx={{ maxWidth: '600px' }}
        >
          Join our community and unlock endless opportunities. Network, find
          mentors, and access leadership programs. Whether you&apos;re aiming to
          enhance your skills, grow your professional network, or advance your
          career, we have what you need. We offer a wide range of opportunities
          to help you achieve your goals.
        </Typography>
        <Grid
          style={{
            justifyContent: 'center',
          }}
          container
          spacing={{ xs: 2, sm: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {props.programmes.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.name}>
              <Tile name={p.name} link={p.link} icon={p.icon} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </GradientBox>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const path = 'home.json'; // temporary setup to get correct json
  try {
    const data: LandingPageResponse = await fetchData(path);

    return {
      props: {
        data,
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
export default HomePage;
