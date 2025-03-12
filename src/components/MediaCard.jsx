import React from "react";
import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import Image1 from "../assets/images/gamepost__30_-1-300x420.jpg";
import Image2 from "../assets/images/video_img11-1-300x420.jpg";
import Image3 from "../assets/images/video_img6-1-300x420.jpg";
import { Link } from "react-router-dom";

// Default thumbnails for media types
const defaultThumbnails = {
  video: [Image1, Image2, Image3],
  movie: [Image1, Image2, Image3],
  image: [Image1, Image2, Image3],
};

// Function to get a random default thumbnail
const getRandomThumbnail = (type) => {
  const images = defaultThumbnails[type] || defaultThumbnails.image;
  return images[Math.floor(Math.random() * images.length)];
};

// Function to render star rating
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon
        key={i}
        sx={{
          color: i <= rating ? "gold" : "white",
          fontSize: "20px",
        }}
      />
    );
  }
  return stars;
};

const MediaCard = ({ media }) => {
  const isVideoOrMovie =
    media.category === "videos" || media.category === "movies";
    const thumbnail = isVideoOrMovie
      ? getRandomThumbnail(media.category)
      : media.url || getRandomThumbnail(media.category || "image");

  return (
    <Card
      sx={{
        margin: "16px",
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${thumbnail})`, // Set the background image
      }}
    >
      <Link
        to={`/media/${media.id}`}
        style={{ textDecoration: "none", height: "100%", display: "block" }}
      >
        {/* Play button for videos and movies */}
        {isVideoOrMovie && (
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
          >
            <PlayCircleOutlineIcon sx={{ fontSize: 60 }} />
          </IconButton>
        )}
      </Link>

      {/* Bottom-left overlay */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Category Label */}
        <Box
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            alignSelf: "flex-start",
          }}
        >
          <Typography variant="caption">
            {media.category || "Uncategorized"}
          </Typography>
        </Box>

        {/* Media Title */}
        <Typography
          gutterBottom
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: { xs: "14px", sm: "18px", md: "20px" },
            textAlign: "left"
          }}
        >
          {media.title || "Unknown Title"}
        </Typography>

        {/* Star Rating */}
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {renderStars(media.averageRating || 0)}
        </Box>
      </Box>
    </Card>
  );
};

export default MediaCard;
