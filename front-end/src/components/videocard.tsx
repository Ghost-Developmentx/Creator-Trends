import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  IconButton,
  CardActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VideoPlayer from "./videoplayer";
import { IInstagramReel } from "../../../Back-End/src/models/instagramReel";
import mockReels from "../mockdata"; // Import mock reels for now

const VideoCard: React.FC<IInstagramReel> = ({
  videoUrl,
  imageUrl,
  caption,
  likes,
  comments,
  views,
  username,
  datePosted,
  audioUrl,
}) => {
  // Logic and state (we'll add this later)

  return (
    <Card>
      {
        <>
          <CardHeader
            avatar={
              <Avatar aria-label="user">
                {username.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={username}
            subheader={new Date(datePosted).toLocaleDateString()}
          />
          <VideoPlayer videoUrl={videoUrl} imageUrl={imageUrl} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {caption}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          <Typography variant="body2" color="text.secondary" align="center">
            {views} views - {likes} likes - {comments} comments
          </Typography>
        </>
      }
    </Card>
  );
};

export default VideoCard;
