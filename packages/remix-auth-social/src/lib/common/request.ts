export const request = async <T extends object>(
  url: string,
  { method = 'GET', headers, ...options }: RequestInit = {},
) => {
  const response = await fetch(url, {
    ...options,
    method,
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Unexpected response: ${response.status} ${body}`);
  }
  const body = (await response.json()) as T;
  return body;
};
