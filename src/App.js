import { useEffect, useState } from "react";
import QuizSettingsContextProvider from "./store/quiz-settings-context";
import { createTheme, CssBaseline, Paper, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import Settings from "./components/Settings/Settings";
import Quiz from "./components/Quiz/Quiz";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f0f0f0",
      paper: "#ffffff",
    },
    primary: {
      main: "#7b8333",
      dark: "#666c2b",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7b8333",
      dark: "#3a3d18",
    },
  },
});

const theme = JSON.parse(localStorage.getItem("quizIsDarkTheme")) || false;

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(theme);

  useEffect(() => {
    localStorage.setItem("quizIsDarkTheme", isDarkTheme);
  }, [isDarkTheme]);

  function handleStartQuiz() {
    setIsQuizStarted(true);
  }

  function handleEndQuiz() {
    setIsQuizStarted(false);
  }

  function handleToggleTheme() {
    setIsDarkTheme((prevState) => !prevState);
  }

  return (
    <QuizSettingsContextProvider>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <Header isDarkTheme={isDarkTheme} onToggleTheme={handleToggleTheme} />
        <Paper
          sx={{
            mx: "auto",
            my: "2rem",
            p: { xs: "1rem", sm: "1.5rem", md: "2rem" },
            maxWidth: 700,
          }}
        >
          {!isQuizStarted && <Settings onStart={handleStartQuiz} />}
          {isQuizStarted && <Quiz onBackHome={handleEndQuiz} />}
        </Paper>
      </ThemeProvider>
    </QuizSettingsContextProvider>
  );
}

export default App;
