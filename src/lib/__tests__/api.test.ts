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
  let fetchPartners: (typeof ApiModule)['fetchPartners'];
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
    fetchPartners = api.fetchPartners;
    fetchData = api.fetchData;
    mockedAxios = (await import('axios')).default as unknown as jest.Mock;
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.clearAllMocks();
  });

  describe('fetchFooter', () => {
    it('should return footer data and partners when API calls are successful', async () => {
      const mockFooterData = { footer: 'Footer content' };
      const mockPartners = {
        title: 'Community Partners',
        items: [{ name: 'SurrealDB' }],
      };

      mockedAxios.mockImplementation(({ url }: { url: string }) => {
        if (url.endsWith('/footer')) {
          return Promise.resolve({ status: 200, data: mockFooterData });
        }
        if (url.endsWith('/partners')) {
          return Promise.resolve({
            status: 200,
            data: { partners: mockPartners },
          });
        }
        return Promise.reject(new Error(`Unexpected URL: ${url}`));
      });

      const result = await fetchFooter();

      expect(result).toEqual({ ...mockFooterData, partners: mockPartners });
      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('/footer'),
        }),
      );
      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('/partners'),
        }),
      );
    });

    it('should return fallback data when API call fails', async () => {
      mockedAxios.mockRejectedValue(new Error('API Error'));

      const result = await fetchFooter();
      expect(result).toEqual(
        expect.objectContaining({ title: 'Follow Us', partners: null }),
      );
    });
  });

  describe('fetchPartners', () => {
    it('should return the partners section when the API call is successful', async () => {
      const mockPartners = {
        title: 'Community Partners',
        items: [{ name: 'SurrealDB' }],
      };
      mockedAxios.mockResolvedValue({
        status: 200,
        data: { partners: mockPartners },
      });

      await expect(fetchPartners()).resolves.toEqual(mockPartners);
    });

    it('should return null when the API call fails', async () => {
      mockedAxios.mockRejectedValue(new Error('API Error'));

      await expect(fetchPartners()).resolves.toBeNull();
    });
  });

  describe('fetchData', () => {
    it.each(['test-path', 'mentorship/ad-hoc-timeline'])(
      'should return data and footer when API calls are successful for %s',
      async (path) => {
        const mockData = { key: 'value' };
        const mockFooterData = { footer: 'Footer content' };
        const mockPartners = {
          title: 'Community Partners',
          items: [{ name: 'SurrealDB' }],
        };

        mockedAxios.mockImplementation(({ url }: { url: string }) => {
          if (url.includes(`/${path}`)) {
            return Promise.resolve({ status: 200, data: mockData });
          }
          if (url.endsWith('/footer')) {
            return Promise.resolve({ status: 200, data: mockFooterData });
          }
          if (url.endsWith('/partners')) {
            return Promise.resolve({
              status: 200,
              data: { partners: mockPartners },
            });
          }
          return Promise.reject(new Error(`Unexpected URL: ${url}`));
        });

        const result = await fetchData(path);

        expect(result).toEqual({
          data: mockData,
          footer: { ...mockFooterData, partners: mockPartners },
        });
        expect(mockedAxios).toHaveBeenCalledWith(
          expect.objectContaining({
            url: expect.stringContaining(`/${path}`),
          }),
        );
      },
    );

    it('should keep page data when only the footer and partners API calls fail', async () => {
      const mockData = { key: 'value' };

      mockedAxios.mockImplementation(({ url }: { url: string }) => {
        if (url.includes('/test-path')) {
          return Promise.resolve({ status: 200, data: mockData });
        }
        return Promise.reject(new Error('Footer API Error'));
      });

      const result = await fetchData('test-path');

      expect(result.data).toEqual(mockData);
      expect(result.footer).toEqual(
        expect.objectContaining({ title: 'Follow Us', partners: null }),
      );
    });

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
