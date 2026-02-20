import { z } from 'zod';

export const basicInfoObj = z.object({
  firstName: z.string().min(1, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  slackName: z.string().min(1, 'Please enter your Slack name'),
  country: z.string().min(1, 'Please select your country'),
  city: z.string().min(1, 'Please enter your city'),
  jobTitle: z.string().min(1, 'Please enter your job title'),
  company: z.string().min(1, 'Please enter your company name'),

  isLongTermMentor: z.boolean().optional(),
  isAdHocMentor: z.boolean().optional(),

  maxMentees: z.string().optional(),
  adHocAvailability: z.record(z.string(), z.string()).optional(),

  calendlyLink: z.string()
    .url('Please enter a valid URL')
    .refine(
      (url) => url.includes('calendly.com'),
      'Please enter a valid Calendly URL (e.g., https://calendly.com/yourname)'
    ),
  menteeExpectations: z.string()
    .min(10, 'Please provide at least 10 characters describing your ideal mentee'),
  openToNonWomen: z.enum(['true', 'false'], {
  message: 'Please select an option',
}).transform((val) => val === 'true'),

});

const validateBasicInfo = (data: z.infer<typeof basicInfoObj>, ctx: z.RefinementCtx) => {
  if (!data.isLongTermMentor && !data.isAdHocMentor) {
    ctx.addIssue({
      code: "custom",
      message: "Please select at least one mentorship type",
      path: ["isLongTermMentor"],
    });
  }

  if (data.isLongTermMentor) {
    if (!data.maxMentees || data.maxMentees.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Please select the number of mentees",
        path: ["maxMentees"],
      });
    }
  }

  if (data.isAdHocMentor) {
    const hasAvailability = data.adHocAvailability && Object.keys(data.adHocAvailability).length > 0;
    if (!hasAvailability) {
      ctx.addIssue({
        code: "custom",
        message: "Please select availability for at least one month",
        path: ["adHocAvailability"],
      });
    }
  }
};
export const basicInfoSchema = basicInfoObj.superRefine(validateBasicInfo);
export type BasicInfoData = z.infer<typeof basicInfoSchema>;

export const profileSchema = z.object({
  languages: z.array(z.string()).min(1, "Please select at least one language"),
  yearsOfExperience: z.string().min(1, "Please select your years of experience"),
  bio: z.string()
    .min(10, "Please provide at least 10 characters for your bio")
    .max(1000, "Bio must not exceed 1000 characters"),
  mentoringTopics: z.string().optional(),
  photoSource: z.enum(['linkedin', 'slack', 'other'], {
  message: 'Please select a photo source',
}),
  customPhotoUrl: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
}).refine(
  (data) => {
    if (data.photoSource === 'other') {
      return data.customPhotoUrl && data.customPhotoUrl.length > 0;
    }
    return true;
  },
  {
    message: 'Please provide a photo URL',
    path: ['customPhotoUrl'],
  }
);

export type ProfileData = z.infer<typeof profileSchema>;

const skillLevel = z.string().optional();

export const skillsSchema = z.object({
  dataEngineering: skillLevel,
  dataScience: skillLevel,
  genAI: skillLevel,
  machineLearning: skillLevel,
  mlOps: skillLevel,

  cloudComputing: skillLevel,
  devOps: skillLevel,
  networkEngineering: skillLevel,
  platformEngineering: skillLevel,
  security: skillLevel,
  sre: skillLevel,

  agile: skillLevel,
  businessAnalysis: skillLevel,
  engineeringMgmt: skillLevel,
  productMgmt: skillLevel,
  projectMgmt: skillLevel,
  technicalLeadership: skillLevel,

  backend: skillLevel,
  frontend: skillLevel,
  fullstack: skillLevel,
  mobileAndroid: skillLevel,
  mobileIos: skillLevel,
  qaAutomation: skillLevel,
  systemDesign: skillLevel,
});
export type SkillsData = z.infer<typeof skillsSchema>;

export const programmingSchema = z.object({
  careerSwitch: skillLevel,
  beginnerToMid: skillLevel,
  midToSenior: skillLevel,
  seniorPlus: skillLevel,
  icToManager: skillLevel,
  specialisationSwitch: skillLevel,

  c: skillLevel,
  cSharp: skillLevel,
  go: skillLevel,
  java: skillLevel,
  javascript: skillLevel,
  kotlin: skillLevel,
  python: skillLevel,
  rust: skillLevel,
  scala: skillLevel,
  sql: skillLevel,
  swift: skillLevel,
  typescript: skillLevel,
});
export type ProgrammingData = z.infer<typeof programmingSchema>;

export const reviewSchema = z.object({
  linkedin: z.string().url({ message: "Invalid LinkedIn URL" }),
  github: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
  instagram: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
  medium: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
  website: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
  otherSocial: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
  identity: z.string().min(1, "Please select an option"),
  pronouns: z.string().min(1, "Pronouns are required"),
  socialHighlight: z.string().min(1, "Please select Yes or No"),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the code of conduct and terms",
  }),
});
export type ReviewData = z.infer<typeof reviewSchema>;

export const mentorRegistrationSchema = z.object({
  ...basicInfoObj.shape,
  ...profileSchema.shape,
  ...skillsSchema.shape,
  ...programmingSchema.shape,
  ...reviewSchema.shape,
}).superRefine(validateBasicInfo);

export type MentorRegistrationData = z.infer<typeof mentorRegistrationSchema>;
