import {
  adhocMenteeFormDefaultValues,
  menteeFormSchema,
} from '../../schemas/menteeSchema';

const validLongTermBase = {
  fullName: 'Jane Doe',
  position: 'Developer',
  email: 'jane@example.com',
  slackDisplayName: '@jane',
  companyName: 'Acme Corp',
  country: { countryCode: 'GB', countryName: 'United Kingdom' },
  city: 'London',
  linkedInProfile: 'https://www.linkedin.com/in/janedoe',
  pronouns: '',
  availableHsMonth: 4,
  skills: {
    yearsExperience: 2,
    areas: [{ technicalArea: 'FRONTEND', proficiencyLevel: 'INTERMEDIATE' }],
    languages: [{ language: 'TYPESCRIPT', proficiencyLevel: 'INTERMEDIATE' }],
    mentorshipFocus: ['GROW_BEGINNER_TO_MID'],
  },
  spokenLanguages: ['English'],
  bio: 'A'.repeat(50),
  mentorshipType: 'LONG_TERM' as const,
  applications: [{ mentorId: 1, priorityOrder: 1, whyMentor: 'A'.repeat(50) }],
};

const validAdhocBase = {
  ...validLongTermBase,
  mentorshipType: 'AD_HOC' as const,
  availableHsMonth: 1,
};

describe('menteeFormSchema — long-term', () => {
  it('accepts valid long-term data', () => {
    const result = menteeFormSchema.safeParse(validLongTermBase);
    expect(result.success).toBe(true);
  });

  it('rejects long-term data with no mentorshipFocus', () => {
    const data = {
      ...validLongTermBase,
      skills: { ...validLongTermBase.skills, mentorshipFocus: [] },
    };
    const result = menteeFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'));
      expect(paths).toContain('skills.mentorshipFocus');
    }
  });
});

describe('menteeFormSchema — adhoc', () => {
  it('accepts valid adhoc data', () => {
    const result = menteeFormSchema.safeParse(validAdhocBase);
    expect(result.success).toBe(true);
  });

  it('requires mentorshipFocus for adhoc', () => {
    const data = {
      ...validAdhocBase,
      skills: { ...validAdhocBase.skills, mentorshipFocus: [] },
    };
    const result = menteeFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'));
      expect(paths).toContain('skills.mentorshipFocus');
    }
  });

  it('accepts adhoc data with mentorshipFocus selected', () => {
    const result = menteeFormSchema.safeParse(validAdhocBase);
    expect(result.success).toBe(true);
  });
});

describe('menteeFormSchema — availableHsMonth', () => {
  it('rejects long-term data with availableHsMonth less than 2', () => {
    const data = { ...validLongTermBase, availableHsMonth: 1 };
    const result = menteeFormSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'));
      expect(paths).toContain('availableHsMonth');
    }
  });

  it('accepts long-term data with availableHsMonth of 2', () => {
    const data = { ...validLongTermBase, availableHsMonth: 2 };
    const result = menteeFormSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('accepts adhoc data with availableHsMonth of 1', () => {
    const result = menteeFormSchema.safeParse(validAdhocBase);
    expect(result.success).toBe(true);
  });
});

describe('adhocMenteeFormDefaultValues', () => {
  it('sets mentorshipType to AD_HOC', () => {
    expect(adhocMenteeFormDefaultValues.mentorshipType).toBe('AD_HOC');
  });

  it('sets availableHsMonth to 1', () => {
    expect(adhocMenteeFormDefaultValues.availableHsMonth).toBe(1);
  });
});
