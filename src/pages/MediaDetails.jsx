import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CommentSection from "../components/CommentSection";
import Rating from "../components/Rating";
import { fetchMedia, submitComment } from "../services/api";
import videos from "../data/videos";
import banner from "../assets/images/banner5.jpg";

const MediaDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [media, setMedia] = useState(null);
  const [comments, setComments] = useState([]);
  // log comments
  console.log(comments);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Keep API fetching logic (commented out for now)
useEffect(() => {
  const loadMedia = async () => {
    if (!id || typeof id !== "string") {
      setError("Invalid media ID");
      return;
    }

    try {
      setLoading(true);
      const fetchedMedia = await fetchMedia(String(id).trim()); // Ensure it's a string
      if (!fetchedMedia) {
        setError("Media not found");
        return;
      }

      setMedia(fetchedMedia);
      console.log(fetchedMedia);
      setComments(fetchedMedia.comments || []);
      console.log(fetchedMedia.comments);
    } catch (error) {
      setError("Failed to load media");
    } finally {
      setLoading(false);
    }
  };

  loadMedia();
}, [id]);



const handleAddComment = async () => {
  if (!comment.trim()) return;

  const newComment = {
    uploadId: id,
    comment,
  };

  try {
    await submitComment(newComment, location.pathname);
    setComments((prevComments) => [...prevComments, newComment.comment]);
    setComment(""); // ✅ Clears the input after submission
  } catch (error) {
    console.error("Error submitting comment:", error);
  }
};

  if (!media) {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        sx={{ textAlign: "center", padding: "16px" }}
      >
        {error || "Loading..."}
      </Typography>
    );
  }

  if (loading) {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        sx={{ textAlign: "center", padding: "16px" }}
      >
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ textAlign: "center", padding: "16px" }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "16px", maxWidth: "900px", margin: "auto" }}>
      {/* Banner Image */}
      <Box
        component="img"
        src={media?.category === "images" ? media.url : banner}
        alt="Banner"
        sx={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "16px",
          boxShadow: 3,
        }}
      />

      {/* Media Title */}
      <Typography variant="h4" gutterBottom>
        {media.title}
      </Typography>

      {/* Display Media (Video or Image) */}
      {media?.category === "videos" || media?.category === "movies" ? (
        <Box
          component="video"
          controls
          src={media?.url}
          sx={{
            width: "100%",
            maxHeight: "500px",
            borderRadius: "8px",
            boxShadow: 3,
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          component="img"
          src={media?.url}
          alt={media?.title}
          sx={{
            width: "100%",
            maxHeight: "500px",
            borderRadius: "8px",
            boxShadow: 3,
            objectFit: "cover",
          }}
        />
      )}

      {/* Rating */}
      <Rating mediaId={media.id} initialRating={media.rating} />

      {/* Comments Section */}
      <CommentSection comments={comments} />

      {/* Add Comment */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          padding: "8px",
          borderRadius: "8px",
        }}
      >
        <Avatar sx={{ backgroundColor: "var(--primary-color)", color: "#fff" }}>
          {media?.title?.charAt(0).toUpperCase()}
        </Avatar>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            marginLeft: "16px",
            backgroundColor: "#fff",
            borderRadius: "4px",
            input: { color: "#000" },
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: "16px",
            backgroundColor: "var(--primary-color) !important",
            color: "#fff",
            "&:hover": { backgroundColor: "#cc0e1f" },
          }}
          onClick={handleAddComment}
          disabled={!comment.trim()}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default MediaDetails;
