import Header from "./components/Header";
import Settings from "./components/Settings";
import Quiz from "./components/Quiz";
import QuizSettingsContextProvider from "./store/quiz-settings-context";
import "./App.css";
import { useState } from "react";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  function handleStartQuiz() {
    setIsQuizStarted(true);
  }

  return (
    <QuizSettingsContextProvider>
      <Header />
      <main>
        {!isQuizStarted && <Settings onStart={handleStartQuiz} />}
        {isQuizStarted && <Quiz />}
      </main>
    </QuizSettingsContextProvider>
  );
}

export default App;
