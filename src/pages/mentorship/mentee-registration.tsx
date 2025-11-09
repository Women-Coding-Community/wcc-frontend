import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Box,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  CheckboxGroup,
  MenteeFormLayout,
  RadioGroup,
  Select,
  TextArea,
  TextField,
} from '@components';
import {
  menteeFormDefaultValues,
  menteeFormSchema,
  MenteeFormData,
} from '@schemas/menteeSchema';

const MenteeRegistrationPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<MenteeFormData>({
    resolver: zodResolver(menteeFormSchema),
    defaultValues: menteeFormDefaultValues,
  });

  const onSubmit = async (data: MenteeFormData) => {
    // eslint-disable-next-line no-console
    console.log('Form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };
  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'other', label: 'Other' },
  ];

  const cities = [
    { value: 'new-york', label: 'New York' },
    { value: 'london', label: 'London' },
    { value: 'toronto', label: 'Toronto' },
    { value: 'sydney', label: 'Sydney' },
    { value: 'berlin', label: 'Berlin' },
    { value: 'paris', label: 'Paris' },
    { value: 'other', label: 'Other' },
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'french', label: 'French' },
    { value: 'italian', label: 'Italien' },
  ];

  const radioOptions = [
    { value: 'option-one', label: 'Option one' },
    { value: 'option-two', label: 'Option two' },
    { value: 'option-three', label: 'Option three' },
  ];

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'white',
          py: 2,
          px: { xs: 2, sm: 3, md: '157px' },
        }}
      >
        <Breadcrumbs>
          <Link href="/" color="primary" underline="always">
            Home
          </Link>
          <Link href="/mentorship" color="primary" underline="always">
            Mentorship
          </Link>
          <Typography color="text.primary">Mentee Registration</Typography>
        </Breadcrumbs>
      </Box>
      <MenteeFormLayout
        title="Mentee Registration"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Basic information
            </Typography>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="name"
                control={control}
                label="Name (first and last)"
                placeholder="Enter your full name"
                required
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="email"
                control={control}
                label="Email"
                type="email"
                placeholder="Enter your email address"
                required
              />
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Select
                  name="country"
                  control={control}
                  label="Country"
                  options={countries}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  name="city"
                  control={control}
                  label="City"
                  options={cities}
                />
              </Grid>
            </Grid>

            <Box sx={{ mb: 2 }}>
              <CheckboxGroup
                name="languages"
                control={control}
                label="Select one or more"
                options={languages}
                showOtherOption
                otherFieldName="otherLanguage"
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Section Heading
            </Typography>

            <Box sx={{ mb: 2 }}>
              <TextArea
                name="textAreaField"
                control={control}
                label="Text area heading"
                placeholder="Enter text here"
                rows={4}
                helperText="Supporting text"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="textField1"
                control={control}
                label="Text field heading"
                placeholder="Enter text"
                required
                helperText="Supporting text"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="textField2"
                control={control}
                label="Text field heading"
                placeholder="Enter text"
                required
                helperText="Supporting text"
              />
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Section Heading
            </Typography>

            <Box sx={{ mb: 2 }}>
              <RadioGroup
                name="radioOption"
                control={control}
                label="Input heading"
                options={radioOptions}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="textField3"
                control={control}
                label="Text field heading"
                placeholder="Enter text"
                required
                helperText="Supporting text"
              />
            </Box>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </form>
      </MenteeFormLayout>
    </>
  );
};

export default MenteeRegistrationPage;
