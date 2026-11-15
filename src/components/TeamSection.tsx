import { Box, Typography } from '@mui/material';

import { TeamMembersData } from '@utils/types';

import { TeamMemberCard } from './TeamMemberCard';

export interface TeamSectionProps {
  membersByType: TeamMembersData;
}

const TEAM_GROUPS: {
  key: keyof TeamMembersData;
  title: string;
  position: string;
}[] = [
  { key: 'directors', title: 'WCC Directors', position: 'WCC Director' },
  { key: 'leads', title: 'WCC Leads', position: 'WCC Lead' },
  { key: 'evangelists', title: 'WCC Evangelists', position: 'WCC Evangelist' },
];

export const TeamSection = ({ membersByType }: TeamSectionProps) => (
  <Box
    component="section"
    aria-label="WCC team"
    sx={{ bgcolor: 'primary.light', px: 2, py: 6 }}
  >
    <Box
      sx={{
        maxWidth: 1128,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      {TEAM_GROUPS.map(({ key, title, position }) => {
        const members = membersByType[key] ?? [];
        if (members.length === 0) {
          return null;
        }

        const headingId = `team-${key}-heading`;

        return (
          <Box key={key} component="section" aria-labelledby={headingId}>
            <Typography
              id={headingId}
              component="h2"
              variant="h6"
              sx={{ mb: 3 }}
            >
              {title}
            </Typography>
            <Box
              component="ul"
              sx={{
                listStyle: 'none',
                m: 0,
                p: 0,
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'minmax(0, 360px)',
                  sm: 'repeat(auto-fill, 264px)',
                },
                gap: 3,
                justifyContent: { xs: 'center', sm: 'start' },
              }}
            >
              {members.map((member) => (
                <Box
                  component="li"
                  key={`${member.fullName}-${member.email ?? ''}`}
                  sx={{ display: 'flex' }}
                >
                  <TeamMemberCard
                    fullName={member.fullName}
                    position={position}
                    jobTitle={member.jobTitle || member.position}
                    images={member.images}
                    network={member.network}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        );
      })}
    </Box>
  </Box>
);
