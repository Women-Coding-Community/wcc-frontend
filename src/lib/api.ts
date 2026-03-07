import axios from 'axios';
import { logger } from 'bs-logger';

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
    logger.info(
      `Attempting to fetchData for ${apiBaseUrl}/${path} with ${API_KEY}`,
    );
    const response = await client.get(`${apiBaseUrl}/${path}`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    const footerData = await fetchFooter();
    return {
      data: response.data,
      footer: footerData,
    };
  } catch (error) {
    logger.error(
      `Failed to fetchData for ${path} with ${API_KEY}. Error: ${error}`,
    );
    const footerData = await fetchFooter();

    return {
      //@ts-ignore
      data: pageData[path],
      footer: footerData,
    };
  }
};

export const fetchFooter = async () => {
  try {
    logger.debug(`Attempting to fetchFooter`);
    const response = await client.get(`${apiBaseUrl}/footer`, {
      headers: { 'X-API-KEY': API_KEY },
    });

    return response.data;
  } catch (error) {
    logger.error(
      `Failed to fetchFooter, generating fallback footer. Error: ${error}`,
    );
    return footerData;
  }
};
