import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

export const fetchData = async (path: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${path}`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    const footerData = await fetchFooter();

    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return {
      data: response.data,
      footer: footerData,
    };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchFooter = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/footer`, {
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch footer data');
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch footer');
  }
};
