import { NextApiRequest, NextApiResponse } from 'next';

import handler from '../../pages/api/mentee-registration';
import * as api from '../../lib/api';

jest.mock('../../lib/api', () => ({
  __esModule: true,
  ...jest.requireActual('../../lib/api'),
  proxyRequest: jest.fn(),
}));

const makeReq = (overrides: Partial<NextApiRequest> = {}): NextApiRequest =>
  ({
    method: 'POST',
    body: { mentee: { fullName: 'Jane Doe' }, applications: [] },
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

describe('mentee-registration API handler', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns 405 for non-POST methods', async () => {
    const req = makeReq({ method: 'GET' });
    const res = makeRes();

    await handler(req, res);

    expect(res.setHeader).toHaveBeenCalledWith('Allow', ['POST']);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: 'Method GET Not Allowed' });
  });

  it('proxies POST to the platform endpoint and returns 201 on success', async () => {
    const responseBody = { id: 42 };
    (api.proxyRequest as jest.Mock).mockResolvedValue(responseBody);

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(api.proxyRequest).toHaveBeenCalledWith(
      'mentees',
      expect.objectContaining({
        method: 'POST',
        data: req.body,
      }),
      true
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(responseBody);
  });

  it('forwards backend error status and message on failure', async () => {
    const errorResponse = {
      response: {
        status: 409,
        data: { message: 'Email already registered' },
      },
    };
    (api.proxyRequest as jest.Mock).mockRejectedValue(errorResponse);

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(errorResponse.response.data);
  });

  it('returns 500 on unexpected error', async () => {
    (api.proxyRequest as jest.Mock).mockRejectedValue(new Error('Network failure'));

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('returns 500 when server configuration error occurs', async () => {
    (api.proxyRequest as jest.Mock).mockRejectedValue(new Error('Server configuration error'));

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Server configuration error' });
  });
});
