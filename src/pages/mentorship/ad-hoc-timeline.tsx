// path: /mentorship/ad-hoc-timeline
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Box } from '@mui/material';
import { GetServerSideProps } from 'next';

import { BreadCrumbsDynamic, Footer, TimelineCard, Title } from '@components';
import { useIsMobile } from '@utils/theme-utils';
import { AdHocTimeLineResponse, FooterResponse } from '@utils/types';
import { fetchData } from 'lib/api';
import theme from 'theme';

type CombinedResponse = {
  data: AdHocTimeLineResponse;
  footer: FooterResponse;
};

const MentorshipAdHocTimelinePage = ({ data, footer }: CombinedResponse) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? null : <BreadCrumbsDynamic />}
      <Title title={'Ad-Hoc Mentorship Timeline'} />
      <Box sx={theme.custom.containerBox}>
        <Timeline position="right">
          {data.events.items.map((item, index) => (
            <TimelineItem
              key={index}
              sx={{
                marginLeft: {
                  xs: '-50px',
                },
              }}
            >
              <TimelineSeparator>
                <TimelineDot
                  color="primary"
                  sx={{
                    margin: 0,
                    width: {
                      xs: '15px',
                      sm: '24px',
                    },
                    height: {
                      xs: '15px',
                      sm: '24px',
                    },
                  }}
                />
                {index + 1 !== data?.events?.items?.length && (
                  <TimelineConnector
                    sx={{
                      bgcolor: 'rgb(140,145,150)',
                      width: {
                        xs: '1.5px',
                        sm: '2px',
                        md: '2.5px',
                      },
                    }}
                  />
                )}
              </TimelineSeparator>

              <TimelineContent
                sx={{
                  flex: '10',
                  marginTop: isMobile ? '' : '-30px',
                  marginLeft: {
                    md: '-70px',
                  },
                }}
              >
                <TimelineCard
                  title={item.title}
                  description={item.description}
                />
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
        {footer && <Footer {...footer} />}
      </Box>
    </>
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
