import { Typography } from "@mui/material";

function Header() {
  return (
    <header>
      <Typography
        variant="h1"
        sx={{
          fontSize: "4rem",
          fontWeight: "bold",
          textAlign: "center",
          mb: "1rem",
          backgroundImage: "-webkit-linear-gradient(0deg, #51ad4b 23%, #e2f230 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Trivia Quiz
      </Typography>
    </header>
  );
}

export default Header;
