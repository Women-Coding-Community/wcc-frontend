import { Box, Typography } from '@mui/material';

interface CodeOfConductSectionProps {
  title: string;
  items: string[];
}

export const CodeOfConductSection = ({
  title,
  items,
}: CodeOfConductSectionProps) => {
  return (
    <Box
      sx={{
        width: '745px',
        height: '1830px',
        marginLeft: '347px',
        marginTop: '394px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginBottom: '2rem',
          textAlign: 'center',
          width: '100%',
        }}
      >
        {title}
      </Typography>
      <Box
        component="ol"
        sx={{
          paddingLeft: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {items.map((item, index) => (
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
    </Box>
  );
};
