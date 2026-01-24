import { z } from 'zod';

const countrySchema = z.object({
  countryCode: z.string().min(2, 'Country code is required'),
  countryName: z.string().min(1, 'Country name is required'),
});

const networkSchema = z.object({
  type: z.enum(['LINKEDIN', 'GITHUB', 'WEBSITE', 'MEDIUM', 'TWITTER']),
  link: z.string().url('Please enter a valid URL'),
});

const skillsSchema = z.object({
  yearsExperience: z.number().min(0).max(50),
  areas: z
    .array(
      z.enum([
        'FRONTEND',
        'BACKEND',
        'DEVOPS',
        'FULLSTACK',
        'DATA',
        'MOBILE',
        'OTHER',
      ]),
    )
    .min(1, 'Select at least one area'),
  languages: z
    .array(z.string())
    .min(1, 'Select at least one programming language'),
  mentorshipFocus: z.array(z.string()).min(1, 'Select at least one focus area'),
});

const applicationSchema = z.object({
  mentorId: z.number().positive(),
  priorityOrder: z.number().min(1).max(3),
});

export const menteeFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  position: z.string().min(1, 'Position is required'),
  email: z.string().email('Please enter a valid email address'),
  slackDisplayName: z
    .string()
    .min(1, 'Slack display name is required')
    .regex(/^@/, 'Slack name must start with @'),
  companyName: z.string().optional(),
  country: countrySchema.optional(),
  city: z.string().min(1, 'Please enter your city'),
  linkedInProfile: z
    .string()
    .url('Please enter a valid LinkedIn URL')
    .optional(),
  skills: skillsSchema,
  spokenLanguages: z
    .array(z.string())
    .min(1, 'Select at least one spoken language'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  network: z.array(networkSchema).optional(),
  mentorshipType: z.literal('LONG-TERM'),
  cycleYear: z.number().min(2024).max(2030),
  applications: z
    .array(applicationSchema)
    .max(3, 'Maximum 3 mentor selections'),
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
  skills: {
    yearsExperience: 0,
    areas: [],
    languages: [],
    mentorshipFocus: [],
  },
  spokenLanguages: [],
  bio: '',
  network: [],
  mentorshipType: 'LONG-TERM',
  cycleYear: new Date().getFullYear(),
  applications: [],
};
