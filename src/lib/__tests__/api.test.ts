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
  let fetchFooter: () => Promise<any>;
  let fetchData: (_path: string) => Promise<any>;
  let mockedAxios: jest.Mock;
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      API_BASE_URL: 'http://localhost:8080/api/cms/v1',
      API_KEY: 'test-key',
    };
    // Re-require after setting env so module-level constants pick them up
    const api = require('../api'); // eslint-disable-line @typescript-eslint/no-var-requires
    fetchFooter = api.fetchFooter;
    fetchData = api.fetchData;
    mockedAxios = require('axios').default; // eslint-disable-line @typescript-eslint/no-var-requires
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
    it('should return data and footer when API calls are successful', async () => {
      const mockData = { key: 'value' };
      const mockFooterData = { footer: 'Footer content' };

      mockedAxios
        .mockResolvedValueOnce({ status: 200, data: mockData })
        .mockResolvedValueOnce({ status: 200, data: mockFooterData });

      const result = await fetchData('test-path');

      expect(result).toEqual({ data: mockData, footer: mockFooterData });
      expect(mockedAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringContaining('/test-path'),
        }),
      );
    });

    it('should return fallback data when fetchData API call fails', async () => {
      mockedAxios.mockRejectedValue(new Error('API Error'));

      const result = await fetchData('landingPage');
      expect(result.data).toEqual(
        expect.objectContaining({ id: 'page:LANDING_PAGE' }),
      );
    });
  });
});
