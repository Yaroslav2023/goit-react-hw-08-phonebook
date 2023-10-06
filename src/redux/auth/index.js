import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  keepUnusedDataFor: 1,
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: credentials => ({
        url: '/users/signup',
        method: 'POST',
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => '/users/current',
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetCurrentUserQuery } =
  authApi;
export default authApi;
