import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

import footerData from './responses/footer.json';
import landingPageData from './responses/landingPage.json';

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
    return {
      data: landingPageData,
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
