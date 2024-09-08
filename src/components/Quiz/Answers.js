import { useRef } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { answeredColor, primaryColor, wrongColor } from "../../helpers/colors";

function Answers({ answers, selectedAnswer, answerState, onSelect }) {
  const shuffeledAnswers = useRef();

  if (!shuffeledAnswers.current) {
    shuffeledAnswers.current = [...answers];
    shuffeledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <Stack spacing={1}>
      {shuffeledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let bgColor = "";

        if (isSelected) {
          if (answerState === "answered") bgColor = answeredColor;
          if (answerState === "correct") bgColor = primaryColor;
          if (answerState === "wrong") bgColor = wrongColor;
        }

        return (
          <Button
            key={answer}
            fullWidth
            variant="outlined"
            onClick={() => onSelect(answer)}
            disabled={answerState !== ""}
            sx={{ backgroundColor: `${bgColor} !important` }}
          >
            <Typography
              sx={{ m: 1, color: "text.primary" }}
              dangerouslySetInnerHTML={{ __html: answer }}
            ></Typography>
          </Button>
        );
      })}
    </Stack>
  );
}

export default Answers;
