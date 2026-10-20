import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { cashAccelerationApi } from '@/api/cashAcceleration/cashAcceleration.api';

jest.mock('@/api/client', () => ({
  http: {
    get: jest.fn(),
  },
}));

describe('cashAccelerationApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('get() calls http.get with the cashAcceleration endpoint', () => {
    cashAccelerationApi.get();
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.cashAcceleration, undefined);
  });

  it('forwards an AbortSignal config through to http.get', () => {
    const controller = new AbortController();
    cashAccelerationApi.get({ signal: controller.signal });
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.cashAcceleration, {
      signal: controller.signal,
    });
  });
});
