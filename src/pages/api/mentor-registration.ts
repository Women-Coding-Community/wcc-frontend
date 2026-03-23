import { NextApiRequest, NextApiResponse } from 'next';

import { COUNTRIES } from '@utils/mentorshipConstants';
import { MentorRegistrationData } from 'schemas/mentorSchema';

import { proxyRequest } from '../../lib/api';

/**
 * Mapping from frontend MentorRegistrationData to backend MentorDto structure.
 */
function mapToBackendMentorDto(data: MentorRegistrationData) {
  // Map social networks
  const network = [];
  if (data.linkedin) network.push({ type: 'LINKEDIN', link: data.linkedin });
  if (data.github) network.push({ type: 'GITHUB', link: data.github });
  if (data.instagram) network.push({ type: 'INSTAGRAM', link: data.instagram });
  if (data.medium) network.push({ type: 'MEDIUM', link: data.medium });
  if (data.website) network.push({ type: 'WEBSITE', link: data.website });
  if (data.otherSocial) network.push({ type: 'OTHER', link: data.otherSocial });

  // Map PronounCategory
  const pronounCategory = data.identity === 'Yes' ? 'FEMININE' : 'UNSPECIFIED';

  // Map MenteeSection
  const longTerm = data.isLongTermMentor
    ? {
        numMentee: parseInt(data.maxMentees || '0', 10),
        hours: parseInt(data.maxMentees || '0', 10) * 2, // Backend requires total hours, e.g. 2h per mentee
      }
    : null;

  const adHoc =
    data.isAdHocMentor && data.adHocAvailability
      ? Object.entries(data.adHocAvailability)
          .filter(
            ([, availability]) =>
              availability !== undefined &&
              availability !== null &&
              availability !== '',
          )
          .map(([month, availability]) => {
            const monthNames = [
              'JANUARY',
              'FEBRUARY',
              'MARCH',
              'APRIL',
              'MAY',
              'JUNE',
              'JULY',
              'AUGUST',
              'SEPTEMBER',
              'OCTOBER',
              'NOVEMBER',
              'DECEMBER',
            ];
            const monthIndex = monthNames.indexOf(month.toUpperCase());
            return {
              month: monthIndex !== -1 ? monthIndex + 1 : 0,
              hours: parseInt(availability as string, 10) || 0,
            };
          })
      : [];

  // Find country code from name
  const countryObj = COUNTRIES.find((c) => c.name === data.country);
  const countryCode = countryObj ? countryObj.code : data.country;

  return {
    fullName: data.fullName,
    position: data.position,
    email: data.email,
    slackDisplayName: data.slackDisplayName,
    country: {
      countryCode,
      countryName: data.country,
    },
    city: data.city,
    companyName: data.companyName,
    spokenLanguages: data.languages,
    bio: data.bio,
    pronouns: data.pronouns,
    pronounCategory,
    isWomen: data.identity === 'Yes',
    calendlyLink: data.calendlyLink,
    acceptMale: data.openToNonWomen,
    acceptPromotion: data.socialHighlight === 'Yes',
    skills: {
      yearsExperience: parseInt(data.yearsExperience as any as string, 10) || 0,
      areas: data.technicalAreas.map((area: any) => ({
        technicalArea: (area.technicalArea || area.name)
          ?.toUpperCase()
          ?.replace(/\s+/g, '_')
          .replace('C++', 'C_PLUS_PLUS')
          .replace('C#', 'C_SHARP'),
        proficiencyLevel: (
          area.proficiencyLevel || area.proficiency
        )?.toUpperCase(),
      })),
      languages: data.codeLanguages.map((lang: any) => ({
        language: (lang.language || lang.name)
          ?.toUpperCase()
          ?.replace(/\s+/g, '_')
          .replace('C++', 'C_PLUS_PLUS')
          .replace('C#', 'C_SHARP'),
        proficiencyLevel: (
          lang.proficiencyLevel || lang.proficiency
        )?.toUpperCase(),
      })),
      mentorshipFocus: data.mentorshipFocusAreas.map((focus) =>
        focus.toUpperCase(),
      ),
    },
    menteeSection: {
      idealMentee: data.menteeExpectations,
      additional: data.mentorshipFocus || '',
      longTerm,
      adHoc,
    },
    network,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const backendPayload = mapToBackendMentorDto(req.body);
    const data = await proxyRequest(
      'mentors',
      {
        method: 'POST',
        data: backendPayload,
      },
      true,
    );

    return res.status(201).json(data ?? {});
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    if (error.message === 'Server configuration error') {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
