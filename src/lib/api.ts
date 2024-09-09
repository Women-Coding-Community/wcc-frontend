import axios from 'axios';

const apiBaseUrl = process.env.API_BASE_URL;

if (!apiBaseUrl) {
  throw new Error('Base URL is missing, check your env file');
}

export const fetchData = async (path: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${path}`);
    const footerData = await fetchFooter();
    const mentorshipProgrammeData = await fetchMentorship();

    if (response.status !== 200) {
      throw new Error('Failed to fetch data');
    }
    return {
      data: response.data,
      footer: footerData,
      mentorship: mentorshipProgrammeData,
    };
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchFooter = async () => {
  try {
    const response = await axios.get(
      'https://wcc-backend.fly.dev/api/cms/v1/footer',
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch footer data');
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch footer');
  }
};
const fetchMentorship = async () => {
  try {
    const response = await axios.get(
      'https://wcc-backend.fly.dev/api/cms/v1/mentorship/overview',
    );

    if (response.status !== 200) {
      throw new Error('Failed to fetch mentorship data');
    }
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch mentorship');
  }
};
