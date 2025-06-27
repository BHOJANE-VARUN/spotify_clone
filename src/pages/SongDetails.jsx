import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamApi';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const otherId = useMemo(() => {
    return songData?.data?.[0].id; 
  }, [songData]);

  const {
    data: relatedSongsData,
    isFetching: isFetchingRelatedSongs,
    error: relatedSongsError,
  } = useGetSongRelatedQuery(otherId, {
    skip: !otherId,
  });

  if (isFetchingSongDetails && isFetchingRelatedSongs) return <Loader title="Searching song details" />;
  if (relatedSongsError) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedSongsData, i }));
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

      <RelatedSongs
        data={relatedSongsData}
        artistId={null}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
