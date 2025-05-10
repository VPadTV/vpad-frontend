import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import authReducer from './features/authSlice';
import postReducer from './features/postSlice';
import commentReducer from './features/commentSlice';
import tierReducer from './features/tierSlice';
import seriesReducer from './features/seriesSlice';
import userReducer from './features/userSlice';
import subReducer from './features/subSlice';
import adminReducer from './features/adminSlice';
import toast from 'react-hot-toast';

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    }
  };
};

let storage;
if (typeof window !== 'undefined') {
  storage = require('redux-persist/lib/storage').default;
} else {
  storage = createNoopStorage();
}

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  posts: postReducer,
  tiers: tierReducer,
  series: seriesReducer,
  comments: commentReducer, 
  sub: subReducer,
  admin: adminReducer,  
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: any[] = [];

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({
    collapsed: true,
  });
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = typeof window !== 'undefined' ? persistStore(store) : null;

export const wrapper = async (functions: any, api: Function, data = {}) => {
  try {
    functions?.onRequest?.();
    const response = await api(data);
    functions?.onSuccess?.(response);
    return response;
  } catch (error: any) {
    console.error(error);
    if (typeof window !== 'undefined') {
      toast.dismiss();
      toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
    }
    functions?.onFailure?.(error);
    throw error;
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
