import { NextApiRequest, NextApiResponse } from 'next';

import { handleApiError, proxyRequest } from '../../lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const data = await proxyRequest(
      'mentees',
      {
        method: 'POST',
        data: req.body,
      },
      true,
    );

    return res.status(201).json(data ?? {});
  } catch (error: unknown) {
    return handleApiError(error, res);
  }
}
