import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import MediaCard from "../components/MediaCard";
import { Skeleton, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { fetchMedias } from "../services/api";
import MediaTabs from "../components/MediaTabs";

const HomePage = () => {
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMedias = async () => {
      try {
        const medias = await fetchMedias();
        setMediaData(medias);
      } catch (error) {
        setError("Failed to load medias");
        console.error("Error loading medias:", error);
      } finally {
        setLoading(false);
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
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 3, md: 3 }}>
                <Box sx={{ width: "100%", padding: 2 }}>
                  <Skeleton variant="rectangular" width="100%" height={180} />
                  <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
                  <Skeleton variant="text" width="60%" />
                </Box>
              </Grid>
            ))
          : mediaData.slice(0, 4).map((media) => (
              <Grid key={media.id} size={{ xs: 12, sm: 3, md: 3 }}>
                <MediaCard media={media} loading={loading} />
              </Grid>
            ))}
      </Grid>
      <MediaTabs mediaData={mediaData} />
    </div>
  );
};

export default HomePage;
