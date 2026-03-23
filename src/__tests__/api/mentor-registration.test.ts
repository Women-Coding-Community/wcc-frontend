import { NextApiRequest, NextApiResponse } from 'next';

import * as api from '../../lib/api';
import handler from '../../pages/api/mentor-registration';

jest.mock('../../lib/api', () => ({
  __esModule: true,
  ...jest.requireActual('../../lib/api'),
  proxyRequest: jest.fn(),
}));

const makeReq = (overrides: Partial<NextApiRequest> = {}): NextApiRequest =>
  ({
    method: 'POST',
    body: {
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
      openToNonWomen: true,
      languages: ['English'],
      yearsExperience: '5',
      bio: 'A passionate developer with 5 years of experience.',
      technicalAreas: [
        { technicalArea: 'Fullstack', proficiencyLevel: 'Advanced' },
      ],
      codeLanguages: [{ language: 'C++', proficiencyLevel: 'Advanced' }],
      mentorshipFocusAreas: ['Career advice'],
      linkedin: 'https://linkedin.com/in/janedoe',
      identity: 'Yes',
      pronouns: 'she/her',
      socialHighlight: 'Yes',
      termsAgreed: true,
    },
    ...overrides,
  }) as NextApiRequest;

const makeRes = (): NextApiResponse => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
    setHeader: jest.fn(),
  } as unknown as NextApiResponse;
  (res.status as jest.Mock).mockReturnValue(res);
  return res;
};

describe('mentor-registration API handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns 405 for non-POST methods', async () => {
    const req = makeReq({ method: 'GET' });
    const res = makeRes();

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['POST']);
    expect(res.status).toHaveBeenCalledWith(405);
  });

  it('proxies POST to the platform endpoint and correctly maps data', async () => {
    const responseBody = { id: 123 };
    (api.proxyRequest as jest.Mock).mockResolvedValue(responseBody);

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(api.proxyRequest).toHaveBeenCalledWith(
      'mentors',
      expect.objectContaining({
        method: 'POST',
        data: expect.objectContaining({
          fullName: 'Jane Doe',
          pronounCategory: 'FEMININE',
          country: {
            countryCode: 'GB',
            countryName: 'United Kingdom',
          },
          skills: expect.objectContaining({
            yearsExperience: 5,
            areas: [
              { technicalArea: 'FULLSTACK', proficiencyLevel: 'ADVANCED' },
            ],
            languages: [
              { language: 'C_PLUS_PLUS', proficiencyLevel: 'ADVANCED' },
            ],
          }),
          menteeSection: expect.objectContaining({
            longTerm: expect.objectContaining({
              numMentee: 2,
            }),
          }),
          network: expect.arrayContaining([
            {
              type: 'LINKEDIN',
              link: 'https://linkedin.com/in/janedoe',
            },
          ]),
        }),
      }),
      true,
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(responseBody);
  });

  it('handles backend errors', async () => {
    const errorResponse = {
      response: {
        status: 400,
        data: { message: 'Invalid data' },
      },
    };
    (api.proxyRequest as jest.Mock).mockRejectedValue(errorResponse);

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(errorResponse.response.data);
  });

  it('correctly maps adHocAvailability and handles empty values', async () => {
    (api.proxyRequest as jest.Mock).mockResolvedValue({ id: 123 });

    const req = makeReq({
      body: {
        ...makeReq().body,
        isAdHocMentor: true,
        adHocAvailability: {
          January: '2',
          February: '',
          March: undefined,
          April: '3',
        },
      },
    });
    const res = makeRes();

    await handler(req, res);

    expect(api.proxyRequest).toHaveBeenCalledWith(
      'mentors',
      expect.objectContaining({
        data: expect.objectContaining({
          menteeSection: expect.objectContaining({
            adHoc: [
              { month: 1, hours: 2 },
              { month: 4, hours: 3 },
            ],
          }),
        }),
      }),
      true,
    );
  });
});
