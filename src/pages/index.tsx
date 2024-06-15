import { Grid, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { LandingPageResponse } from '@utils/types';
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
      <div className="opportunities-programmes">
        <Typography
          variant="h3"
          color="text.primary"
          align="center"
          marginBottom={5}
        >
          Opportunities and Programmes
        </Typography>
        <Typography variant="h5" color="text.primary" align="center">
          Join our community and unlock endless opportunities. Network, find
          mentors, and access leadership programs. Whether you&apos;re aiming to
          enhance your skills, grow your professional network, or advance your
          career, we have what you need. We offer a wide range of opportunities
          to help you achieve your goals.
        </Typography>
        {/* <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          width: '80vw',
          margin: '0 auto',
        }}
      > */}
        <Grid
          style={{
            margin: '0 auto',
            width: '80vw',
            paddingBottom: '5rem',
            alignContent: 'center',
          }}
          container
          spacing={{ md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {data.programmesSection.programmes.map((p) => (
            <Grid item xs={2} sm={4} md={4} key={p.name}>
              <Tile name={p.name} link={p.link} icon={p.icon} />
            </Grid>
          ))}
        </Grid>
        {/* </div> */}
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

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
