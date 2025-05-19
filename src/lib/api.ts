import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

import footerData from './responses/footer.json';
import landingPageData from './responses/landingPage.json';
import mentors from './responses/mentors.json';
import mentorShipPage from './responses/mentorship.json';
// for new pages: import the json file
// (which you copied from https://github.com/Women-Coding-Community/wcc-backend/tree/main/src/main/resources)
// and add it to pageData with the path in the pages path (e.g. mentorship/index.ts = mentorship/overview)

const pageData = {
  landingPage: landingPageData,
  'mentorship/overview': mentorShipPage,
  'mentorship/mentors': mentors,
};

export const fetchData = async (path: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${path}`, {
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
    // the pageData[path] takes the response you mapped the key of pageData to the import in this file
    return {
      //@ts-ignore
      data: pageData[path],
      footer: footerData,
    };
  }
};

export const fetchFooter = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/footer`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    // if (response.status !== 200) {
    //   throw new Error('Failed to fetch footer data');
    // }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data, generating fallback footer');
    return footerData;
  }
};
