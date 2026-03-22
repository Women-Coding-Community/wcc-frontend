import { mentorRegistrationSchema } from '../mentorSchema';

describe('mentorRegistrationSchema validation', () => {
  const validBaseData = {
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    slackDisplayName: 'janedoe',
    country: 'United Kingdom',
    city: 'London',
    position: 'Software Engineer',
    companyName: 'Tech Co',
    isLongTermMentor: true,
    maxMentees: '2',
    calendlyLink: 'https://calendly.com/janedoe',
    menteeExpectations: 'Eager to learn and proactive.',
    openToNonWomen: 'true',
    languages: ['English'],
    yearsExperience: '5',
    bio: 'A passionate developer with 5 years of experience.',
    technicalAreas: [{ technicalArea: 'FRONTEND', proficiencyLevel: 'ADVANCED' }],
    codeLanguages: [{ language: 'TYPESCRIPT', proficiencyLevel: 'ADVANCED' }],
    mentorshipFocusAreas: ['GROW_MID_TO_SENIOR'],
    linkedin: 'https://linkedin.com/in/janedoe',
    identity: 'Woman',
    pronouns: 'she/her',
    socialHighlight: 'Yes',
    termsAgreed: true,
  };

  it('validates correctly when adHocAvailability has some empty values', () => {
    const data = {
      ...validBaseData,
      isAdHocMentor: true,
      adHocAvailability: {
        January: '2',
        February: '',
        March: '',
      },
    };

    const result = mentorRegistrationSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
  it('reproducibility: passes if months are missing or empty in some way that previously triggered Invalid value', () => {
    const data = {
      ...validBaseData,
      isAdHocMentor: true,
      adHocAvailability: {
        January: '1',
        February: '',
        March: null,
        April: undefined,
      },
    };
    const result = mentorRegistrationSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it('fails when isAdHocMentor is true but no months are selected', () => {
    const data = {
      ...validBaseData,
      isAdHocMentor: true,
      adHocAvailability: {
        January: '',
        February: '',
      },
    };

    const result = mentorRegistrationSchema.safeParse(data);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Please select availability for at least one month');
    }
  });

  it('fails when isAdHocMentor is true but adHocAvailability is empty record', () => {
    const data = {
      ...validBaseData,
      isAdHocMentor: true,
      adHocAvailability: {},
    };

    const result = mentorRegistrationSchema.safeParse(data);
    expect(result.success).toBe(false);
  });
});
