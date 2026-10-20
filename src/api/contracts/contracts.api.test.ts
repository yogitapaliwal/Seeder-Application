import { http } from '@/api/client';
import { ENDPOINTS } from '@/api/endpoints';
import { contractsApi } from '@/api/contracts/contracts.api';

jest.mock('@/api/client', () => ({
  http: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const newContractPayload = {
  name: 'Acme',
  status: 'Available' as const,
  type: 'Monthly' as const,
  perPayment: 100,
  totalFinanced: null,
  totalAvailable: 1000,
  termLengthMonths: 12,
  feePercentage: 5,
  paymentAmount: 100,
};

describe('contractsApi', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAll() defaults to page 1 / 10 per page with no filters', () => {
    contractsApi.getAll();
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.contracts, {
      params: { _page: 1, _per_page: 10 },
    });
  });

  it('getAll() includes status and comma-joined selectedIds when provided', () => {
    contractsApi.getAll(1, 10, 'Available', undefined, ['a', 'b']);
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.contracts, {
      params: { _page: 1, _per_page: 10, status: 'Available', selectedIds: 'a,b' },
    });
  });

  it('omits selectedIds when the array is empty', () => {
    contractsApi.getAll(1, 10, undefined, undefined, []);
    expect(http.get).toHaveBeenCalledWith(ENDPOINTS.contracts, {
      params: { _page: 1, _per_page: 10 },
    });
  });

  it('getById() calls http.get with the id appended to the endpoint', () => {
    contractsApi.getById('c1');
    expect(http.get).toHaveBeenCalledWith(`${ENDPOINTS.contracts}/c1`, undefined);
  });

  it('getByIds() calls http.get once per id', async () => {
    await contractsApi.getByIds(['c1', 'c2']);
    expect(http.get).toHaveBeenCalledTimes(2);
    expect(http.get).toHaveBeenCalledWith(`${ENDPOINTS.contracts}/c1`, undefined);
    expect(http.get).toHaveBeenCalledWith(`${ENDPOINTS.contracts}/c2`, undefined);
  });

  it('create() calls http.post with the new contract payload', () => {
    contractsApi.create(newContractPayload);
    expect(http.post).toHaveBeenCalledWith(ENDPOINTS.contracts, newContractPayload);
  });

  it('autoSelect() calls http.post with the target amount', () => {
    contractsApi.autoSelect(50000);
    expect(http.post).toHaveBeenCalledWith(
      `${ENDPOINTS.contracts}/auto-select`,
      { targetAmount: 50000 },
      undefined,
    );
  });

  it('update() calls http.patch with the id and payload', () => {
    contractsApi.update('c1', { status: 'Financed' });
    expect(http.patch).toHaveBeenCalledWith(`${ENDPOINTS.contracts}/c1`, { status: 'Financed' });
  });

  it('remove() calls http.delete with the id', () => {
    contractsApi.remove('c1');
    expect(http.delete).toHaveBeenCalledWith(`${ENDPOINTS.contracts}/c1`);
  });
});
