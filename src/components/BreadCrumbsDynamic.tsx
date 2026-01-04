import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { capitalizeWords } from '@utils/helpers';

export const BreadCrumbsDynamic = () => {
  const router = useRouter();
  const pathSegments = router.pathname.split('/').filter(Boolean); // Filter out empty strings

  const buildHref = (index: number) =>
    `/${pathSegments.slice(0, index + 1).join('/')}`;

  return (
    <Box
      sx={{
        paddingY: '1rem',
        margin: 0,
        width: '100%',
        mx: 'auto',
        boxSizing: 'border-box',
        maxWidth: '1128px',
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="primary.main" href="/">
          Home
        </Link>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const formattedSegment = capitalizeWords(segment);
          return isLast ? (
            <Typography key={segment} sx={{ color: 'text.primary' }}>
              {formattedSegment}
            </Typography>
          ) : (
            <Link
              key={segment}
              underline="hover"
              color="primary.main"
              href={buildHref(index)}
            >
              {formattedSegment}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};
