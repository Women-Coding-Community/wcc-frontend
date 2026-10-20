import { NextApiRequest, NextApiResponse } from 'next';

import * as api from '../../lib/api';
import handler from '../../pages/api/mentors';

jest.mock('../../lib/api', () => ({
  __esModule: true,
  ...jest.requireActual('../../lib/api'),
  proxyRequest: jest.fn(),
}));

const makeReq = (overrides: Partial<NextApiRequest> = {}): NextApiRequest =>
  ({ method: 'GET', query: {}, ...overrides }) as NextApiRequest;

const makeRes = (): NextApiResponse => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
    setHeader: jest.fn(),
  } as unknown as NextApiResponse;
  (res.status as jest.Mock).mockReturnValue(res);
  return res;
};

const getParams = (): URLSearchParams =>
  jest.mocked(api.proxyRequest).mock.calls[0][1]?.params;

describe('mentors API handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it.each([
    { language: 'JAVA', expectedQuery: 'languages=JAVA' },
    {
      language: ['JAVA', 'PYTHON'],
      expectedQuery: 'languages=JAVA&languages=PYTHON',
    },
    {
      language: 'JAVA,PYTHON',
      expectedQuery: 'languages=JAVA%2CPYTHON',
    },
  ])(
    'forwards $language using the backend languages key',
    async ({ language, expectedQuery }) => {
      await handler(makeReq({ query: { language } }), makeRes());

      expect(api.proxyRequest).toHaveBeenCalledTimes(1);
      expect(api.proxyRequest).toHaveBeenCalledWith('mentorship/mentors', {
        method: 'GET',
        params: expect.any(URLSearchParams),
      });
      expect(getParams().toString()).toBe(expectedQuery);
      expect(getParams().has('language')).toBe(false);
    },
  );

  it.each([
    {
      keyword: 'Ada & Grace',
      mentorshipTypes: 'AD_HOC,LONG_TERM',
      yearsExperience: '5',
      areas: 'BACKEND',
      focus: 'CAREER_ADVICE',
    },
    {
      keyword: ['Ada & Grace', 'ignored'],
      mentorshipTypes: ['AD_HOC,LONG_TERM', 'ignored'],
      yearsExperience: ['5', '10'],
      areas: ['BACKEND', 'ignored'],
      focus: ['CAREER_ADVICE', 'ignored'],
    },
  ])(
    'preserves other filters and forwards mentorshipTypes once: %j',
    async (query) => {
      await handler(makeReq({ query }), makeRes());

      expect(Array.from(getParams().entries())).toEqual([
        ['keyword', 'Ada & Grace'],
        ['mentorshipTypes', 'AD_HOC,LONG_TERM'],
        ['yearsExperience', '5'],
        ['areas', 'BACKEND'],
        ['focus', 'CAREER_ADVICE'],
      ]);
      expect(getParams().has('languages')).toBe(false);
    },
  );

  it('returns unfiltered backend data with caching disabled', async () => {
    const data = { mentors: [], filterSection: {} };
    jest.mocked(api.proxyRequest).mockResolvedValue(data);
    const res = makeRes();

    await handler(makeReq(), res);

    expect(getParams().toString()).toBe('');
    expect(res.setHeader).toHaveBeenCalledWith(
      'Cache-Control',
      'no-cache, no-store, must-revalidate',
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  it('rejects non-GET requests without contacting the backend', async () => {
    const res = makeRes();

    await handler(makeReq({ method: 'POST' }), res);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['GET']);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Method POST Not Allowed',
    });
    expect(api.proxyRequest).not.toHaveBeenCalled();
  });

  it('forwards backend errors', async () => {
    const data = { message: 'Invalid language' };
    jest.mocked(api.proxyRequest).mockRejectedValue({
      response: { status: 400, data },
    });
    const res = makeRes();

    await handler(makeReq({ query: { language: 'invalid' } }), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(data);
  });
});
