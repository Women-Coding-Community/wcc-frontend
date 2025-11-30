import { DateRange } from '@mui/icons-material';
import LaunchIcon from '@mui/icons-material/Launch';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';

import theme from '../theme';
import { Image as ImageType, Link } from '../utils/types';

import { LinkButton } from './LinkButton';

interface EventCardProps {
  title: string;
  speaker: string;
  date: string;
  description: string;
  link: Link;
  images: ImageType[];
  type: string;
}

export const EventCard = ({
  title,
  speaker,
  date,
  description,
  link,
  images,
  type,
}: EventCardProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down(544));

  return (
    <Grid
      container
      sx={{
        maxWidth: isMobile ? '362px' : '544px',
        margin: '0 auto',
        padding: isMobile ? '24px' : '32px',
        backgroundColor: '#226488',
        color: '#FFFFFF',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: isMobile ? 'auto' : '400px',
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row-reverse',
          }}
        >
          <Box
            sx={{
              '@media (max-width: 544px)': {
                justifyContent: 'flex-start',
              },
              marginBottom: isMobile ? '25px' : '',
            }}
          >
            {isMobile ? (
              <Box sx={{ position: 'relative', width: '100%', height: 134 }}>
                <Image
                  src={images[0].path}
                  alt={images[0].alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </Box>
            ) : (
              <Image
                src={images[0].path}
                alt={images[0].alt}
                width={134}
                height={134}
                style={{ objectFit: 'cover' }}
                priority
              />
            )}
          </Box>

          <Box>
            <Typography
              variant="caption"
              component="label"
              sx={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid white',
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {type}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                margin: '15px 0 7px',
              }}
            >
              <DateRange width="20px" height="20px" />
              <Typography
                variant="body2"
                fontSize={12}
                fontWeight={500}
                lineHeight={1.3}
              >
                {date}
              </Typography>
            </Box>
            <Typography
              variant="h5"
              fontSize={24}
              lineHeight={1.3}
              fontWeight={400}
              marginBottom="7px"
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              fontSize={14}
              fontWeight={400}
              lineHeight={1.4}
            >
              {speaker && `Speaker: ${speaker}`}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography
            variant="body1"
            fontSize={16}
            fontWeight={400}
            lineHeight={1.5}
            margin="20px 0"
          >
            {description}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: 'auto' }}>
        <LinkButton href={link.uri} reversed>
          {link.label}{' '}
          <LaunchIcon sx={{ paddingLeft: '5px', fontSize: '16px' }} />
        </LinkButton>
      </Box>
    </Grid>
  );
};
