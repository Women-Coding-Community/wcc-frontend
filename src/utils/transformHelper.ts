import { MentorRegistrationData } from '@schemas/mentorSchema';

import { COUNTRIES } from './mentorshipConstants';

// Transform form data to API payload
export function transformPayload(data: MentorRegistrationData) {
  const getPronounCategory = (pronouns: string) => {
    const p = pronouns.toLowerCase();
    if (p.includes('she')) return 'Feminine';
    if (p.includes('he')) return 'Masculine';
    if (p.includes('they')) return 'Neutral';
    return '';
  };

  const parseYearsExperience = (str: string) => {
    const match = str.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const mapTechnicalAreas = (arr: any) =>
    Array.isArray(arr)
      ? arr.map((area) => ({
          technicalArea: area.technicalArea || '',
          proficiencyLevel: area.proficiencyLevel || '',
        }))
      : [];

  const mapLanguages = (arr: any) =>
    Array.isArray(arr)
      ? arr.map((language) =>
          typeof language === 'string'
            ? { language: language, proficiencyLevel: '' }
            : {
                language: language.language || language,
                proficiencyLevel: language.proficiencyLevel || '',
              },
        )
      : [];

  // Images
  const mapImages = (url: string) =>
    url ? [{ path: url, alt: 'Mentor profile image', type: 'DESKTOP' }] : [];

  // Country: look up code and name from COUNTRIES
  const mapCountry = (country: string) => {
    if (!country) return { countryCode: '', countryName: '' };
    const selectedCountry = COUNTRIES.find(
      (c) => c.name === country || c.code === country,
    );
    return selectedCountry
      ? { countryCode: selectedCountry.code, countryName: selectedCountry.name }
      : { countryCode: '', countryName: country };
  };

  const mapMenteeSection = (input: any) => ({
    idealMentee: input.menteeExpectations || '',
    additional: '',
    longTerm: input.isLongTermMentor
      ? { numMentee: Number(input.maxMentees) || 0, hours: 2 }
      : undefined,
    adHoc:
      input.isAdHocMentor && input.adHocAvailability
        ? Object.entries(input.adHocAvailability).map(([month, hours]) => ({
            month: month.toUpperCase(),
            hours: Number(hours),
          }))
        : [],
  });

  return {
    id: 0,
    fullName: data.fullName || '',
    position: data.position || '',
    email: data.email || '',
    slackDisplayName: data.slackDisplayName || '',
    country: mapCountry(data.country),
    city: data.city || '',
    companyName: data.companyName || '',
    memberTypes: ['MENTOR'],
    images: mapImages(data.imageUrl || ''),
    network: [],
    profileStatus: ['PENDING'],
    pronouns: data.pronouns || '',
    pronounCategory: getPronounCategory(data.pronouns),
    isWomen: data.identity === 'Yes' || false,
    skills: {
      yearsExperience: parseYearsExperience(data.yearsExperience),
      areas: mapTechnicalAreas(data.technicalAreas),
      languages: mapLanguages(data.codeLanguages),
      mentorshipFocus: Array.isArray(data.mentorshipFocusAreas)
        ? data.mentorshipFocusAreas
        : [],
    },
    spokenLanguages: data.languages || [],
    bio: data.bio || '',
    menteeSection: mapMenteeSection(data),
    linkedin: data.linkedin || '',
    github: data.github || '',
    instagram: data.instagram || '',
    medium: data.medium || '',
    website: data.website || '',
    otherSocial: data.otherSocial || '',
    socialHighlight: data.socialHighlight || '',
    calendlyLink: data.calendlyLink || '',
    acceptMale: !data.openToNonWomen,
    termsAgreed: !!data.termsAgreed,
  };
}
