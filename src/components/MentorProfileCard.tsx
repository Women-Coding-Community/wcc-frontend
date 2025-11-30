import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Icon, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import { LinkButton } from '@components';
import { useIsMobile } from '@utils/theme-utils';
import { Mentor, Network } from '@utils/types';

type MentorProfileCardProps = {
  mentor: Mentor;
};

// questions: what networks are available? medium doesn't have an icon
const networkIcons = {
  linkedin: <LinkedInIcon fontSize="large" />,
  github: <GitHubIcon fontSize="large" />,
  twitter: <TwitterIcon fontSize="large" />,
  website: <PublicIcon fontSize="large" />,
};

// Custom TabPanel component since MUI does not export one by default
type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
  sx?: object;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, sx, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && <Box sx={sx}>{children}</Box>}
    </div>
  );
}

export const MentorProfileCard: React.FC<MentorProfileCardProps> = ({
  mentor,
}) => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        display: 'flex',
        border: '1px solid #e0e0e0',
        borderRadius: '16px',
        minWidth: isMobile ? '100%' : 700,
        width: isMobile ? '100%' : 800,
        boxShadow: 1,
        flexDirection: isMobile ? 'column' : 'row',
        mb: 3,
      }}
    >
      <Box
        sx={{
          width: isMobile ? '100%' : 240,
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
          padding: 3,
          borderRight: '1px solid #e0e0e0',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            minWidth: 80,
            height: 120,
            borderRadius: '50%',
            mb: 2,
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* question: image needs to be an actual url */}
          <Image
            src={'/profile-illustration.avif'}
            alt={mentor.images[0]?.alt || 'Mentor Profile Picture Description'}
            width={120}
            height={120}
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Typography variant="h6">{mentor.fullName}</Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: 'text.secondary', fontWeight: 600 }}
        >
          Programming languages:
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.primary', mb: 3 }}>
          {mentor.skills?.languages?.join(', ') || 'N/A'}
        </Typography>
        {/* question: this needs to be link to something? */}
        <LinkButton href={'/'} reversed small>
          Apply for this mentor{' '}
        </LinkButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons={isMobile ? 'auto' : false}
          allowScrollButtonsMobile
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: isMobile ? 0 : 3,
            pt: isMobile ? 0 : 2,
            overflowX: isMobile ? 'auto' : 'visible',
            '& .MuiTabs-flexContainer': {
              flexWrap: 'nowrap',
            },
          }}
        >
          {/* question: do we want to display the tab if no info provided? */}
          <Tab label="Presentation" />
          <Tab label="Skills & Support Areas" />
          <Tab label="Reviews" />
          <Tab label="Resources" />
        </Tabs>
        <TabPanel
          value={tab}
          index={0}
          sx={{
            overflow: 'scroll',
            textOverflow: 'ellipsis',
            height: '200px',
            padding: 3,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {mentor.position}, {mentor.companyName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Based in: {mentor.city}, {mentor.country.countryName}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            {mentor.network.map((network: Network) => (
              <a href={network.link} key={network.type}>
                <Icon
                  baseClassName="material-symbols-outlined"
                  sx={{
                    color: 'primary.main',
                    width: '34px',
                    height: '34px',
                  }}
                  fontSize="large"
                >
                  {networkIcons[network.type as keyof typeof networkIcons]}
                </Icon>
              </a>
            ))}
          </Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {mentor.bio}
          </Typography>
        </TabPanel>
        <TabPanel
          value={tab}
          index={1}
          sx={{
            overflow: 'scroll',
            textOverflow: 'ellipsis',
            height: '200px',
            padding: 3,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Skills & Support Areas
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Tech Experience in years:{' '}
            <Typography component="span">
              {mentor.skills.yearsExperience}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Language{mentor.spokenLanguages.length > 1 ? 's' : ''}:{' '}
            <Typography component="span">
              {mentor.spokenLanguages?.join(', ') || 'N/A'}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Mentorship types:{' '}
            <Typography component="span">
              {mentor.menteeSection?.mentorshipType?.join(', ') || 'N/A'}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Availability: {/* question: these are capitalised */}{' '}
            <Typography component="span">
              {mentor.menteeSection.availability?.months?.join(', ') || 'N/A'}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Hours per month:{' '}
            <Typography component="span">
              {mentor.menteeSection.availability.hours} hours
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Focus:{' '}
            <Typography component="span">
              {mentor.menteeSection?.focus?.join(', ') || 'N/A'}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
            Additional:{' '}
            <Typography component="span">
              {mentor.menteeSection.additional}
            </Typography>
          </Typography>
        </TabPanel>
        <TabPanel
          value={tab}
          index={2}
          sx={{
            overflow: 'scroll',
            textOverflow: 'ellipsis',
            height: '200px',
            padding: 3,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Reviews
          </Typography>
          {mentor.feedbackSection?.feedbacks?.map(
            (feedback: any, index: number) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {[...Array(Number(feedback.rating))].map((_, i) => (
                    <StarIcon
                      key={i}
                      sx={{ color: 'primary.main', fontSize: 20 }}
                    />
                  ))}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {feedback.date} - {feedback.type}
                </Typography>
                <Typography variant="body2">{feedback.feedback}</Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', mt: 1 }}
                >
                  By {feedback.name}
                </Typography>
              </Box>
            ),
          )}
        </TabPanel>
        {/* // this needs a proper example */}
        <TabPanel
          value={tab}
          index={3}
          sx={{
            overflow: 'scroll',
            textOverflow: 'ellipsis',
            height: '200px',
            padding: 3,
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Resources
          </Typography>
          This mentor has not provided any resources yet.
        </TabPanel>
      </Box>
    </Box>
  );
};
