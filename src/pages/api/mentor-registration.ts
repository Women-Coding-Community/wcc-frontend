import { logger } from 'bs-logger';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const apiBaseUrl = process.env.API_BASE_URL;
  const apiKey = process.env.API_KEY;

  if (!apiBaseUrl || !apiKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const host = apiBaseUrl.split('/api/')[0];
  const url = `${host}/api/platform/v1/mentors`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return res
        .status(response.status)
        .json(data ?? { error: 'Registration failed. Please try again.' });
    }

    return res.status(response.status).json(data ?? {});
  } catch (error) {
    logger.error('Mentor registration API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
