import { Box, CircularProgress } from "@mui/material";

function LoadingSpinner() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", minHeight: 300 }}>
      <CircularProgress sx={{ mx: "auto" }} />
    </Box>
  );
}

export default LoadingSpinner;
