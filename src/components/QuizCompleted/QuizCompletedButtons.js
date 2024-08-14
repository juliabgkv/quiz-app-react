import { Stack, Button } from "@mui/material";
import HomeButton from "../HomeButton";

function QuizCompletedButtons({ onGenerateNewQuestions, onBackHome }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ width: "100%", mb: 4 }}
      justifyContent="center"
    >
      <Button variant="contained" onClick={onGenerateNewQuestions}>
        Generate New Questions
      </Button>
      <HomeButton onBackHome={onBackHome}>Back Home</HomeButton>
    </Stack>
  );
}

export default QuizCompletedButtons;
