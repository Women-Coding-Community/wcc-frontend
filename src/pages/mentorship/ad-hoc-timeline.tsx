// path: /mentorship/ad-hoc-timeline
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Typography, Box } from '@mui/material';
import { GetServerSideProps } from 'next';
import { Footer } from '@components';
import { AdHocTimeLineResponse, FooterResponse } from '@utils/types';
import { fetchData } from 'lib/api';
import theme from 'theme';

type CombinedResponse = {
  data: AdHocTimeLineResponse;
  footer: FooterResponse;
};

const MentorshipAdHocTimelinePage = ({ data, footer }: CombinedResponse) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(to right, #e0f7fa, #bbdefb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '160px',
          width: '100vw',
          mb: 6,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: '#001e2e',
            fontSize: { xs: '1.5rem', md: '2.5rem' },
          }}
        >
          {data?.heroSection?.title || 'Ad-Hoc Mentorship Timeline'}
        </Typography>
      </Box>

      {!data?.events?.items?.length ? (
        <Typography>No Data</Typography>
      ) : (
        <Timeline
          position="right"
          sx={{
            width: '100%',
            maxWidth: 700,
            mx: 'auto',
            '& .MuiTimelineItem-root:before': {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {data.events.items.map((item, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                {index < data.events.items.length - 1 && (
                  <TimelineConnector
                    sx={{ bgcolor: 'primary.main', width: 2 }}
                  />
                )}
              </TimelineSeparator>

              <TimelineContent sx={{ mt: 0, mb: 4 }}>
                <Box
                  sx={{
                    p: { xs: 1, md: 2 },
                    border: '3px solid',
                    borderRadius: '7px',
                    borderColor: 'grey.100',
                    color: theme.palette.text.primary,
                  }}
                >
                  <Typography
                    sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, mb: 1 }}
                  >
                    {item.title || 'Timeline Item'}
                  </Typography>
                  <Typography variant="body2">
                    {item.description ||
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.'}
                  </Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      )}
      {footer && <Footer {...footer} />}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('mentorship/ad-hoc-timeline');
    const props: CombinedResponse = {
      data: response.data,
      footer: response.footer,
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

export default MentorshipAdHocTimelinePage;
