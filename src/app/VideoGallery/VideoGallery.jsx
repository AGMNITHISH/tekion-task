import React, { useEffect, useState } from "react";
import mediaData from "../staic/data/videoGallery/mediaData.json";
import VideoCard from "./components/VideoCard";

const VideoGallery = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(mediaData.categories);
  }, []);
  return (
    <>
      <div className="grid grid-cols-3  gap-6 p-6">
        {data.map((item, ind) => {
          return (
            <div key={ind}>
              <VideoCard item={item} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VideoGallery;
