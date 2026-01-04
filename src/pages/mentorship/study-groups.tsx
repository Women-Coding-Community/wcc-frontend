// path: /mentorship/study-groups
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { GetServerSideProps } from 'next';

import {
  GroupCard,
  HeroWithImage,
  InfoWithContact,
  Footer,
  BreadCrumbsDynamic,
} from '@components';
import { FooterResponse, StudyGroupsPageData } from '@utils/types';
import { fetchData } from 'lib/api';
import { useIsMobile } from '@utils/theme-utils';

interface StudyGroupsPageProps {
  data: StudyGroupsPageData;
  footer: FooterResponse;
  error?: string | null;
}

const MentorShipStudyGroupsPage = ({ data, footer }: StudyGroupsPageProps) => {
  const {
    section: { description },
    contact: { links: contactLinks },
  } = data;
  const cleanedIntroText = description.replace(/\n /g, '\n\n');

  const muiTheme = useTheme();
  const cardColors = muiTheme.palette.custom.studyGroupCardColors;
  const isMobile = useIsMobile();

  return (
    <Box>
      {isMobile ? null : <BreadCrumbsDynamic />}
      <HeroWithImage
        title={data.heroSection.title}
        imageSrc={'/hero-img.jpg'} // @TODO replace with actual path?
      />
      <Box
        sx={{
          maxWidth: '1128px',
          mx: 'auto',
          pt: 4,
        }}
      >
        <InfoWithContact
          introText={cleanedIntroText}
          contactLinks={contactLinks}
          title="How it works"
          calltoAction="Join us in our Study Group Slack Channel"
        />
        {data.studyGroupSection.items.length > 0 ? (
          <>
            <Typography variant="h4" sx={{ mt: 6, mb: 4 }}>
              Active Study Groups
            </Typography>
            <Grid container spacing={3} justifyContent="center" sx={{ mb: 10 }}>
              {data.studyGroupSection.items.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.title}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <GroupCard
                      bgColor={cardColors[index % cardColors.length]}
                      title={item.title}
                      description={item.description}
                      participants={item.participants}
                      mentor={item.coordinators}
                      uri={item.link.uri}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        ) : null}
      </Box>
      <Footer {...footer} />
    </Box>
  );
};

export default MentorShipStudyGroupsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const combinedResponse = await fetchData('mentorship/study-groups');

    return {
      props: {
        data: combinedResponse.data,
        error: null,
        footer: combinedResponse.footer,
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching Study Groups data:', error);
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};
