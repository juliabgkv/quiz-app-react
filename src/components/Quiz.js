import { useContext, useEffect, useState } from "react";
import { QuizSettingsContext } from "../store/quiz-settings-context";

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
        if (data.response_code === 0) {
          const questions = data.results.map((question) => {
            return {
              category: question.category,
              difficulty: question.difficulty,
              question: question.question,
              answers: [question.correct_answer, ...question.incorrect_answers],
            };
          });
          console.log(data);
          console.log(questions);
          setQuestions(questions);
        }
      })
      .catch((error) => console.error(error));
  }, [settings]);

  function handleSelectAnswer(selectedAnswer) {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  }

  if (quizIsComplete) {
    console.log('quizIsComplete');
    return <div>
      <h2>Quiz is completed</h2>
    </div>;
  }

  let shuffeledAnswers = [];

  if (questions) {
    shuffeledAnswers = [...questions[activeQuestionIndex].answers];
    shuffeledAnswers.sort(() => Math.random() - 0.5);
  }

  return (
    <>
      {questions && (
        <div>
          <h2>{questions[activeQuestionIndex].question.toString()}</h2>
          <ul>
            {shuffeledAnswers.map((answer) => (
              <li key={answer}>
                <button onClick={() => handleSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Quiz;
