'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { UserInfo } from './types';

const secretKey = process.env.SESSION_SECRET ?? 'secret';
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: Partial<UserInfo>) {
  return new SignJWT({ sub: JSON.stringify(payload) })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload.sub;
  } catch {
    console.log('Failed to verify session');
  }

  return null;
}

export async function createSession(user: UserInfo) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    login: user.login,
    id: user.id,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
    name: user.name,
    email: user.email,
  });
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    sameSite: 'lax',
    path: '/',
  });
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;
  const user = await decrypt(session);
  if (!user) return null;

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires,
    sameSite: 'lax',
    path: '/',
  });

  return JSON.parse(user);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');

  redirect('/login');
}

export async function getUser() {
  const session = (await cookies()).get('session')?.value;
  if (!session) return null;
  const user = await decrypt(session);
  if (!user) return null;

  return JSON.parse(user) as UserInfo;
}
