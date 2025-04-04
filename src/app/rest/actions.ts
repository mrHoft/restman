'use server';

export async function executeRestRequest({
  method,
  url,
  headers,
  body,
}: {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: string;
}) {
  try {
    const res = await fetch(url, {
      method,
      headers: new Headers(headers),
      body: method !== 'GET' && method !== 'DELETE' ? body : undefined,
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    return {
      data: JSON.stringify(data, null, 2),
      status: res.status,
    };
  } catch (error) {
    console.error('REST Request failed:', error);
    return {
      data: JSON.stringify({ error: (error as Error).message }, null, 2),
      status: 500,
    };
  }
}
