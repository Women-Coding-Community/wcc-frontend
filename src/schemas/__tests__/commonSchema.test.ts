import {
  technicalAreaSchema,
  technicalLanguageSchema,
  technicalAreaProficiencySchema,
  languageProficiencySchema,
  mentorshipFocusAreaSchema,
  countrySchema,
  networkSchema,
} from '../commonSchema';

describe('commonSchema', () => {
  describe('technicalAreaSchema', () => {
    it('should validate original technical areas', () => {
      expect(technicalAreaSchema.safeParse('BACKEND').success).toBe(true);
      expect(technicalAreaSchema.safeParse('FRONTEND').success).toBe(true);
    });

    it('should validate new technical areas', () => {
      expect(technicalAreaSchema.safeParse('SECURITY').success).toBe(true);
      expect(technicalAreaSchema.safeParse('SRE').success).toBe(true);
      expect(technicalAreaSchema.safeParse('NETWORK_ENGINEERING').success).toBe(
        true,
      );
    });

    it('should reject invalid technical areas', () => {
      expect(technicalAreaSchema.safeParse('INVALID_AREA').success).toBe(false);
    });
  });

  describe('technicalLanguageSchema', () => {
    it('should validate original technical languages', () => {
      expect(technicalLanguageSchema.safeParse('JAVASCRIPT').success).toBe(
        true,
      );
      expect(technicalLanguageSchema.safeParse('PYTHON').success).toBe(true);
    });

    it('should validate new technical languages', () => {
      const newLanguages = [
        'SCALA',
        'SWIFT',
        'DART',
        'REGO',
        'BASH',
        'YAML',
        'HCL',
        'TERRAFORM',
        'OPENTOFU',
      ];
      newLanguages.forEach((lang) => {
        expect(technicalLanguageSchema.safeParse(lang).success).toBe(true);
      });
    });

    it('should reject invalid technical languages', () => {
      expect(technicalLanguageSchema.safeParse('ENGLISH').success).toBe(false);
    });
  });

  describe('proficiency schemas', () => {
    it('should validate technicalAreaProficiencySchema', () => {
      const valid = {
        technicalArea: 'SECURITY',
        proficiencyLevel: 'ADVANCED',
      };
      expect(technicalAreaProficiencySchema.safeParse(valid).success).toBe(
        true,
      );
    });

    it('should validate languageProficiencySchema', () => {
      const valid = {
        language: 'TERRAFORM',
        proficiencyLevel: 'EXPERT',
      };
      expect(languageProficiencySchema.safeParse(valid).success).toBe(true);
    });
  });

  describe('mentorshipFocusAreaSchema', () => {
    it('should validate mentorship focus areas', () => {
      expect(
        mentorshipFocusAreaSchema.safeParse('SWITCH_CAREER_TO_IT').success,
      ).toBe(true);
    });
  });

  describe('countrySchema', () => {
    it('should validate a correct country object', () => {
      const valid = { countryCode: 'BR', countryName: 'Brazil' };
      expect(countrySchema.safeParse(valid).success).toBe(true);
    });

    it('should reject empty country values', () => {
      const invalid = { countryCode: '', countryName: '' };
      expect(countrySchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe('networkSchema', () => {
    it('should validate a correct network object', () => {
      const valid = { type: 'LINKEDIN', link: 'https://linkedin.com/in/user' };
      expect(networkSchema.safeParse(valid).success).toBe(true);
    });

    it('should reject invalid URLs', () => {
      const invalid = { type: 'GITHUB', link: 'not-a-url' };
      expect(networkSchema.safeParse(invalid).success).toBe(false);
    });
  });
});
