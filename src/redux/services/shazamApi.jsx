import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-host','shazam-core.p.rapidapi.com');
            headers.set('x-rapidapi-key', "4a0767be74msh8aa0379669e0888p1b346cjsn2469e2c98ff8");
            return headers;
        },
    }), 
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world?country_code=IN' }),
        getSongsByGenre: builder.query({
            query: (genre) => `/charts/genre-world?genre_code=${genre}`,
        }),
        getSongDetails: builder.query({
            query: (songId) => `/tracks/details?track_id=${songId}`,
        }),
        getSongRelated: builder.query({
            query: (songId) => `/tracks/related?track_id=${songId}`,
        }),
    }), 
})

export const {
    useGetTopChartsQuery,
} = shazamApi;
