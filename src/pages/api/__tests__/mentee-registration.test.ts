import { NextApiRequest, NextApiResponse } from 'next';

import handler from '../mentee-registration';

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
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      API_BASE_URL: 'http://localhost:8080/api/cms/v1',
      API_KEY: 'test-key',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
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

  it('returns 500 when API_BASE_URL is missing', async () => {
    delete process.env.API_BASE_URL;
    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Server configuration error',
    });
  });

  it('returns 500 when API_KEY is missing', async () => {
    delete process.env.API_KEY;
    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Server configuration error',
    });
  });

  it('proxies POST to the platform endpoint and returns 201 on success', async () => {
    const responseBody = { id: 42 };
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: jest.fn().mockResolvedValue(responseBody),
    });

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/api/platform/v1/mentees',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'X-API-KEY': 'test-key',
          'Content-Type': 'application/json',
        }),
      }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(responseBody);
  });

  it('forwards backend error status and message on failure', async () => {
    const errorBody = { message: 'Email already registered' };
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: jest.fn().mockResolvedValue(errorBody),
    });

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(errorBody);
  });

  it('falls back to generic error when backend returns no body', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn().mockRejectedValue(new Error('no body')),
    });

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Registration failed. Please try again.',
    });
  });

  it('returns 500 on network error', async () => {
    globalThis.fetch = jest
      .fn()
      .mockRejectedValue(new Error('Network failure'));

    const req = makeReq();
    const res = makeRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
});
