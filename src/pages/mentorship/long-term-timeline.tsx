// path: /mentorship/long-term-timeline

import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { GetServerSideProps } from 'next';

import { TimelineCard, Title, Footer, BreadCrumbsDynamic } from '@components';
import { useIsMobile } from '@utils/theme-utils';
import { LongTermTimeLineResponse, FooterResponse } from '@utils/types';
import { fetchData } from 'lib/api';

type CombinedResponse = {
  data: LongTermTimeLineResponse;
  footer: FooterResponse;
};

const MentorshipLongTermTimelinePage = ({ data, footer }: CombinedResponse) => {
  const isMobile = useIsMobile();
  return (
    <div>
      {isMobile ? null : <BreadCrumbsDynamic />}
      <Title title={'Long-Term Mentorship Timeline'} />

      <Timeline
        position="right"
        sx={{
          marginTop: '94px',
        }}
      >
        {data?.events?.items?.map((item, index) => (
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
                    md: '32px',
                  },
                  height: {
                    xs: '15px',
                    sm: '24px',
                    md: '32px',
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
                marginTop: '-30px',
                marginLeft: {
                  xs: '-10px',
                  md: '-70px',
                },
              }}
            >
              <TimelineCard
                title={item.title}
                description={item.description}
                date={item.duration}
              />
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {footer && <Footer {...footer} />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('mentorship/long-term-timeline');
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

export default MentorshipLongTermTimelinePage;
