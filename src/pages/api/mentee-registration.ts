import { NextApiRequest, NextApiResponse } from 'next';

import { proxyRequest } from '../../lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const data = await proxyRequest('mentees', {
      method: 'POST',
      data: req.body,
    }, true);

    return res.status(201).json(data ?? {});
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    if (error.message === 'Server configuration error') {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
}
