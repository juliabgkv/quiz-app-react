import { useState } from "react";
import Header from "./components/Header";
import Settings from "./components/Settings";
import Quiz from "./components/Quiz";
import QuizSettingsContextProvider from "./store/quiz-settings-context";
import { createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7b8333",
      dark: "#3a3d18",
    },
  },
});

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  function handleStartQuiz() {
    setIsQuizStarted(true);
  }

  function handleEndQuiz() {
    setIsQuizStarted(false);
  }

  return (
    <QuizSettingsContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Paper sx={{ mx: "auto", my: "2rem", p: "2rem", maxWidth: 700 }}>
          <Header />
          <main style={{ width: "100%"}}>
            {!isQuizStarted && <Settings onStart={handleStartQuiz} />}
            {isQuizStarted && <Quiz onBackHome={handleEndQuiz} />}
          </main>
        </Paper>
      </ThemeProvider>
    </QuizSettingsContextProvider>
  );
}

export default App;
