import { useContext, useEffect, useState, useCallback } from "react";
import { Box, Button, Typography } from "@mui/material";
import { QuizSettingsContext } from "../store/quiz-settings-context";
import Question from "./Question";
import QuizCompleted from "./QuizCompleted/QuizCompleted";
import LoadingSpinner from "./LoadingSpinner";
import TryAgainButton from "./TryAgainButton";

function Quiz({ onBackHome }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState(null);
  const [quizIsComplete, setQuizIsComplete] = useState(false);

  const { settings } = useContext(QuizSettingsContext);

  const activeQuestionIndex = userAnswers.length;

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    let apiUrl = `https://opentdb.com/api.php?amount=${settings.questionQuantity}`;

    if (settings.category.id !== "any") {
      apiUrl = apiUrl.concat(`&category=${settings.category.id}`);
    }

    if (settings.difficulty.id !== "any") {
      apiUrl = apiUrl.concat(`&difficulty=${settings.difficulty.id}`);
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code === 0) {
          const questions = data.results.map((question) => {
            return {
              category: question.category,
              difficulty: question.difficulty,
              question: question.question,
              answers: [question.correct_answer, ...question.incorrect_answers],
            };
          });
          setQuestions(questions);
          setIsLoading(false);
        } else if (data.response_code === 5) {
          setQuestions(undefined);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  }, [settings]);

  useEffect(() => {
    if (!quizIsComplete) {
      fetchQuestions();
    }
  }, [quizIsComplete, fetchQuestions]);

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

      if (activeQuestionIndex === questions.length - 1) {
        setQuizIsComplete(true);
      }
    },
    [activeQuestionIndex, questions]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  function handleGenerateNewQuestions() {
    setQuizIsComplete(false);
    setUserAnswers([]);
  }

  function handleTryAgain() {
    
    setIsLoading(true);
    let apiUrl = `https://opentdb.com/api.php?amount=${settings.questionQuantity}`;

    if (settings.category.id !== "any") {
      apiUrl = apiUrl.concat(`&category=${settings.category.id}`);
    }

    if (settings.difficulty.id !== "any") {
      apiUrl = apiUrl.concat(`&difficulty=${settings.difficulty.id}`);
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code === 0) {
          const questions = data.results.map((question) => {
            return {
              category: question.category,
              difficulty: question.difficulty,
              question: question.question,
              answers: [question.correct_answer, ...question.incorrect_answers],
            };
          });
          setQuestions(questions);
          setIsLoading(false);
        } else if (data.response_code === 5) {
          setQuestions(undefined);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && questions && !quizIsComplete && (
        <>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontSize: { xs: "1rem", sm: "1rem", md: "1.5rem" } }}>
              Question {activeQuestionIndex + 1} of {questions.length}
            </Typography>
            <Button sx={{ fontSize: "0.8rem" }} onClick={onBackHome}>End Quiz</Button>
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            Category: {settings.category.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Difficulty: {settings.difficulty.name}
          </Typography>
          <Question
            key={activeQuestionIndex}
            questionIndex={activeQuestionIndex}
            questions={questions}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
          />
        </>
      )}
      {quizIsComplete && (
        <QuizCompleted
          userAnswers={userAnswers}
          questions={questions}
          onGenerateNewQuestions={handleGenerateNewQuestions}
          onBackHome={onBackHome}
        />
      )}
      {!isLoading && questions === undefined && <TryAgainButton onTryAgain={handleTryAgain} />}
    </>
  );
}

export default Quiz;
