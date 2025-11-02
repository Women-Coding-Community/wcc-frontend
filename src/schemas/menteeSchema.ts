import { z } from 'zod';

export const menteeFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  country: z.string().min(1, 'Please select your country'),
  city: z.string().min(1, 'Please select your city'),
  languages: z.array(z.string()).min(1, 'Please select at least one language'),
  otherLanguage: z.string().optional(),
  textAreaField: z.string().min(10, 'Please provide more details').optional(),
  textField1: z.string().min(1, 'This field is required'),
  textField2: z.string().min(1, 'This field is required'),
  radioOption: z.enum(['option-one', 'option-two', 'option-three']),
  textField3: z.string().min(1, 'This field is required'),
});

export type MenteeFormData = z.infer<typeof menteeFormSchema>;

export const menteeFormDefaultValues: Partial<MenteeFormData> = {
  name: '',
  email: '',
  country: '',
  city: '',
  languages: [],
  otherLanguage: '',
  textAreaField: '',
  textField1: '',
  textField2: '',
  radioOption: undefined,
  textField3: '',
};
