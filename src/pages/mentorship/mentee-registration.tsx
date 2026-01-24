import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Box,
  Typography,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  TextField as MuiTextField,
} from '@mui/material';
import NextLink from 'next/link';
import { useForm, Controller } from 'react-hook-form';

import {
  CheckboxGroup,
  MenteeFormLayout,
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
    const payload = {
      mentee: {
        fullName: data.fullName,
        position: data.position,
        email: data.email,
        slackDisplayName: data.slackDisplayName,
        country: data.country,
        city: data.city,
        companyName: data.companyName || '',
        images: [],
        network: data.network || [],
        profileStatus: 'ACTIVE',
        skills: data.skills,
        spokenLanguages: data.spokenLanguages,
        bio: data.bio,
      },
      mentorshipType: data.mentorshipType,
      cycleYear: data.cycleYear,
      applications: data.applications,
    };
    // eslint-disable-next-line no-console
    console.log('Form payload:', payload);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const countries = [
    {
      value: { countryCode: 'US', countryName: 'United States' },
      label: 'United States',
    },
    { value: { countryCode: 'CA', countryName: 'Canada' }, label: 'Canada' },
    {
      value: { countryCode: 'GB', countryName: 'United Kingdom' },
      label: 'United Kingdom',
    },
    {
      value: { countryCode: 'AU', countryName: 'Australia' },
      label: 'Australia',
    },
    { value: { countryCode: 'DE', countryName: 'Germany' }, label: 'Germany' },
    { value: { countryCode: 'FR', countryName: 'France' }, label: 'France' },
    { value: { countryCode: 'IT', countryName: 'Italy' }, label: 'Italy' },
    { value: { countryCode: 'ES', countryName: 'Spain' }, label: 'Spain' },
    {
      value: { countryCode: 'NL', countryName: 'Netherlands' },
      label: 'Netherlands',
    },
    { value: { countryCode: 'BE', countryName: 'Belgium' }, label: 'Belgium' },
  ];

  const spokenLanguages = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Dutch', label: 'Dutch' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Portuguese', label: 'Portuguese' },
  ];

  const skillAreas = [
    { value: 'FRONTEND', label: 'Frontend' },
    { value: 'BACKEND', label: 'Backend' },
    { value: 'DEVOPS', label: 'DevOps' },
    { value: 'FULLSTACK', label: 'Full Stack' },
    { value: 'DATA', label: 'Data' },
    { value: 'MOBILE', label: 'Mobile' },
    { value: 'OTHER', label: 'Other' },
  ];

  const programmingLanguages = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C', label: 'C' },
    { value: 'C++', label: 'C++' },
    { value: 'C#', label: 'C#' },
    { value: 'Ruby', label: 'Ruby' },
    { value: 'Go', label: 'Go' },
    { value: 'Rust', label: 'Rust' },
    { value: 'PHP', label: 'PHP' },
    { value: 'Swift', label: 'Swift' },
    { value: 'Kotlin', label: 'Kotlin' },
  ];

  const mentorshipFocusOptions = [
    { value: 'Switch career to IT', label: 'Switch career to IT' },
    {
      value: 'Grow from beginner to mid-level',
      label: 'Grow from beginner to mid-level',
    },
    {
      value: 'Grow from mid-level to senior-level',
      label: 'Grow from mid-level to senior-level',
    },
    {
      value: 'Engineering management',
      label: 'Engineering management',
    },
    {
      value: 'Technical leadership',
      label: 'Technical leadership',
    },
    { value: 'Career advancement', label: 'Career advancement' },
  ];

  const currentYear = new Date().getFullYear();
  const cycleYears = Array.from({ length: 7 }, (_, i) => ({
    value: currentYear + i,
    label: String(currentYear + i),
  }));

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
        description={
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Thank you for your interest in our Mentoring Programme (Long-Term
              mentoring). We appreciate your enthusiasm and look forward to
              connecting with the mentor of your choice.
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              <strong>
                ‼️Important Information, Please read before submitting your
                application‼️
              </strong>
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              We want to emphasise that applying for a long-term mentorship
              carries a <strong>responsibility</strong> to maintain{' '}
              <strong>timely communication</strong> and{' '}
              <strong>respectful engagement</strong> with your chosen mentor and
              the mentorship coordinating team throughout the entire programme.
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              By submitting your application, you are committing to abide
              strictly by the community&apos;s{' '}
              <NextLink
                href="/mentorship/code-of-conduct"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                <strong>Mentee code of conduct</strong>
              </NextLink>
              . Repeated violation will result in a ban for future applications.
            </Typography>

            <Typography variant="body1" color="text.secondary">
              Thank you for your cooperation and we look forward to processing
              your application!
            </Typography>
          </Box>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 600, mb: 3 }}
            >
              Basic Information
            </Typography>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="fullName"
                control={control}
                label="Full Name"
                placeholder="Enter your full name"
                required
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="position"
                control={control}
                label="Position"
                placeholder="e.g. Frontend Developer, Software Engineer"
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

            <Box sx={{ mb: 2 }}>
              <TextField
                name="slackDisplayName"
                control={control}
                label="Slack Display Name"
                placeholder="@yourname"
                required
                helperText="Must start with @"
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="companyName"
                control={control}
                label="Company Name"
                placeholder="Enter your company name (optional)"
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
              Location
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Controller
                name="country"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth error={!!error}>
                    <InputLabel>Country</InputLabel>
                    <MuiSelect
                      {...field}
                      label="Country"
                      value={
                        field.value?.countryCode
                          ? JSON.stringify(field.value)
                          : ''
                      }
                      onChange={(e) => {
                        const selectedCountry = countries.find(
                          (c) => JSON.stringify(c.value) === e.target.value,
                        );
                        field.onChange(selectedCountry?.value || null);
                      }}
                      sx={{
                        backgroundColor: 'rgba(223, 227, 231, 1)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(223, 227, 231, 1)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(223, 227, 231, 1)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(223, 227, 231, 1)',
                        },
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Country</em>
                      </MenuItem>
                      {countries.map((country) => (
                        <MenuItem
                          key={country.value.countryCode}
                          value={JSON.stringify(country.value)}
                        >
                          {country.label}
                        </MenuItem>
                      ))}
                    </MuiSelect>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                name="city"
                control={control}
                label="City"
                placeholder="Enter your city"
                required
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
              Skills & Experience
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Controller
                name="skills.yearsExperience"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MuiTextField
                    {...field}
                    type="number"
                    label="Years of Experience"
                    placeholder="Enter years of experience"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 0)
                    }
                    sx={{
                      backgroundColor: 'rgba(223, 227, 231, 1)',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(223, 227, 231, 1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(223, 227, 231, 1)',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(223, 227, 231, 1)',
                      },
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <CheckboxGroup
                name="skills.areas"
                control={control}
                label="Areas"
                options={skillAreas}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <CheckboxGroup
                name="skills.languages"
                control={control}
                label="Programming Languages"
                options={programmingLanguages}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <CheckboxGroup
                name="skills.mentorshipFocus"
                control={control}
                label="Mentorship Focus"
                options={mentorshipFocusOptions}
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
              Languages
            </Typography>

            <Box sx={{ mb: 2 }}>
              <CheckboxGroup
                name="spokenLanguages"
                control={control}
                label="Spoken Languages"
                options={spokenLanguages}
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
              Bio
            </Typography>

            <Box sx={{ mb: 2 }}>
              <TextArea
                name="bio"
                control={control}
                label="Bio"
                placeholder="Tell us about yourself, your background, and what you're looking for in a mentorship"
                rows={6}
                helperText="Minimum 50 characters"
                required
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
              Mentorship Application
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Controller
                name="cycleYear"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth error={!!error}>
                    <InputLabel>Cycle Year</InputLabel>
                    <MuiSelect
                      {...field}
                      label="Cycle Year"
                      value={field.value || ''}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      sx={{
                        backgroundColor: 'rgba(223, 227, 231, 1)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(223, 227, 231, 1)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(223, 227, 231, 1)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(223, 227, 231, 1)',
                        },
                      }}
                    >
                      {cycleYears.map((year) => (
                        <MenuItem key={year.value} value={year.value}>
                          {year.label}
                        </MenuItem>
                      ))}
                    </MuiSelect>
                    {error && <FormHelperText>{error.message}</FormHelperText>}
                  </FormControl>
                )}
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
