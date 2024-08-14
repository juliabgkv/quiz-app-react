import { useRef } from "react";
import { Button, Stack, Typography } from "@mui/material";

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
          if (answerState === "answered") bgColor = "#FEAC38";
          if (answerState === "correct") bgColor = "#7B8333";
          if (answerState === "wrong") bgColor = "#90090C";
        }

        return (
          <Button
            key={answer}
            fullWidth
            variant="outlined"
            onClick={() => onSelect(answer)}
            disabled={answerState !== ""}
            sx={{ backgroundColor: bgColor }}
          >
            <Typography
              sx={{ m: 1, color: "white" }}
              dangerouslySetInnerHTML={{ __html: answer }}
            ></Typography>
          </Button>
        );
      })}
    </Stack>
  );
}

export default Answers;
