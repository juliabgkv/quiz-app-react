import { useContext } from "react";
import { Box } from "@mui/material";
import { QuizSettingsContext } from "../../store/quiz-settings-context";
import RightAnswers from "./RightAnswers";
import Counters from "./Counters";
import QuizCompletedButtons from "./QuizCompletedButtons";
import QuizCompletedHeader from "./QuizCompletedHeader";

function QuizCompleted({
  userAnswers,
  questions,
  onGenerateNewQuestions,
  onBackHome,
}) {
  const answersCount = userAnswers.reduce(
    (count, answer, index) => {
      if (answer === questions[index].answers[0]) {
        return { ...count, correct: count.correct + 1 };
      } else if (answer === null) {
        return { ...count, skipped: count.skipped + 1 };
      } else if (answer !== questions[index].answers[0]) {
        return { ...count, wrong: count.wrong + 1 };
      }

      return count;
    },
    { correct: 0, wrong: 0, skipped: 0 }
  );

  const { settings } = useContext(QuizSettingsContext);

  return (
    <Box sx={{ textAlign: "center" }}>
      <QuizCompletedHeader
        userAnswers={userAnswers}
        answersCount={answersCount}
      />
      {settings.timer > 0 && <Counters answersCount={answersCount} />}
      <QuizCompletedButtons
        onGenerateNewQuestions={onGenerateNewQuestions}
        onBackHome={onBackHome}
      />
      <RightAnswers questions={questions} userAnswers={userAnswers} />
    </Box>
  );
}

export default QuizCompleted;
