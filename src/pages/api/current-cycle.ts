import { NextApiRequest, NextApiResponse } from 'next';

import { handleApiError, proxyRequest } from 'lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const data = await proxyRequest(
      'mentorship/cycles/current',
      {
        method: 'GET',
      },
      true,
    );

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(200).json(data);
  } catch (error: unknown) {
    return handleApiError(error, res);
  }
}
