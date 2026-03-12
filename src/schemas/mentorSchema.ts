import { z } from 'zod';

export const basicInfoObj = z.object({
  fullName: z.string().min(1, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  slackDisplayName: z.string().min(1, 'Please enter your Slack name'),
  country: z.string().min(1, 'Please select your country'),
  city: z.string().min(1, 'Please enter your city'),
  position: z.string().min(1, 'Please enter your job title'),
  companyName: z.string().min(1, 'Please enter your company name'),

  isLongTermMentor: z.boolean().optional(),
  isAdHocMentor: z.boolean().optional(),
  maxMentees: z.string().optional(),
  adHocAvailability: z.record(z.string(), z.string()).optional(),

  calendlyLink: z
    .string()
    .url('Please enter a valid URL')
    .refine(
      (url) => url.includes('calendly.com'),
      'Please enter a valid Calendly URL (e.g., https://calendly.com/yourname)',
    ),
  menteeExpectations: z
    .string()
    .min(
      10,
      'Please provide at least 10 characters describing your ideal mentee',
    ),
  openToNonWomen: z
    .enum(['true', 'false'], {
      message: 'Please select an option',
    })
    .transform((val) => val === 'true'),
});

const validateBasicInfo = (
  data: z.infer<typeof basicInfoObj>,
  ctx: z.RefinementCtx,
) => {
  if (!data.isLongTermMentor && !data.isAdHocMentor) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select at least one mentorship format',
      path: ['isLongTermMentor'],
    });
  }
  if (
    data.isLongTermMentor &&
    (!data.maxMentees || data.maxMentees.length === 0)
  ) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select the number of mentees',
      path: ['maxMentees'],
    });
  }
  if (data.isAdHocMentor) {
    const hasAvailability =
      data.adHocAvailability && Object.keys(data.adHocAvailability).length > 0;
    if (!hasAvailability) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please select availability for at least one month',
        path: ['adHocAvailability'],
      });
    }
  }
};

export const basicInfoSchema = basicInfoObj.superRefine(validateBasicInfo);
export type BasicInfoData = z.infer<typeof basicInfoSchema>;

export const profileSchema = z.object({
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  yearsExperience: z.string().min(1, 'Please select your years of experience'),
  bio: z
    .string()
    .min(10, 'Please provide at least 10 characters for your bio')
    .max(1000, 'Bio must not exceed 1000 characters'),
  mentorshipFocus: z.string().optional(),
  imageUrl: z
    .url('Please enter a valid image URL')
    .optional()
    .or(z.literal('')),
});

export type ProfileData = z.infer<typeof profileSchema>;
export const technicalAreaProficiencySchema = z.object({
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

export const languageProficiencySchema = z.object({
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

export const skillsSchema = z.object({
  technicalAreas: z
    .array(technicalAreaProficiencySchema)
    .optional()
    .default([]),
});
export type SkillsData = z.infer<typeof skillsSchema>;

export const programmingSchema = z.object({
  codeLanguages: z.array(languageProficiencySchema).optional().default([]),
  mentorshipFocusAreas: z
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
    .optional()
    .default([]),
});
export type ProgrammingData = z.infer<typeof programmingSchema>;

export const reviewSchema = z.object({
  linkedin: z.url({ message: 'Invalid LinkedIn URL' }),
  github: z.url({ message: 'Invalid URL' }).optional().or(z.literal('')),
  instagram: z.url({ message: 'Invalid URL' }).optional().or(z.literal('')),
  medium: z.url({ message: 'Invalid URL' }).optional().or(z.literal('')),
  website: z.url({ message: 'Invalid URL' }).optional().or(z.literal('')),
  otherSocial: z.url({ message: 'Invalid URL' }).optional().or(z.literal('')),
  identity: z.string().min(1, 'Please select an option'),
  pronouns: z.string().min(1, 'Pronouns are required'),
  socialHighlight: z.string().min(1, 'Please select Yes or No'),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the code of conduct and terms',
  }),
});
export type ReviewData = z.infer<typeof reviewSchema>;

export const mentorRegistrationSchema = z
  .object({
    ...basicInfoObj.shape,
    ...profileSchema.shape,
    ...skillsSchema.shape,
    ...programmingSchema.shape,
    ...reviewSchema.shape,
  })
  .superRefine(validateBasicInfo);

export type MentorRegistrationData = z.infer<typeof mentorRegistrationSchema>;
