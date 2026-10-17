import { NextApiRequest, NextApiResponse } from 'next';

import * as api from 'lib/api';
import handler from 'pages/api/current-cycle';

jest.mock('../../lib/api', () => ({
  __esModule: true,
  ...jest.requireActual('../../lib/api'),
  proxyRequest: jest.fn(),
}));

const makeReq = (): NextApiRequest => ({ method: 'GET' }) as NextApiRequest;

const makeRes = (): NextApiResponse => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
    setHeader: jest.fn(),
  } as unknown as NextApiResponse;
  (res.status as jest.Mock).mockReturnValue(res);
  return res;
};

describe('current-cycle API handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('proxies GET to the current cycle endpoint and returns 200 on success', async () => {
    const cycle = { registrationOpen: true, mentorshipType: 'Ad-Hoc' };
    (api.proxyRequest as jest.Mock).mockResolvedValue(cycle);

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(api.proxyRequest).toHaveBeenCalledWith(
      'mentorship/cycles/current',
      {
        method: 'GET',
      },
      true,
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(cycle);
  });
});
