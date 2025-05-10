import { Middleware, AnyAction } from 'redux';
import { getToken } from '@/utils/api';

export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';

interface ApiRequestAction extends AnyAction {
  type: typeof API_REQUEST;
  meta: {
    url: string;
    method: string;
    body?: any;
    onSuccess?: string;
    onError?: string;
    headers?: Record<string, string>;
  };
}

export const apiRequest = (
  url: string, 
  method: string, 
  body?: any,
  onSuccess?: string,
  onError?: string,
  headers?: Record<string, string>
): ApiRequestAction => ({
  type: API_REQUEST,
  meta: { url, method, body, onSuccess, onError, headers }
});

export const apiMiddleware: Middleware = 
  ({ dispatch }) => 
  next => 
  (action: unknown) => {
    if (!action || typeof action !== 'object' || !('type' in action) || action.type !== API_REQUEST) {
      return next(action);
    }

    const apiAction = action as ApiRequestAction;
    const { url, method, body, onSuccess, onError, headers = {} } = apiAction.meta;
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    
    const token = getToken();
    
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers
    };
    
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    fetch(`${API_URL}${url}`, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw err;
        });
      }
      return response.json();
    })
    .then(data => {
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: data });
      }
      
      dispatch({ type: API_SUCCESS, payload: data });
    })
    .catch(error => {
      if (onError) {
        dispatch({ type: onError, payload: error.message || 'API request failed' });
      }
      dispatch({ type: API_ERROR, payload: error.message || 'API request failed' });
    });

    return next(action);
  };
