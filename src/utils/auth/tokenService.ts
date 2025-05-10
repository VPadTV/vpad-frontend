"use server";
import { cookies } from 'next/headers';

export async function getServerSideToken(): Promise<string | null> {
  try {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token');
    return tokenCookie?.value || null;
  } catch (error) {
    console.error('Error retrieving token from server cookies:', error);
    return null;
  }
}
