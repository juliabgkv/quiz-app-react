import { useContext, useEffect, useState, useCallback } from "react";
import { QuizSettingsContext } from "../store/quiz-settings-context";
import Question from "./Question";
import QuizCompleted from "./QuizCompleted";
import HomeButton from "./HomeButton";
import "./Quiz.css";

function Quiz({ onBackHome }) {
  const [isLoading, setIsLoading] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState(null);
  const [quizIsComplete, setQuizIsComplete] = useState(false);

  const { settings } = useContext(QuizSettingsContext);

  const activeQuestionIndex = userAnswers.length;

  async function fetchQuestions() {
    setIsLoading(true);
    let apiUrl = `https://opentdb.com/api.php?amount=${settings.questionQuantity}`;

    if (settings.category !== "any") {
      apiUrl = apiUrl.concat(`&category=${settings.category}`);
    }

    if (settings.difficulty !== "any") {
      apiUrl = apiUrl.concat(`&difficulty=${settings.difficulty}`);
    }

    if (settings.type !== "any") {
      apiUrl = apiUrl.concat(`&type=${settings.type}`);
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
          throw new Error("Too many requests. Try Later!");
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (!quizIsComplete) {
      fetchQuestions();
    }
  }, [settings, quizIsComplete]);

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

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && questions && !quizIsComplete && (
        <>
          <div>
            Question {activeQuestionIndex + 1} of {questions.length}
          </div>
          <Question
            key={activeQuestionIndex}
            questionIndex={activeQuestionIndex}
            questions={questions}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer={handleSkipAnswer}
          />
          <HomeButton onBackHome={onBackHome}>End Quiz</HomeButton>
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
    </>
  );
}

export default Quiz;
