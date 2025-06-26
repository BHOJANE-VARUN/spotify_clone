import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ce5f5cf2cbmsh3141fca85778b6cp16a433jsn839235a200e3
export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-host','shazam-core.p.rapidapi.com');
            headers.set('x-rapidapi-key', "29832f5b28msh4b7df5f357a5997p13adaejsn9f233b3d3b03");
            return headers;
        },
    }), 
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => 'v1/charts/world?country_code=IN' }),
        getArtistDetails: builder.query({
            query: (artistId) => `v2/artists/details?artist_id=${artistId}`,
        }),
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
    useGetArtistDetailsQuery
} = shazamApi;
