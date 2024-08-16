import { Box, FormControlLabel, Switch, Typography } from "@mui/material";

function Header({ onToggleTheme }) {
  return (
    <Box
      component="header"
      sx={{
        mt: 5,
        mb: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "3rem", sm: "3.5rem", md: "4rem" },
          fontWeight: "bold",
          textAlign: "center",
          backgroundImage:
            "-webkit-linear-gradient(0deg, #51ad4b 23%, #e2f230 90%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Trivia Quiz
      </Typography>
      <FormControlLabel
        sx={{ fontSize: "0.8rem", color: "text.secondary", mt: 2 }}
        control={
          <Switch size="small" onChange={onToggleTheme} sx={{ mr: 1 }}></Switch>
        }
        label="Dark Theme"
      />
    </Box>
  );
}

export default Header;
