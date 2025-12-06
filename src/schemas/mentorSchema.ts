import { z } from 'zod';

export const basicInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  email: z.string().email("Invalid email address"),

  slackName: z.string().min(1, "Slack name is required"),

  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),

  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
});

export type BasicInfoData = z.infer<typeof basicInfoSchema>;