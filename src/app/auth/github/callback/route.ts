'use server';

import { NextResponse, type NextRequest } from 'next/server';
import { createSession } from '../../session';
import type { UserInfo } from '../../types';

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? 'unknown';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET ?? 'unknown';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    request.nextUrl.pathname = '/login?error=no_code';
    return NextResponse.redirect(request.nextUrl);
  }

  try {
    const token = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
      { method: 'POST', headers: { Accept: 'application/json' } }
    )
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        const { access_token, error } = data;
        if (error) {
          throw new Error(error);
        }
        return access_token;
      });

    const user = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => data as UserInfo);

    await createSession(user);
  } catch (error) {
    request.nextUrl.pathname = `/login?error=${error}`;
    return NextResponse.redirect(request.nextUrl);
  }

  request.nextUrl.pathname = '/client';
  return NextResponse.redirect(request.nextUrl);
}
