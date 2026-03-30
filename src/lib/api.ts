import axios, { AxiosRequestConfig } from 'axios';
import { logger } from 'bs-logger';
import { NextApiResponse } from 'next';

import aboutUsPage from './responses/aboutUs.json';
import aboutUsTeam from './responses/aboutUsTeam.json';
import footerData from './responses/footer.json';
import landingPageData from './responses/landingPage.json';
import mentorShipLongTermTimeline from './responses/longTermTimeLine.json';
import mentors from './responses/mentors.json';
import mentorShipPage from './responses/mentorship.json';
import mentorShipCodeOfConduct from './responses/mentorshipCodeOfConduct.json';
import mentorshipFaqPageData from './responses/mentorshipFaqPage.json';
import studyGroupsPage from './responses/mentorshipStudyGroupsPage.json';

const apiBaseUrl = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

const client = axios.create({
  baseURL: apiBaseUrl,
  headers: { 'X-API-KEY': API_KEY },
  timeout: 5000,
});

/**
 * Shared request handler for API routes to avoid duplication.
 */
export const proxyRequest = async (
  path: string,
  options: AxiosRequestConfig = {},
  usePlatformApi = false,
) => {
  if (!apiBaseUrl || !API_KEY) {
    logger.error(
      'Server configuration error: API_BASE_URL or API_KEY is missing',
    );
    throw new Error('Server configuration error');
  }

  let url = `${apiBaseUrl}/${path}`;

  if (usePlatformApi) {
    // Derive platform API host from CMS API URL (e.g., http://host/api/cms/v1 -> http://host/api/platform/v1)
    const host = apiBaseUrl.split('/api/')[0];
    url = `${host}/api/platform/v1/${path}`;
  }

  try {
    const response = await client({
      url,
      ...options,
    });
    return response.data;
  } catch (error: any) {
    logger.error(`API request failed for ${url}: ${error.message}`);
    throw error;
  }
};

const pageData = {
  landingPage: landingPageData,
  'mentorship/overview': mentorShipPage,
  'mentorship/long-term-timeline': mentorShipLongTermTimeline,
  'programmes/study-groups': studyGroupsPage,
  'about-us/celebrate-her': aboutUsPage,
  'mentorship/mentors': mentors,
  'mentorship/code-of-conduct': mentorShipCodeOfConduct,
  team: aboutUsTeam,
  'mentorship/faq': mentorshipFaqPageData,
  'mentorship/study-groups': studyGroupsPage,
};

export const fetchData = async (path: string) => {
  try {
    const data = await proxyRequest(path);
    const footer = await fetchFooter();
    return { data, footer };
  } catch (error) {
    const footer = await fetchFooter();
    return {
      //@ts-ignore
      data: pageData[path],
      footer,
    };
  }
};

export const handleApiError = (error: unknown, res: NextApiResponse) => {
  const err = error as {
    response?: { status: number; data: unknown };
    message?: string;
  };
  if (err.response) {
    return res.status(err.response.status).json(err.response.data);
  }
  if (err.message === 'Server configuration error') {
    return res.status(500).json({ error: err.message });
  }
  return res.status(500).json({ error: 'Internal server error' });
};

export const fetchFooter = async () => {
  try {
    return await proxyRequest('footer');
  } catch (error) {
    return footerData;
  }
};
