import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { paymentsApi } from '@/api/payments/payments.api';

jest.mock('@/api/client', () => ({
  http: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('paymentsApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAll() defaults to page 1 / 10 per page with no status filter', () => {
    paymentsApi.getAll();
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.payments, {
      params: { _page: 1, _per_page: 10 },
    });
  });

  it('getAll() forwards custom page/perPage/status and merges extra config', () => {
    paymentsApi.getAll(2, 25, 'Paid', { signal: undefined });
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.payments, {
      signal: undefined,
      params: { _page: 2, _per_page: 25, status: 'Paid' },
    });
  });

  it('getById() calls http.get with the id appended to the endpoint', () => {
    paymentsApi.getById('p1');
    expect(http.get).toHaveBeenCalledWith(`${ENDPOINTS.payments}/p1`, undefined);
  });

  it('create() calls http.post with the payload', () => {
    const payload = {
      dueDate: '2021-05-03',
      expectedAmount: 100,
      status: 'Pending' as const,
      outstandingAmount: 100,
    };
    paymentsApi.create(payload);
    expect(http.post).toHaveBeenCalledWith(ENDPOINTS.payments, payload);
  });

  it('update() calls http.patch with the id and payload', () => {
    paymentsApi.update('p1', { status: 'Paid' });
    expect(http.patch).toHaveBeenCalledWith(`${ENDPOINTS.payments}/p1`, { status: 'Paid' });
  });

  it('remove() calls http.delete with the id', () => {
    paymentsApi.remove('p1');
    expect(http.delete).toHaveBeenCalledWith(`${ENDPOINTS.payments}/p1`);
  });
});
