import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamApi';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

//   const { data, isFetching: isFetchinRelatedSongs, error } = useGetSongRelatedQuery(songid);
  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;
  if (isFetchingSongDetails ) return <Loader title="Searching song details" />;

  

//   if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  const lycis = Object.values(songData?.resources?.lyrics || {})?.[0]?.attributes?.text;


  return (
    <div className="flex flex-col">
      <DetailsHeader
        artistId={null}
        artistData={null}
        songData={songData?.resources}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {lycis && lycis.length > 0
            ? lycis.map((line, i) => (
              <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
            ))
            : (
              <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
            )}
        </div>
      </div>

      {/* <RelatedSongs
        data={data}
        artistId={null}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      /> */}

    </div>
  );
};

export default SongDetails;