import { Box, Typography } from "@mui/material";

function Header() {
  return (
    <Box component="header" sx={{ mb: 5 }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "3rem", sm: "3.5rem", md: "4rem" },
          fontWeight: "bold",
          textAlign: "center",
          backgroundImage: "-webkit-linear-gradient(0deg, #51ad4b 23%, #e2f230 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Trivia Quiz
      </Typography>
    </Box>
  );
}

export default Header;
