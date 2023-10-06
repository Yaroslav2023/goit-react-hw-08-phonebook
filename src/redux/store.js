import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { contactsApi } from './API/contactsApi';
import filterReducer from './filterSlice';
import authReducer from './auth/authSlice';
import authApi from './auth/index';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReduser = combineReducers({
  [contactsApi.reducerPath]: contactsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  filter: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReduser);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware, authApi.middleware),
});
export const persistor = persistStore(store);
