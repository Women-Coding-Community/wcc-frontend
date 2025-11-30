import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';

import { CodeOfConductSectionType } from '@utils/types';

type CodeOfConductSectionProps = CodeOfConductSectionType;

export const CodeOfConductSection = ({
  title,
  items,
}: CodeOfConductSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  function handleClick() {
    setIsCollapsed(!isCollapsed);
  }

  const itemsToRender = isCollapsed ? items.slice(0, 3) : items;

  return (
    <Box
      sx={{
        padding: '2rem',
        maxWidth: '745px',
        marginX: 'auto',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          width: '100%',
        }}
      >
        {title}
      </Typography>
      <Box
        component="ol"
        sx={{
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {itemsToRender.map((item, index) => (
          <Typography
            component="li"
            variant="h5"
            key={`conduct-item-${index}`}
            sx={{ margin: 0 }}
          >
            {item}
          </Typography>
        ))}
      </Box>
      <Box>
        <Typography paragraph></Typography>
        <Button
          variant="outlined"
          startIcon={isCollapsed ? <AddIcon /> : <RemoveIcon />}
          sx={{
            borderRadius: '999px',
            paddingX: 2,
            paddingY: 0.5,
            borderColor: '#c4c4c4',
            color: '#1976d2',
            '&:hover': {
              backgroundColor: '#f5f5f5',
              borderColor: '#1976d2',
            },
          }}
          onClick={handleClick}
        >
          {isCollapsed ? 'Show more' : 'Show less'}
        </Button>
      </Box>
    </Box>
  );
};
