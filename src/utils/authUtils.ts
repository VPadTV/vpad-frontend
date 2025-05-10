import { parseCookies, setCookie, destroyCookie } from 'nookies';

/**
 * Checks if a user is authenticated by checking cookies and localStorage
 * @returns boolean indicating if the user is authenticated
 */
export const isUserAuthenticated = (): boolean => {
  // Check cookies first (server-side compatible)
  const cookies = parseCookies();
  if (cookies.token) {
    return true;
  }
  
  // Then check localStorage (client-side only)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return !!token;
  }
  
  return false;
};

/**
 * Synchronizes authentication state between cookies and localStorage
 */
export const syncAuthState = (): void => {
  if (typeof window === 'undefined') {
    return; // Server-side, do nothing
  }
  
  const cookies = parseCookies();
  const cookieToken = cookies.token;
  const localToken = localStorage.getItem('token');
  
  if (cookieToken && !localToken) {
    // Cookie exists but localStorage doesn't, sync to localStorage
    localStorage.setItem('token', cookieToken);
  } else if (localToken && !cookieToken) {
    // localStorage exists but cookie doesn't, sync to cookie
    setCookie(null, 'token', localToken, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }
};

/**
 * Clear all authentication data
 */
export const clearAuthState = (): void => {
  destroyCookie(null, 'token');
  
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
