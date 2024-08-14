import { useContext, useState } from "react";
import { QuizSettingsContext } from "../store/quiz-settings-context";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import { Box, Typography } from "@mui/material";

function Question({ questionIndex, questions, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  const { settings } = useContext(QuizSettingsContext);

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  let timer = settings.timer * 1000;

  if (answerState.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: questions[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  return (
    <Box>
      <Typography variant="h4"
        sx={{ my: 2 }}
        dangerouslySetInnerHTML={{ __html: questions[questionIndex].question }}
      ></Typography>
      <Answers
        answers={questions[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
      {settings.timer > 0 && 
        <QuestionTimer
          key={timer}
          timeout={timer}
          onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
          mode={answerState}
        />
      }
    </Box>
  );
}

export default Question;
