import { Box, Typography } from '@mui/material';

interface CodeOfConductSectionProps {
  title: string;
  items: string[];
}
// FIXME: reflect the styling according to figma design: wcc-mentorship-code-of-conduct
export const CodeOfConductSection = ({
  title,
  items,
}: CodeOfConductSectionProps) => {
  return (
    <Box sx={{ marginBottom: '3rem' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        {title}
      </Typography>
      <Box component="ul" sx={{ paddingLeft: '2rem' }}>
        {items.map((item, key) => (
          <Typography
            component="li"
            variant="h5"
            key={`conduct-item-${key}`}
            sx={{ marginBottom: '1rem' }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
