'use server';

export interface RestRequestProps {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
}

export async function executeRestRequest({ method, url, headers, body }: RestRequestProps) {
  let status = 500;

  try {
    const res = await fetch(url, {
      method,
      headers: new Headers(headers),
      body: method !== 'GET' && method !== 'DELETE' ? body : undefined,
    });

    status = res.status;

    if (Math.floor(status / 100) >= 4) throw new Error(`HTTP ${status}`);

    const data = await res.json();
    return {
      data: JSON.stringify(data, null, 2),
      status,
    };
  } catch (error) {
    console.error('REST Request failed:', error);
    return {
      data: JSON.stringify({ error: (error as Error).message }),
      status,
    };
  }
}
