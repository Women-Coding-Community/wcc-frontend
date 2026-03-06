import { z } from 'zod';

const countrySchema = z.object({
  countryCode: z.string().min(2, 'Country code is required'),
  countryName: z.string().min(1, 'Country name is required'),
});

const networkSchema = z.object({
  type: z.enum(['LINKEDIN', 'GITHUB', 'WEBSITE', 'MEDIUM', 'TWITTER']),
  link: z.string().url('Please enter a valid URL'),
});

const technicalAreaProficiencySchema = z.object({
  technicalArea: z.enum([
    'BACKEND',
    'BUSINESS_ANALYSIS',
    'CLOUD_ENGINEER',
    'DATA_SCIENCE',
    'DATA_ENGINEERING',
    'DEVOPS',
    'DISTRIBUTED_SYSTEMS',
    'ENG_MANAGEMENT',
    'FRONTEND',
    'FULLSTACK',
    'MACHINE_LEARNING',
    'MOBILE_ANDROID',
    'MOBILE_IOS',
    'OTHER',
    'PROD_MANAGEMENT',
    'PROJ_MANAGEMENT',
    'QA',
  ]),
  proficiencyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
});

const languageProficiencySchema = z.object({
  language: z.enum([
    'C_LANGUAGE',
    'C_PLUS_PLUS',
    'C_SHARP',
    'GO',
    'JAVA',
    'JAVASCRIPT',
    'KOTLIN',
    'PHP',
    'PYTHON',
    'RUBY',
    'RUST',
    'TYPESCRIPT',
    'OTHER',
  ]),
  proficiencyLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
});

const skillsSchema = z.object({
  yearsExperience: z.number().min(0).max(50),
  areas: z
    .array(technicalAreaProficiencySchema)
    .min(1, 'Select at least one area'),
  languages: z
    .array(languageProficiencySchema)
    .min(1, 'Select at least one programming language'),
  mentorshipFocus: z
    .array(
      z.enum([
        'SWITCH_CAREER_TO_IT',
        'GROW_BEGINNER_TO_MID',
        'GROW_MID_TO_SENIOR',
        'GROW_BEYOND_SENIOR',
        'SWITCH_TO_MANAGEMENT',
        'CHANGE_SPECIALISATION',
      ]),
    )
    .min(1, 'Select at least one focus area'),
});

const applicationSchema = z.object({
  mentorId: z.number().positive('Please select a mentor'),
  priorityOrder: z.number().min(1).max(5),
  whyMentor: z
    .string()
    .min(10, 'Please explain why you chose this mentor (min 10 characters)'),
  applicationMessage: z.string().optional(),
});

export const menteeFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  position: z.string().min(1, 'Position is required'),
  email: z.email('Please enter a valid email address'),
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
    .optional()
    .or(z.literal('')),
  pronouns: z.string().optional(),
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
  availableHsMonth: z.number().min(1, 'Please enter at least 1 hour per month'),
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
  availableHsMonth: 2,
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
