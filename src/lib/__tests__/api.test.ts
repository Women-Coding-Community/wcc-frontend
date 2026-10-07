import type * as ApiModule from '../api';
import adHocTimeLine from '../responses/adHocTimeLine.json';

jest.mock('axios', () => {
  const mockAxios = jest.fn();
  (mockAxios as any).create = jest.fn(() => mockAxios);
  (mockAxios as any).get = jest.fn();
  (mockAxios as any).post = jest.fn();
  return {
    __esModule: true,
    default: mockAxios,
  };
});

describe('API Fetch Functions', () => {
  let fetchFooter: (typeof ApiModule)['fetchFooter'];
  let fetchData: (typeof ApiModule)['fetchData'];
  let mockedAxios: jest.Mock;
  const originalEnv = process.env;

  beforeEach(async () => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      API_BASE_URL: 'http://localhost:8080/api/cms/v1',
      API_KEY: 'test-key',
    };
    // Re-import after setting env so module-level constants pick them up
    const api = await import('../api');
    fetchFooter = api.fetchFooter;
    fetchData = api.fetchData;
    mockedAxios = (await import('axios')).default as unknown as jest.Mock;
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  describe('fetchFooter', () => {
    it('should return footer data when API call is successful', async () => {
      const mockFooterData = { footer: 'Footer content' };
      mockedAxios.mockResolvedValue({
        status: 200,
        data: mockFooterData,
      });

      const result = await fetchFooter();
      expect(result).toEqual(mockFooterData);
      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('/footer'),
        }),
      );
    });

    it('should return fallback data when API call fails', async () => {
      mockedAxios.mockRejectedValue(new Error('API Error'));

      const result = await fetchFooter();
      expect(result).toEqual(expect.objectContaining({ title: 'Follow Us' }));
    });
  });

  describe('fetchData', () => {
    it.each(['test-path', 'mentorship/ad-hoc-timeline'])(
      'should return data and footer when API calls are successful for %s',
      async (path) => {
        const mockData = { key: 'value' };
        const mockFooterData = { footer: 'Footer content' };

        mockedAxios
          .mockResolvedValueOnce({ status: 200, data: mockData })
          .mockResolvedValueOnce({ status: 200, data: mockFooterData });

        const result = await fetchData(path);

        expect(result).toEqual({ data: mockData, footer: mockFooterData });
        expect(mockedAxios).toHaveBeenCalledWith(
          expect.objectContaining({
            url: expect.stringContaining(`/${path}`),
          }),
        );
      },
    );

    it.each([
      ['landingPage', 'page:LANDING_PAGE'],
      ['mentorship/long-term-timeline', 'page:MENTORSHIP_LONG_TIMELINE'],
    ])(
      'should return fallback data when %s API call fails',
      async (path, id) => {
        mockedAxios.mockRejectedValue(new Error('API Error'));

        const result = await fetchData(path);
        expect(result.data).toEqual(expect.objectContaining({ id }));
      },
    );

    it('should return ad-hoc timeline events when the API is unreachable', async () => {
      mockedAxios.mockRejectedValue(new Error('Network Error'));

      const result = await fetchData('mentorship/ad-hoc-timeline');

      expect(result.data).toEqual(adHocTimeLine);
      expect(result.data.events.items.length).toBeGreaterThan(0);
      expect(result.footer).toEqual(
        expect.objectContaining({ title: 'Follow Us' }),
      );
    });
  });
});
