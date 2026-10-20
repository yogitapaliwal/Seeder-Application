import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { fundingApi } from '@/api/funding/funding.api';

jest.mock('@/api/client', () => ({
  http: {
    get: jest.fn(),
    patch: jest.fn(),
  },
}));

describe('fundingApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get() calls http.get with the funding endpoint', () => {
    fundingApi.get();
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.funding, undefined);
  });

  it('update() calls http.patch with the funding endpoint and payload', () => {
    fundingApi.update({ availableAmount: 5000 });
    expect(http.patch).toHaveBeenCalledWith(ENDPOINTS.funding, { availableAmount: 5000 });
  });
});
