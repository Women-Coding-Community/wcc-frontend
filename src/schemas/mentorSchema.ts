import { z } from 'zod';

export const basicInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email({ message: 'Invalid email address' }),
  slackName: z.string().min(1, 'Slack name is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),

  mentorType: z.string().min(1, 'Please select a mentorship type'),
  maxMentees: z.string().optional(),
  calendlyLink: z.string().url({ message: "Please enter a valid Calendly URL" }),
  menteeExpectations: z.string().min(1, "Please describe the mentee you are looking for"),
  openToNonWomen: z.string().min(1, "Please select an option"),
});

export type BasicInfoData = z.infer<typeof basicInfoSchema>;

export const profileSchema = z.object({
  languages: z.array(z.string()).min(1, "Select at least one language"),
  yearsOfExperience: z.string().min(1, "Please select your experience"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  mentoringTopics: z.string().optional(),
  photoSource: z.string().min(1, "Please select a photo source"),  
  customPhotoUrl: z.string().url({ message: "Invalid URL" }).optional().or(z.literal('')),
});

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
  otherSocial: z.string().optional(),
  identity: z.string().min(1, "Please select an option"),
  pronouns: z.string().min(1, "Pronouns are required"),
  socialHighlight: z.string().min(1, "Please select Yes or No"),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the code of conduct and terms",
  }),
});
export type ReviewData = z.infer<typeof reviewSchema>;

export const mentorRegistrationSchema = z.object({
  ...basicInfoSchema.shape,
  ...profileSchema.shape,
  ...skillsSchema.shape,
  ...programmingSchema.shape,
  ...reviewSchema.shape,
});

export type MentorRegistrationData = z.infer<typeof mentorRegistrationSchema>;