import { z } from 'zod';

export const proficiencyLevelSchema = z.enum([
  'BEGINNER',
  'INTERMEDIATE',
  'ADVANCED',
  'EXPERT',
]);

export const technicalAreaSchema = z.enum([
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
  'NETWORK_ENGINEERING',
  'OTHER',
  'PROD_MANAGEMENT',
  'PROJ_MANAGEMENT',
  'QA',
  'SECURITY',
  'SRE',
]);

export const technicalAreaProficiencySchema = z.object({
  technicalArea: technicalAreaSchema,
  proficiencyLevel: proficiencyLevelSchema,
});

export const technicalLanguageSchema = z.enum([
  'BASH',
  'C_LANGUAGE',
  'C_PLUS_PLUS',
  'C_SHARP',
  'DART',
  'GO',
  'HCL',
  'JAVA',
  'JAVASCRIPT',
  'KOTLIN',
  'OPENTOFU',
  'OTHER',
  'PHP',
  'PYTHON',
  'REGO',
  'RUBY',
  'RUST',
  'SCALA',
  'SWIFT',
  'TERRAFORM',
  'TYPESCRIPT',
  'YAML',
]);

export const languageProficiencySchema = z.object({
  language: technicalLanguageSchema,
  proficiencyLevel: proficiencyLevelSchema,
});

export const mentorshipFocusAreaSchema = z.enum([
  'SWITCH_CAREER_TO_IT',
  'GROW_BEGINNER_TO_MID',
  'GROW_MID_TO_SENIOR',
  'GROW_BEYOND_SENIOR',
  'SWITCH_TO_MANAGEMENT',
  'CHANGE_SPECIALISATION',
]);

export const countrySchema = z
  .object({
    countryCode: z.string(),
    countryName: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.countryCode || !data.countryName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide a country',
      });
    }
  });

export const networkSchema = z.object({
  type: z.enum(['LINKEDIN', 'GITHUB', 'WEBSITE', 'MEDIUM', 'TWITTER']),
  link: z.url('Please enter a valid URL'),
});
