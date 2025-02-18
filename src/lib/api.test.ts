import axios from 'axios';

import { fetchData, fetchFooter } from './api';

jest.mock('axios');

describe('API Fetch Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchFooter', () => {
    it('should return footer data when API call is successful', async () => {
      const mockFooterData = { footer: 'Footer content' };
      (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
        status: 200,
        data: mockFooterData,
      });

      const result = await fetchFooter();
      expect(result).toEqual(mockFooterData);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API_BASE_URL}/footer`,
        {
          headers: { 'X-API-KEY': process.env.API_KEY },
        },
      );
    });

    it('should throw an error when API call fails', async () => {
      (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
        new Error('API Error'),
      );

      await expect(fetchFooter()).rejects.toThrow('Failed to fetch footer');
    });
  });

  describe('fetchData', () => {
    it('should return data and footer when API calls are successful', async () => {
      const mockData = { key: 'value' };
      const mockFooterData = { footer: 'Footer content' };

      (axios.get as jest.MockedFunction<typeof axios.get>)
        .mockResolvedValueOnce({ status: 200, data: mockData })
        .mockResolvedValueOnce({ status: 200, data: mockFooterData });

      const result = await fetchData('test-path');

      expect(result).toEqual({ data: mockData, footer: mockFooterData });
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API_BASE_URL}/test-path`,
        {
          headers: { 'X-API-KEY': process.env.API_KEY },
        },
      );
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.API_BASE_URL}/footer`,
        {
          headers: { 'X-API-KEY': process.env.API_KEY },
        },
      );
    });

    it('should throw an error when fetchData API call fails', async () => {
      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockRejectedValueOnce(new Error('API Error'));

      await expect(fetchData('test-path')).rejects.toThrow(
        'Failed to fetch data',
      );
    });
  });
});
