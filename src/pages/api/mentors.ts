import { NextApiRequest, NextApiResponse } from 'next';

import { proxyRequest } from '../../lib/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  try {
    const { keyword, yearsExperience, areas, language, focus } = req.query;

    const params = new URLSearchParams();
    if (keyword)
      params.append('keyword', Array.isArray(keyword) ? keyword[0] : keyword);
    if (yearsExperience)
      params.append(
        'yearsExperience',
        Array.isArray(yearsExperience) ? yearsExperience[0] : yearsExperience,
      );
    if (areas) params.append('areas', Array.isArray(areas) ? areas[0] : areas);
    if (language)
      params.append(
        'language',
        Array.isArray(language) ? language[0] : language,
      );
    if (focus) params.append('focus', Array.isArray(focus) ? focus[0] : focus);

    const data = await proxyRequest('mentorship/mentors', {
      method: 'GET',
      params,
    });

    return res.status(200).json(data);
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
