import { base64Encode } from './base64';

export const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] as const;
export type TMethod = (typeof methods)[number];

export interface RequestParams {
  locale: string;
  method: string;
  url?: string;
  body?: string;
  headers?: { key: string; value: string }[];
}

export function getRequestUrlString({ locale, method, url = '', body = '', headers = [] }: RequestParams): string {
  const queryString = headers.map(({ key, value }) => `${key}=${value}`).join('&');
  return `/${locale}/client/${method}/${base64Encode(url.trim()) || ' '}/${base64Encode(body) || ''}?${queryString}`;
}

export const isMethod = (method: string): method is TMethod => methods.includes(method as TMethod);
