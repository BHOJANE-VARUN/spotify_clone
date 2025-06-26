import React from "react";
import { Link } from "react-router-dom";
import { useGetArtistDetailsQuery } from "../redux/services/shazamApi";
import { SwiperSlide } from "swiper/react";

function SliderCard({ artistid, time }) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const curTime = setTimeout(async () => {
      const Raw = await fetch(
        `https://shazam-core.p.rapidapi.com/v2/artists/details?artist_id=${artistid}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "shazam-core.p.rapidapi.com",
            "x-rapidapi-key":
              "29832f5b28msh4b7df5f357a5997p13adaejsn9f233b3d3b03",
          },
        }
      );
      const data = await Raw.json();
      setData(data);
    }, time);
    return () => {
      clearTimeout(curTime);
    };
  }, [artistid, time]);

  if (!data) return <div className="loader">Loading...</div>;
  const artist = data?.data?.[0]?.attributes;
  const photo = artist.artwork.url.replace("{w}", "300").replace("{h}", "300");
  return (

      <Link to={`/artists/${artistid}`}>
        <img
          src={photo}
          alt="Name"
          className="rounded-full w-full object-cover"
        />
      </Link>
    
  );
}

export default SliderCard;
