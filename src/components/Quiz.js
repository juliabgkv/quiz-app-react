import { useContext, useEffect, useState } from "react";
import { QuizSettingsContext } from "../store/quiz-settings-context";

function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  
  const { settings } = useContext(QuizSettingsContext);
  
  const activeQuestionIndex = userAnswer.length;

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
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, [settings]);

  return (
    <div>
      
    </div>
  );
}

export default Quiz;
