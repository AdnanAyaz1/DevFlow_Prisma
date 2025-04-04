interface FetchOptions extends RequestInit {
  timeout?: number;
}

export async function fetchHandler(url: string, options: FetchOptions = {}) {
  const {
    timeout = 30000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };
  const config: RequestInit = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  const response = await fetch(url, config);
  clearTimeout(id);

  return await response.json();
}
