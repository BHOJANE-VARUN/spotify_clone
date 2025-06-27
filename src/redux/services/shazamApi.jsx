import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// 321bb7c862mshfdd524341eeb528p1e6201jsnaed0d1cabf40
export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-host','shazam-core.p.rapidapi.com');
            headers.set('x-rapidapi-key', "ce5f5cf2cbmsh3141fca85778b6cp16a433jsn839235a200e3");
            return headers;
        },
    }), 
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => 'v1/charts/world?country_code=IN' }),
        getArtistDetails: builder.query({
            query: ({artistId}) => `v2/artists/details?artist_id=${artistId}`,
        }),
        getSongsByGenre: builder.query({
            query: (genre) => `charts/genre-world?genre_code=${genre}`,
        }),
        getSongDetails: builder.query({
            query: (songId) => `v2/tracks/details?track_id=${songId}`,
        }),
        getSongRelated: builder.query({
            query: (songId) => `v1/tracks/related?track_id=${songId}&offset=10`,
        }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `v1/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` })
    
    }), 
})

export const {
    useGetTopChartsQuery,
    useGetArtistDetailsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetSongsBySearchQuery
} = shazamApi;

