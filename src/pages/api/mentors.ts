import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  try {
    const { keyword, mentorshipTypes, areas, language, focus } = req.query;
    const baseUrl = process.env.API_BASE_URL;
    const apiKey = process.env.API_KEY;

    if (!baseUrl || !apiKey) {
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Build query string from all available params
    const params = new URLSearchParams();
    if (keyword)
      params.append('keyword', Array.isArray(keyword) ? keyword[0] : keyword);
    if (mentorshipTypes)
      params.append(
        'mentorshipType',
        Array.isArray(mentorshipTypes) ? mentorshipTypes[0] : mentorshipTypes,
      );
    if (areas) params.append('areas', Array.isArray(areas) ? areas[0] : areas);
    if (language)
      params.append(
        'language',
        Array.isArray(language) ? language[0] : language,
      );
    if (focus) params.append('focus', Array.isArray(focus) ? focus[0] : focus);

    let url = `${baseUrl}/mentorship/mentors`;
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Mentors API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
