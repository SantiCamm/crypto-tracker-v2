import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY,
};



const baseUrl = "https://coinranking1.p.rapidapi.com";
const buildRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => buildRequest(`/coins?limit=${count}`),
    }),
    getCoinDetails: builder.query({
      query: (coinId) => buildRequest(`coin/${coinId}`),
    }),
    getCoinHistory: builder.query({
      query: ({coinId, timePeriod}) => buildRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCoinDetailsQuery, useGetCoinHistoryQuery } = cryptoApi;
