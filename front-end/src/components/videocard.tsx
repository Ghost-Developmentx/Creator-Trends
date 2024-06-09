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
  Divider,
  Box,
  Grow,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VideoPlayer from "./videoplayer";
import { IInstagramReel } from "../../../Back-End/src/models/instagramReel";

interface VideoCardProps {
  video: IInstagramReel;
}

const CardHeaderComponent: React.FC<{ username: string; datePosted: Date }> = ({
  username,
  datePosted,
}) => {
  // Helper function to format the date with the ordinal suffix (st, nd, rd, th)
  const formatDateWithOrdinal = (date: Date) => {
    const dayOfMonth = date.getDate();
    const suffixes = ["th", "st", "nd", "rd"];
    const relevantDigits = dayOfMonth < 30 ? dayOfMonth % 20 : dayOfMonth % 30;
    const suffix = relevantDigits <= 3 ? suffixes[relevantDigits] : suffixes[0];
    return (
      date.toLocaleDateString("en-US", { month: "long", day: "numeric" }) +
      suffix
    );
  };

  return (
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
        <Typography variant="body1" fontWeight="medium" component="div">
          {username}
        </Typography>
      }
      subheader={
        <Typography variant="body2" color="text.secondary">
          {formatDateWithOrdinal(datePosted)}
        </Typography>
      }
    />
  );
};

const CardContentComponent: React.FC<{ caption: string }> = ({ caption }) => (
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      {caption}
    </Typography>
  </CardContent>
);

const CardActionsComponent: React.FC<{
  likes: number;
  comments: number;
}> = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false); // New state for animation

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setAnimate(true); // Trigger animation when clicked

    // Reset the animation state after a short delay
    setTimeout(() => setAnimate(false), 800); // Adjust duration as needed
  };

  return (
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
        <FavoriteIcon
          sx={{
            color: isLiked ? "red" : "inherit",
            animation: animate ? "heartBurst 0.8s ease-out" : "none", // Apply animation if animate is true
          }}
        />
        <Typography variant="body2" sx={{ ml: 0.5 }}></Typography>
      </IconButton>
      <IconButton aria-label="comment">
        <AddCommentIcon />
        <Typography variant="body2" sx={{ ml: 0.5 }}></Typography>
      </IconButton>
    </CardActions>
  );
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
}) => {
  const [showVideo, setShowVideo] = useState(false);

  const handleClick = () => {
    setShowVideo(true);
  };

  return (
    <Grow in={true}>
      <Card
        sx={{
          maxWidth: 400,
          m: 2,
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
            <div style={{ padding: "8px" }}>
              <VideoPlayer videoUrl={videoUrl} playing={true} />
            </div>
          ) : (
            <CardMedia
              component="img"
              image={imageUrl}
              alt="Video Preview"
              onClick={handleClick}
              sx={{
                cursor: "pointer",
                aspectRatio: "1/1",
                transition: "transform 0.3s ease", // Add transition for image
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          )}
          <CardContentComponent caption={caption} />
          <CardActionsComponent likes={likes} comments={comments} />
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            sx={{
              borderRadius: "0 0 2px 2px",
              overflow: "hidden",
            }}
          >
            <Box
              flexGrow={1}
              component="div"
              sx={{ backgroundColor: "#E0F2F1" }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                p={1}
                sx={{
                  width: "100%",
                  backgroundColor: "#E0F2F1",
                  py: 1,
                  borderBottomLeftRadius: 2,
                  borderBottomRightRadius: 2,
                }}
              >
                {views} views
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              flexGrow={1}
              component="div"
              sx={{ backgroundColor: "#E0F2F1" }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                p={1}
              >
                {likes} likes
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              flexGrow={1}
              component="div"
              sx={{ backgroundColor: "#E0F2F1" }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                p={1}
              >
                {comments} comments
              </Typography>
            </Box>
          </Box>
        </>
      </Card>
    </Grow>
  );
};

export default VideoCard;
