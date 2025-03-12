import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fetchMedias } from "../../services/api";
import { Box } from "@mui/material";

const ViewCards = () => {
  const categories = ["videos", "images", "movies"];
  const [categoryCounts, setCategoryCounts] = useState([]);

  useEffect(() => {
    const loadMedias = async () => {
      try {
        const medias = await fetchMedias();
        const counts = categories.map((category) => ({
          category,
          count: medias.filter((media) => media.category === category).length,
        }));
        setCategoryCounts(counts);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    loadMedias();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
        Media Overview
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {categoryCounts.map(({ category, count }) => (
          <Grid item xs={12} sm={6} md={4} key={category}>
            <Card
              sx={{
                borderRadius: "16px",
                textAlign: "center",
                height: "12rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                  filter: "brightness(1.1)",
                },
                background:
                  "linear-gradient(135deg, rgb(255, 14, 31) 0%, rgb(200, 0, 20) 100%)",
                color: "white",
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  {category.toUpperCase()}
                </Typography>
                <Typography variant="h4" fontWeight="bold" mt={1}>
                  {count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ViewCards;
