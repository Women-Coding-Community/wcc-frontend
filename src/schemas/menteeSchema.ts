import { z } from 'zod';

import {
  countrySchema,
  languageProficiencySchema,
  mentorshipFocusAreaSchema,
  networkSchema,
  technicalAreaProficiencySchema,
} from './commonSchema';

const skillsSchema = z.object({
  yearsExperience: z.number().min(0).max(50),
  areas: z
    .array(technicalAreaProficiencySchema)
    .min(1, 'Select at least one area'),
  languages: z
    .array(languageProficiencySchema)
    .min(1, 'Select at least one programming language'),
  mentorshipFocus: z
    .array(mentorshipFocusAreaSchema)
    .min(1, 'Select at least one focus area'),
});

const applicationSchema = z.object({
  mentorId: z.number().positive('Please select a mentor'),
  priorityOrder: z.number().min(1).max(5),
  whyMentor: z
    .string()
    .min(50, 'Please explain why you chose this mentor (min 50 characters)'),
  applicationMessage: z.string().optional(),
});

export const menteeFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  position: z.string().min(1, 'Position is required'),
  email: z.email('Please enter a valid email address'),
  slackDisplayName: z
    .string()
    .min(2, 'Slack display name is required')
    .regex(/^@/, 'Slack name must start with @'),
  companyName: z.string().min(1, 'Company name is required'),
  country: countrySchema,
  city: z.string().min(1, 'Please enter your city'),
  linkedInProfile: z.url('Please enter a valid LinkedIn URL'),
  pronouns: z.string(),
  isWomen: z.boolean({ error: 'Please select an option' }).optional(),
  pronounCategory: z
    .enum([
      'FEMININE',
      'MASCULINE',
      'NEUTRAL',
      'MULTIPLE',
      'NEOPRONOUNS',
      'ANY',
      'UNSPECIFIED',
    ])
    .optional(),
  availableHsMonth: z
    .number()
    .min(1, 'Please enter at least 2 hours per month')
    .max(224, 'Maximum 224 hours per month'),
  skills: skillsSchema,
  spokenLanguages: z
    .array(z.string())
    .min(1, 'Select at least one spoken language'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  network: z.array(networkSchema).optional(),
  mentorshipType: z.enum(['AD_HOC', 'LONG_TERM']),
  applications: z
    .array(applicationSchema)
    .min(1, 'Please select at least one mentor')
    .max(5, 'Maximum 5 mentor selections'),
});

export type MenteeFormData = z.infer<typeof menteeFormSchema>;

export const menteeFormDefaultValues: Partial<MenteeFormData> = {
  fullName: '',
  position: '',
  email: '',
  slackDisplayName: '',
  companyName: '',
  country: { countryCode: '', countryName: '' },
  city: '',
  linkedInProfile: '',
  pronouns: '',
  availableHsMonth: 0,
  skills: {
    yearsExperience: 0,
    areas: [],
    languages: [],
    mentorshipFocus: [],
  },
  spokenLanguages: [],
  bio: '',
  network: [],
  mentorshipType: 'LONG_TERM',
  applications: [],
};
