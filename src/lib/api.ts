import axios from 'axios';

import aboutUsPage from './responses/aboutUs.json';
import aboutUsTeam from './responses/aboutUsTeam.json';
import footerData from './responses/footer.json';
import landingPageData from './responses/landingPage.json';
import mentorShipLongTermTimeline from './responses/longTermTimeLine.json';
import mentors from './responses/mentors.json';
import mentorShipPage from './responses/mentorship.json';
import mentorShipCodeofConduct from './responses/mentorshipCodeOfConduct.json';
import mentorshipFaqPageData from './responses/mentorshipFaqPage.json';
import mentorshipStudyGroupsPage from './responses/mentorshipStudyGroupsPage.json';
import ourProgrammesPage from './responses/programmes.json';

// for new pages: import the json file
// (which you copied from https://github.com/Women-Coding-Community/wcc-backend/tree/main/src/main/resources)
// and add it to pageData with the path in the pages path (e.g. mentorship/index.ts = mentorship/overview)

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
  'programmes/study-groups': ourProgrammesPage,
  'about-us/celebrate-her': aboutUsPage,
  'mentorship/mentors': mentors,
  'mentorship/code-of-conduct': mentorShipCodeofConduct,
  team: aboutUsTeam,
  'mentorship/faq': mentorshipFaqPageData,
  'mentorship/study-groups': mentorshipStudyGroupsPage,
};

export const fetchData = async (path: string) => {
  try {
    console.log(
      `Attempting to fetchData for ${apiBaseUrl}/${path} with ${API_KEY}`,
    );
    const response = await client.get(`${apiBaseUrl}/${path}`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    const footerData = await fetchFooter();

    // if (response.status !== 200) {
    //   throw new Error('Failed to fetch data');
    // }
    return {
      data: response.data,
      footer: footerData,
    };
  } catch (error) {
    // This temporarily allows responses if the database is down, should be removed once it's more stable
    // Also, since we use forks, the API_KEY will often be blank as the wcc-frontend secret is not shared
    // with forks. See "secrets are not passed to the runner when a workflow is triggered from a forked repository."
    // in https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets#using-secrets-in-a-workflow.
    // the pageData[path] takes the response you mapped the key of pageData to the import in this file
    // eslint-disable-next-line no-console
    console.error(
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
    console.log(`Attempting to fetchFooter`);
    const response = await client.get(`${apiBaseUrl}/footer`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    // if (response.status !== 200) {
    //   throw new Error('Failed to fetch footer data');
    // }
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Failed to fetchFooter, generating fallback footer. Error: ${error}`,
    );
    return footerData;
  }
};
