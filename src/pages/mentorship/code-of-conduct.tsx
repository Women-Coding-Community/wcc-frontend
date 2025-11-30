// path: /mentorship/code-of-conduct

import { Box, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';

import { CodeOfConductSection } from '@components';
import { MentorshipCodeOfConductData } from '@utils/types';
import { fetchData } from 'lib/api';

interface AboutUsCodeOfConductPageProps {
  mentorshipCodeOfConduct: MentorshipCodeOfConductData;
}

const MentorshipCodeOfConductPage = ({
  mentorshipCodeOfConduct,
}: AboutUsCodeOfConductPageProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        paddingBottom: '4rem',
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(to right, #e0f7fa, #bbdefb)',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '160px',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: '#001e2e',
          }}
        >
          Mentorship Code of Conduct
        </Typography>
      </Box>
      <CodeOfConductSection
        title={mentorshipCodeOfConduct.menteeCodeSection.title}
        items={mentorshipCodeOfConduct.menteeCodeSection.items}
      />

      <CodeOfConductSection
        title={mentorshipCodeOfConduct.mentorCodeSection.title}
        items={mentorshipCodeOfConduct.mentorCodeSection.items}
      />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('mentorship/code-of-conduct');
    const props: AboutUsCodeOfConductPageProps = {
      mentorshipCodeOfConduct: response.data,
    };
    return {
      props,
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

export default MentorshipCodeOfConductPage;
