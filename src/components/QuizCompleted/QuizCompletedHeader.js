import { Box, Typography } from "@mui/material";
import trophyImage from "../../assets/trophy.png";

function QuizCompletedHeader({ userAnswers, answersCount }) {
  let message = "";
  if (userAnswers.length === answersCount.correct) {
    message = "Brilliant!!!";
  } else if (answersCount.correct === 0) {
    message = "Oh, maybe you should try another theme?";
  } else if (answersCount.correct > userAnswers.length / 2) {
    message = "Good job!";
  } else if (answersCount.correct <= userAnswers.length / 2) {
    message = "Good!";
  }

  return (
    <>
      <Typography variant="h5">Quiz is completed!</Typography>
      <Box
        component="img"
        sx={{
          my: 3,
          mx: "auto",
          display: "block",
          height: 100,
          width: 100,
        }}
        alt="Throphy"
        src={trophyImage}
      ></Box>
      <Typography
        variant="h5"
        sx={{ display: "inline-flex", alignItems: "center", mt: 2 }}
      >
        <Typography
          component="span"
          variant="h5"
          color="text.secondary"
          sx={{ mr: 1 }}
        >
          Score:
        </Typography>
        {answersCount.correct} / {userAnswers.length}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {message}
      </Typography>
    </>
  );
}

export default QuizCompletedHeader;
