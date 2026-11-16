import { Box, Link, Typography } from '@mui/material';
import Image from 'next/image';

import { getGoogleDriveDirectLink } from '@utils/image-utils';
import { Partner } from '@utils/types';

export interface CommunityPartnersProps {
  partners?: Partner[] | null;
}

export const CommunityPartners = ({ partners }: CommunityPartnersProps) => {
  if (!partners?.length) {
    return null;
  }

  return (
    <Box
      data-testid="community-partners"
      sx={{ bgcolor: 'background.paper', py: { xs: 4, md: 6 }, px: 2 }}
    >
      <Box sx={{ maxWidth: '1127px', mx: 'auto' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 3 }}>
          Community Partners:
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
            columnGap: { xs: 2, sm: 3, md: 4, lg: 6 },
            rowGap: { xs: 3, md: 5 },
          }}
        >
          {partners.map((partner) => (
            <Link
              key={partner.name}
              aria-label={`Visit ${partner.name}`}
              href={partner.link?.uri}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ display: 'inline-flex' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 36, md: 40, lg: 48 },
                  width: { xs: 132, sm: 150, md: 140, lg: 160 },
                }}
              >
                <Image
                  src={getGoogleDriveDirectLink(partner.image.path)}
                  alt={partner.image.alt || `${partner.name} logo`}
                  fill
                  sizes="(max-width: 599px) 132px, (max-width: 899px) 150px, (max-width: 1199px) 140px, 160px"
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
