import { useContext, useEffect, useState, useCallback } from "react";
import { QuizSettingsContext } from "../store/quiz-settings-context";
import Question from "./Question";
import "./Quiz.css";

function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState(null);

  const { settings } = useContext(QuizSettingsContext);

  const activeQuestionIndex = userAnswers.length;

  let quizIsComplete = false;

  if (questions && activeQuestionIndex === questions.length) {
    quizIsComplete = true;
  }

  useEffect(() => {
    console.log("FETCHING QUESTIONS");
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
        } else if (data.response_code === 5) {
          throw new Error("Too many requests. Try Later!");
        }
      })
      .catch((error) => console.error(error));
  }, [settings]);

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(() => {
    handleSelectAnswer(null);
  }, [handleSelectAnswer]);

  if (quizIsComplete) {
    return (
      <div>
        <h2>Quiz is completed</h2>
      </div>
    );
  }

  return (
    <>
      {questions && (
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
        </>
      )}
    </>
  );
}

export default Quiz;
