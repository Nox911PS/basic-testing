import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const relativePath = 'relativePath';
const data = 'data';
const responseData = { data };

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue(responseData),
    } as unknown as AxiosInstance);

    await throttledGetDataFromApi(relativePath);

    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const getSpied = jest.fn().mockResolvedValue(responseData);
    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ get: getSpied } as unknown as AxiosInstance);

    await throttledGetDataFromApi(relativePath);

    expect(getSpied).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create').mockReturnValue({
      get: jest.fn().mockResolvedValue(responseData),
    } as unknown as AxiosInstance);

    await expect(throttledGetDataFromApi(relativePath)).resolves.toEqual(data);
  });
});
