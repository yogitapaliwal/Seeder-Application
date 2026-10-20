import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { cashKicksApi } from '@/api/cashkicks/cashkicks.api';

jest.mock('@/api/client', () => ({
  http: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('cashKicksApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAll() defaults to page 1 / 10 per page with no status filter', () => {
    cashKicksApi.getAll();
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.cashkicks, {
      params: { _page: 1, _per_page: 10 },
    });
  });

  it('getAll() forwards custom page/perPage/status', () => {
    cashKicksApi.getAll(2, 25, 'Approved');
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.cashkicks, {
      params: { _page: 2, _per_page: 25, status: 'Approved' },
    });
  });

  it('getById() calls http.get with the id appended to the endpoint', () => {
    cashKicksApi.getById('ck1');
    expect(http.get).toHaveBeenCalledWith(`${ENDPOINTS.cashkicks}/ck1`, undefined);
  });

  it('create() calls http.post with the payload', () => {
    const payload = {
      name: 'Marketing expenses',
      status: 'Pending' as const,
      maturity: '2022-05-03',
      totalReceived: 15000,
      feePercentage: 12,
      totalFinanced: 15000,
    };
    cashKicksApi.create(payload);
    expect(http.post).toHaveBeenCalledWith(ENDPOINTS.cashkicks, payload);
  });

  it('update() calls http.patch with the id and payload', () => {
    cashKicksApi.update('ck1', { status: 'Approved' });
    expect(http.patch).toHaveBeenCalledWith(`${ENDPOINTS.cashkicks}/ck1`, { status: 'Approved' });
  });

  it('remove() calls http.delete with the id', () => {
    cashKicksApi.remove('ck1');
    expect(http.delete).toHaveBeenCalledWith(`${ENDPOINTS.cashkicks}/ck1`);
  });
});
