import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const newsApiHeader = {
  Authorization: `Bearer ${process.env.REACT_APP_NEWS_KEY}`,
};

const baseUrl = "https://newsapi.org/v2";

const createRequest = (url) => ({ url, headers: newsApiHeader });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, from, sortBy, count }) =>
        createRequest(
          `/everything?q=${newsCategory}&from=${from}&sortBy=${sortBy}&pageSize=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
