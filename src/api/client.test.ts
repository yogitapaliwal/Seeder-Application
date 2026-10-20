const mockApiClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
};

const mockCreate = jest.fn(() => mockApiClient);

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: mockCreate,
  },
}));

// webpack's DefinePlugin normally bakes this in at build time; stand in for that here
// since client.ts throws at import time if it's missing.
process.env.REACT_APP_API_URL = 'http://localhost:9999';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { http } = require('@/api/client');

describe('missing REACT_APP_API_URL', () => {
  it('throws at import time when the env var is not set', () => {
    const originalUrl = process.env.REACT_APP_API_URL;
    delete process.env.REACT_APP_API_URL;
    jest.resetModules();

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('@/api/client');
    }).toThrow('REACT_APP_API_URL is not set - check your .env file.');

    process.env.REACT_APP_API_URL = originalUrl;
    jest.resetModules();
  });
});

describe('http', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('configures the axios instance with the expected baseURL/timeout/headers', () => {
    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'http://localhost:9999',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' },
    });
  });

  it('get() delegates to apiClient.get and unwraps res.data', async () => {
    mockApiClient.get.mockResolvedValue({ data: { id: 1 } });

    const result = await http.get('/contracts', { params: { page: 1 } });

    expect(mockApiClient.get).toHaveBeenCalledWith('/contracts', { params: { page: 1 } });
    expect(result).toEqual({ id: 1 });
  });

  it('post() delegates to apiClient.post with the payload and unwraps res.data', async () => {
    mockApiClient.post.mockResolvedValue({ data: { id: 2 } });

    const result = await http.post('/contracts', { name: 'Acme' });

    expect(mockApiClient.post).toHaveBeenCalledWith('/contracts', { name: 'Acme' }, undefined);
    expect(result).toEqual({ id: 2 });
  });

  it('put() delegates to apiClient.put with the payload and unwraps res.data', async () => {
    mockApiClient.put.mockResolvedValue({ data: { id: 3 } });

    const result = await http.put('/contracts/1', { name: 'Updated' });

    expect(mockApiClient.put).toHaveBeenCalledWith('/contracts/1', { name: 'Updated' }, undefined);
    expect(result).toEqual({ id: 3 });
  });

  it('patch() delegates to apiClient.patch with the payload and unwraps res.data', async () => {
    mockApiClient.patch.mockResolvedValue({ data: { id: 4 } });

    const result = await http.patch('/contracts/1', { name: 'Patched' });

    expect(mockApiClient.patch).toHaveBeenCalledWith(
      '/contracts/1',
      { name: 'Patched' },
      undefined,
    );
    expect(result).toEqual({ id: 4 });
  });

  it('delete() delegates to apiClient.delete and unwraps res.data', async () => {
    mockApiClient.delete.mockResolvedValue({ data: undefined });

    const result = await http.delete('/contracts/1');

    expect(mockApiClient.delete).toHaveBeenCalledWith('/contracts/1', undefined);
    expect(result).toBeUndefined();
  });
});

describe('response interceptor', () => {
  const [onFulfilled, onRejected] = mockApiClient.interceptors.response.use.mock.calls[0];

  it('passes a successful response through unchanged', () => {
    const response = { data: { ok: true } };
    expect(onFulfilled(response)).toBe(response);
  });

  it('logs and re-rejects with the original error when it is already an Error', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = Object.assign(new Error('Request failed'), {
      response: { data: { message: 'Not found' } },
    });

    await expect(onRejected(error)).rejects.toBe(error);
    expect(consoleError).toHaveBeenCalledWith('API error:', { message: 'Not found' });

    consoleError.mockRestore();
  });

  it('falls back to error.message when there is no response body', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error('Network Error');

    await expect(onRejected(error)).rejects.toBe(error);
    expect(consoleError).toHaveBeenCalledWith('API error:', 'Network Error');

    consoleError.mockRestore();
  });

  it('wraps a non-Error rejection reason in an Error before re-rejecting', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = { message: 'Network Error' };

    await expect(onRejected(error)).rejects.toThrow('Network Error');
    expect(consoleError).toHaveBeenCalledWith('API error:', 'Network Error');

    consoleError.mockRestore();
  });

  it('falls back to String(error) when the rejection reason has no message', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const error = 'plain string failure';

    await expect(onRejected(error)).rejects.toThrow('plain string failure');
    expect(consoleError).toHaveBeenCalledWith('API error:', undefined);

    consoleError.mockRestore();
  });
});

describe('request interceptor (temporary artificial delay)', () => {
  // Captured here, at describe-body time, before any other describe block's
  // afterEach(jest.clearAllMocks) has a chance to wipe mockApiClient's call history.
  const [onFulfilled] = mockApiClient.interceptors.request.use.mock.calls[0];

  it('resolves with the original config after the delay', () => {
    jest.useFakeTimers();

    const config = { url: '/contracts' };
    const promise = onFulfilled(config);

    jest.advanceTimersByTime(1500);

    jest.useRealTimers();
    return expect(promise).resolves.toBe(config);
  });
});
