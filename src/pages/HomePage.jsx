import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MediaCard from "../components/MediaCard";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { fetchMedias } from "../services/api";
import videos from "../data/videos";
import MediaTabs from "../components/MediaTabs";

const HomePage = () => {
  const [mediaData, setMediaData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMedias = async () => {
      try {
        const medias = await fetchMedias();
        setMediaData(medias);
      } catch (error) {
        setError("Failed to load medias");
        console.error("Error loading medias:", error);
      }
    };

    loadMedias();
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: 4 }}
      >
        <Grid size={12} marginTop={4}>
          <h2>Most Views</h2>
        </Grid>
        {mediaData.slice(0, 4).map((media) => (
          <Grid key={media.id} size={{ xs: 12, sm: 3, md: 3 }}>
            <MediaCard media={media} />
          </Grid>
        ))}
      </Grid>
      <MediaTabs mediaData={mediaData} />
    </div>
  );
};

export default HomePage;
