// frontend/src/components/VideoPlayer.tsx

import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  videoUrl: string;
  imageUrl?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, imageUrl }) => {
  return (
    <div>
      <ReactPlayer
        url={videoUrl}
        controls={true}
        light={imageUrl} // Show preview image while loading
        width="100%" // Make the player responsive
        height="100%"
        style={{ aspectRatio: "16/9" }} // Maintain aspect ratio
      />
    </div>
  );
};

export default VideoPlayer;
