import { z } from 'zod';

export const basicInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  slackName: z.string().min(1, 'Slack name is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  jobTitle: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company is required'),

  mentorType: z.string().min(1, 'Please select a mentorship type'),
  maxMentees: z.string().optional(),
  calendlyLink: z.string().url("Please enter a valid Calendly URL"),
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
  customPhotoUrl: z.string().url("Invalid URL").optional().or(z.literal('')),
});

export type ProfileData = z.infer<typeof profileSchema>;