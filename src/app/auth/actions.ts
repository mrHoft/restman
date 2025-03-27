'use server';

import { createClient } from '~/utils/supabase/server';

export async function login(data: { email: string; password: string }) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message || 'Login failed' };
  }

  return { success: true };
}

export async function register(data: { email: string; password: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message || 'Registration failed' };
  }

  return { success: true };
}

export async function signout() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }
}
