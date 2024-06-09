// frontend/src/components/VideoPlayer.tsx

import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl: string;
  imageUrl?: string;
  playing?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, imageUrl }) => {
  return (
    <div style={{ position: "relative", paddingBottom: "177.78%" }}>
      {" "}
      {/* 16:9 aspect ratio */}
      <ReactPlayer
        url={videoUrl}
        controls={true}
        light={imageUrl}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};

export default VideoPlayer;
