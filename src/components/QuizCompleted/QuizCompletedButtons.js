import { Stack, Button } from "@mui/material";

function QuizCompletedButtons({ onGenerateNewQuestions, onBackHome }) {
  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        mb: 4,
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row", gap: "1rem" },
      }}
      justifyContent="center"
    >
      <Button variant="contained" onClick={onGenerateNewQuestions}>
        Generate New Questions
      </Button>
      <Button onClick={onBackHome} variant="outlined">
        Back Home
      </Button>
    </Stack>
  );
}

export default QuizCompletedButtons;
