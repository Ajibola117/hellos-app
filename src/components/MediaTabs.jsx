import React, { useState } from "react";
import { Tabs, Tab, Box, Pagination, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"; 
import MediaCard from "./MediaCard";

const MediaTabs = ({ mediaData }) => {
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  // Filter media based on selected tab
  const filteredMedia =
    tab === "all"
      ? mediaData
      : mediaData.filter((media) => media.category === tab);

  // Paginate media
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedMedia = filteredMedia.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Box sx={{ width: "100%", textAlign: "center", marginTop: 4 }}>
      {/* Tabs with Custom Styling */}
      <Tabs
        value={tab}
        onChange={(e, newValue) => {
          setTab(newValue);
          setPage(1); // Reset to first page when tab changes
        }}
        centered
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "var(--primary-color)", // Active tab indicator
          },
          "& .MuiTab-root": {
            color: "var(--secondary-color)", // Default tab color
            transition: "0.3s",
          },
          "& .Mui-selected": {
            color: "var(--primary-color)", // Active tab color
            fontWeight: "bold",
          },
          "& .MuiTab-root:hover": {
            color: "var(--primary-color)", // Hover effect
          },
        }}
      >
        <Tab label="All" value="all" />
        <Tab label="Videos" value="videos" />
        <Tab label="Movies" value="movies" />
        <Tab label="Images" value="images" />
      </Tabs>

      {/* Show No Media Message if Empty */}
      {filteredMedia.length === 0 ? (
        <Typography variant="h6" sx={{ marginTop: 3, color: "gray" }}>
          No media available
        </Typography>
      ) : (
        <>
          {/* Media Grid */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
            {paginatedMedia.map((media) => (
              <Grid key={media.id} size={{ xs: 12, sm: 3, md: 3 }}>
                <MediaCard media={media} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination - Hidden if No Media */}
          {filteredMedia.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(filteredMedia.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  color: "var(--secondary-color)", // Default pagination color
                },
                "& .Mui-selected": {
                  backgroundColor: "var(--primary-color) !important", // Active page color
                  color: "white",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "var(--primary-color-light)", // Hover effect
                },
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default MediaTabs;
