import HomeButton from "./HomeButton";

function QuizCompleted({ userAnswers, questions, onGenerateNewQuestions, onBackHome }) {
  const answersCount = userAnswers.reduce(
    (count, answer, index) => {
      if (answer === questions[index].answers[0]) {
        return { ...count, correct: count.correct + 1 };
      } else if (answer === null) {
        return { ...count, skipped: count.skipped + 1 };
      } else if (answer !== questions[index].answers[0]) {
        return { ...count, wrong: count.wrong + 1 };
      }
    },
    { correct: 0, wrong: 0, skipped: 0 }
  );

  let message = "";
  if (userAnswers.length === answersCount.correct) {
    message = "Brilliant!!!";
  } else if (answersCount.correct === 0) {
    message = "Oh, maybe you`ll should try another theme?";
  } else if (answersCount.correct > userAnswers.length / 2) {
    message = "Good job!";
  } else if (answersCount.correct < userAnswers.length / 2) {
    message = "Good!";
  }

  return (
    <div>
      <h2>Quiz is completed</h2>
      <p>{message}</p>
      <div>
        <div>
          <div>{answersCount.correct}</div>
          <div>Correct</div>
        </div>
        <div>
          <div>{answersCount.wrong}</div>
          <div>Wrong</div>
        </div>
        <div>
          <div>{answersCount.skipped}</div>
          <div>Skipped</div>
        </div>
      </div>
      <button onClick={onGenerateNewQuestions}>Generate New Questions</button>
      <HomeButton onBackHome={onBackHome}>Home</HomeButton>
      <ol>
        {questions.map((question, index) => {
          const isCorrectAnswer =
            userAnswers[index] === questions[index].answers[0];

          return (
            <li key={question.question}>
              <h4>{question.question}.</h4>
              {userAnswers[index] && (
                <p style={{ color: isCorrectAnswer ? "black" : "red" }}>
                  {userAnswers[index]}
                </p>
              )}
              {!userAnswers[index] && <p style={{ color: "grey" }}>Skipped</p>}
              {!isCorrectAnswer && <p>{questions[index].answers[0]}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default QuizCompleted;
