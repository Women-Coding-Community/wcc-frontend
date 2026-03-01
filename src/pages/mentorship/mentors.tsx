// path: /mentorship/mentors
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Collapse,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { BreadCrumbsDynamic, MentorProfileCard, Title } from '@components';
import { useIsMobile } from '@utils/theme-utils';
// eslint-disable-next-line import/order
import { Mentor } from '@utils/types';

type FilterSection = {
  types: string[];
  skills: {
    yearsExperience?: number;
    areas: string[];
    languages: string[];
    mentorshipFocus: string[];
  };
};

import theme from 'theme';

const filterYearExperienceOptions = [
  { label: 'Any', value: '0' },
  { label: '3+ years', value: '3' },
  { label: '5+ years', value: '5' },
  { label: '10+ years', value: '10' },
];
const MentorsPage = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { query } = router;

  const [mentorsState, setMentorsState] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [selectedYearsExperience, setSelectedYearsExperience] =
    useState<string>('');
  const [selectedAreas, setSelectedAreas] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedFocus, setSelectedFocus] = useState<string>('');
  const [filterSection, setFilterSection] = useState<FilterSection | null>(
    null,
  );

  // Initialize filter state from URL query params
  useEffect(() => {
    if (!query) return;
    if (typeof query.keyword === 'string') setKeyword(query.keyword);
    if (typeof query.yearsExperience === 'string') {
      setSelectedYearsExperience(query.yearsExperience);
    } else {
      setSelectedYearsExperience('');
    }
    if (typeof query.areas === 'string') setSelectedAreas(query.areas);
    if (typeof query.language === 'string') setSelectedLanguage(query.language);
    if (typeof query.focus === 'string') setSelectedFocus(query.focus);
  }, [query]);

  // Fetch mentors on mount and when filters change
  useEffect(() => {
    if (!router.isReady) return;

    const call = async () => {
      setLoading(true);
      try {
        // Build query string from all filter params in a loop
        const params = new URLSearchParams();
        const filterKeys = [
          'keyword',
          'yearsExperience',
          'areas',
          'language',
          'focus',
        ];
        filterKeys.forEach((key) => {
          const value = query[key];
          if (value) {
            params.append(key, Array.isArray(value) ? value[0] : value);
          }
        });

        const url = params.toString()
          ? `/api/mentors?${params.toString()}`
          : '/api/mentors';
        const res = await fetch(url);
        const result = await res.json();
        if (
          result &&
          (Array.isArray(result.mentors) ||
            (result.filterSection && Array.isArray(result.mentors)))
        ) {
          // If response is flat (mock), or wrapped (API)
          if (Array.isArray(result.mentors)) {
            setMentorsState(result.mentors);
            setFilterSection(result.filterSection || null);
          } else if (result.data && Array.isArray(result.data.mentors)) {
            setMentorsState(result.data.mentors);
            setFilterSection(result.data.filterSection || null);
          }
        } else {
          setMentorsState([]);
          setFilterSection(null);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch mentors with params', err);
      } finally {
        setLoading(false);
      }
    };

    call();
  }, [router.isReady, query]);

  const applyFilters = (opts?: {
    keyword?: string;
    yearsExperience?: string;
    areas?: string;
    language?: string;
    focus?: string;
  }) => {
    const next = {
      ...(router.query || {}),
      ...opts,
    } as Record<string, any>;

    // remove empty values
    Object.keys(next).forEach((k) => {
      if (next[k] === undefined || next[k] === null || next[k] === '') {
        delete next[k];
      }
    });

    router.replace({ pathname: router.pathname, query: next }, undefined, {
      shallow: true,
    });
  };

  const handleClearFilters = () => {
    setKeyword('');
    setSelectedYearsExperience('');
    setSelectedAreas('');
    setSelectedLanguage('');
    setSelectedFocus('');
    // Remove all filter params from the URL
    router.replace({ pathname: router.pathname }, undefined, { shallow: true });
  };

  return (
    <>
      {isMobile ? null : <BreadCrumbsDynamic />}
      <Title title="Meet Our Mentors" />
      <Box sx={theme.custom.containerBox}>
        {/* Filter / Search bar */}
        <Box
          sx={{
            width: isMobile ? '100%' : '50%',
            mb: 3,
            padding: '2rem',
            backgroundColor: theme.palette.primary.light,
          }}
        >
          <Grid container alignItems="center">
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                placeholder="Search by mentor name"
                variant="outlined"
                size="medium"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    applyFilters({ keyword });
                  }
                }}
                onBlur={() => applyFilters({ keyword })}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ height: '100%' }}>
                      <IconButton
                        aria-label="search"
                        onClick={() => applyFilters({ keyword })}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'common.white',
                          borderRadius: '0 28px 28px 0',
                          height: 'auto',
                          width: 120,
                          padding: '1rem',
                          left: '1rem',
                          ml: 0,
                          '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '28px',
                    overflow: 'hidden',
                  },
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{ textAlign: { xs: 'left', md: 'right' } }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                onClick={() => setFiltersOpen((s) => !s)}
                sx={{
                  borderRadius: '100px',
                  px: 4,
                  mt: { xs: 2, md: 0 },
                  height: 'auto',
                  width: isMobile ? 120 : 150,
                  padding: '1rem',
                  '&:hover': { backgroundColor: 'primary.dark' },
                }}
                startIcon={<TuneIcon />}
              >
                Filters
              </Button>
            </Grid>
          </Grid>

          <Collapse in={filtersOpen} timeout="auto" unmountOnExit>
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: 'background.paper',
                borderRadius: 2,
              }}
            >
              <Grid container spacing={2}>
                {/* First row: filter dropdowns */}
                <Grid item xs={12}>
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <FormControl sx={{ minWidth: 120, flex: 1 }}>
                      <InputLabel id="filter-experience-label">
                        Experience
                      </InputLabel>
                      <Select
                        labelId="filter-experience-label"
                        value={selectedYearsExperience}
                        label="Experience"
                        onChange={(e) => {
                          const selectedExperience = e.target.value as string;
                          setSelectedYearsExperience(selectedExperience);
                          applyFilters({ yearsExperience: selectedExperience });
                        }}
                      >
                        {filterYearExperienceOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120, flex: 1 }}>
                      <InputLabel id="filter-area-label">Expertise</InputLabel>
                      <Select
                        labelId="filter-area-label"
                        value={selectedAreas}
                        label="Expertise"
                        onChange={(e) => {
                          const v = e.target.value as string;
                          setSelectedAreas(v);
                          applyFilters({ areas: v });
                        }}
                      >
                        {filterSection?.skills?.areas?.map((area: string) => (
                          <MenuItem key={area} value={area}>
                            {area}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120, flex: 1 }}>
                      <InputLabel id="filter-language-label">
                        Language
                      </InputLabel>
                      <Select
                        labelId="filter-language-label"
                        value={selectedLanguage}
                        label="Language"
                        onChange={(e) => {
                          const v = e.target.value as string;
                          setSelectedLanguage(v);
                          applyFilters({ language: v });
                        }}
                      >
                        {filterSection?.skills?.languages?.map(
                          (language: string) => (
                            <MenuItem key={language} value={language}>
                              {language}
                            </MenuItem>
                          ),
                        )}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 120, flex: 1 }}>
                      <InputLabel id="filter-focus-label">
                        Mentee Focus
                      </InputLabel>
                      <Select
                        labelId="filter-focus-label"
                        value={selectedFocus}
                        label="Mentee Focus"
                        onChange={(e) => {
                          const focus = e.target.value as string;
                          setSelectedFocus(focus);
                          applyFilters({ focus: focus });
                        }}
                      >
                        {filterSection?.skills?.mentorshipFocus?.map(
                          (skill: string) => (
                            <MenuItem key={skill} value={skill}>
                              {skill}
                            </MenuItem>
                          ),
                        )}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                {/* Second row: Clear all filters button right-aligned */}
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={handleClearFilters}
                    >
                      Clear all filters
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Box>
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 200,
            }}
          >
            <span>Loading mentors...</span>
          </Box>
        ) : mentorsState.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 200,
            }}
          >
            <span>No mentors found.</span>
          </Box>
        ) : (
          <Grid
            container
            spacing={0}
            justifyContent="center"
            alignItems="center"
            sx={{
              padding: '21px 16px 48px 16px',
              maxWidth: isMobile ? '100%' : '1128px',
              margin: '0 auto',
            }}
            direction={isMobile ? 'column' : 'row'}
          >
            {mentorsState.map((mentor: Mentor) => (
              <MentorProfileCard
                mentor={mentor}
                key={mentor.id || mentor.fullName}
              />
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default MentorsPage;
