import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  CardActions,
  CardMedia,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VideoPlayer from "./videoplayer";
import { IInstagramReel } from "../../../Back-End/src/models/instagramReel";
import mockReels from "../mockdata";

interface VideoCardProps {
  video: IInstagramReel;
}

const CardHeaderComponent: React.FC<{ username: string; datePosted: Date }> = ({
  username,
  datePosted,
}) => (
  <CardHeader
    avatar={
      <Avatar aria-label="user" sx={{ backgroundColor: "secondary.main" }}>
        {username.charAt(0).toUpperCase()}
      </Avatar>
    }
    action={
      <IconButton aria-label="settings">
        <MoreVertIcon />
      </IconButton>
    }
    title={
      <Typography variant="h6" fontWeight="medium" component="div">
        {username}
      </Typography>
    }
    subheader={
      <Typography variant="body2" color="text.secondary">
        {new Date(datePosted).toLocaleDateString()}
      </Typography>
    }
  />
);

const CardContentComponent: React.FC<{ caption: string }> = ({ caption }) => (
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      {caption}
    </Typography>
  </CardContent>
);

const CardActionsComponent: React.FC = () => (
  <CardActions disableSpacing>
    <IconButton aria-label="add to favorites">
      <FavoriteIcon />
    </IconButton>
    <IconButton aria-label="share">
      <ShareIcon />
    </IconButton>
  </CardActions>
);

const [showVideo, setShowVideo] = useState(false);

const handleClick = () => {
  setShowVideo(true);
};

const VideoCard: React.FC<VideoCardProps> = ({
  video: {
    videoUrl,
    imageUrl,
    caption,
    likes,
    comments,
    views,
    username,
    datePosted,
    audioUrl,
  },
}) => (
  <Card
    sx={{
      maxWidth: 400,
      m: 2, //margin
      borderRadius: 2,
      boxShadow: 3,
      "&:hover": {
        boxShadow: 8,
        transform: "translateY(-2px)",
      },
      transition: "box-shadow 0.3s ease, transform 0.3s ease",
    }}
  >
    <>
      <CardHeaderComponent username={username} datePosted={datePosted} />
      {showVideo ? (
        <VideoPlayer videoUrl={videoUrl} imageUrl={imageUrl} />
      ) : (
        <CardMedia
          component="img"
          image={imageUrl}
          alt="Video Preview"
          onClick={handleClick}
          sx={{
            cursor: "pointer",
            aspectRatio: "9/16",
          }}
        />
      )}
      <CardContentComponent caption={caption} />
      <CardActionsComponent />
      <Typography variant="body2" color="text.secondary" align="center">
        {views} views - {likes} likes - {comments} comments
      </Typography>
    </>
  </Card>
);
export default VideoCard;
