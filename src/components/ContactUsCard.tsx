import { Grid, Box, Typography, useMediaQuery } from '@mui/material';

import { TeamLeadershipResponse } from '@utils/types';
import theme from 'theme';

import OpenInNewIcon from '../../public/icons/open_in_new.png';
import { iconNetworkMapper } from './Footer';

interface ContactUsProps {
  title: string;
  links: TeamLeadershipResponse['contact']['links'];
}

export const ContactUsCard = ({ title, links }: ContactUsProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down(750));

  interface ContactLink {
    type: string;
    link: string;
  }

  const renderSocialNetworkIcon = (network: ContactLink) => {
    const linkLabel =
      network.type.toLowerCase() === 'slack'
        ? 'WomenCodingCommunity'
        : network.link;

    return (
      <Box sx={{ direction: 'column' }}>
        <a
          href={
            network.type.toLowerCase() === 'email'
              ? `mailto:${network.link}`
              : network.link
          }
          target="_blank"
          rel={network.type === 'EMAIL' ? undefined : 'noopener noreferrer'}
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'underline',
            color: '#1A4B66',
            width: '100%',
          }}
        >
          <span
            style={{
              marginRight: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {iconNetworkMapper[network.type as keyof typeof iconNetworkMapper]}
          </span>
          <span style={{ fontSize: '14px' }}>{linkLabel}</span>
        </a>
      </Box>
    );
  };

  return (
    <div>
      <Grid item xs={12} sm={4} lg={2} m={2} style={{ padding: 0, margin: 0 }}>
        <Box
          bgcolor={'#F6FAFE'}
          textAlign={isMobile ? 'center' : 'left'}
          padding={'10px 10px 5px 5px'}
          width={!isMobile ? 360 : 300}
        >
          {!isMobile ? (
            <Typography
              variant="h5"
              color={'#1B1919'}
              align="left"
              sx={{
                fontWeight: { xs: 400, md: 400 },
              }}
            >
              {title}
            </Typography>
          ) : (
            ''
          )}
          <Box>
            {!isMobile ? (
              links.map((contact, index) => (
                <div key={contact.type || index}>
                  {renderSocialNetworkIcon(contact)}
                </div>
              ))
            ) : (
              <div>
                <Typography
                  variant="h5"
                  color={'#36637F'}
                  align="left"
                  sx={{
                    fontWeight: { xs: 400, md: 400 },
                  }}
                  fontSize={'24px'}
                >
                  <a
                    href="https://github.com/Women-Coding-Community"
                    target="_blank"
                    style={{
                      textDecoration: 'none',
                      color: '#1A4B66',
                      width: '100%',
                    }}
                  >
                    Join us as a GitHub contributor
                    <img
                      src={OpenInNewIcon.src}
                      style={{
                        width: '16px',
                        height: '16px',
                        marginLeft: '10px',
                      }}
                    />
                  </a>
                </Typography>
                <Typography
                  fontWeight={400}
                  fontSize={'16px'}
                  variant="h6"
                  color={'#000000'}
                  align="left"
                >
                  Join our vibrant community and shape the future of technology.
                  Contribute on GitHub and make a difference!
                </Typography>
              </div>
            )}
          </Box>
        </Box>
      </Grid>
    </div>
  );
};
