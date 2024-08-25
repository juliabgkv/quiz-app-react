import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  DEFAULT_CATEGORY,
  DIFFICULTIES,
  TIMERS,
} from "../quiz-settings-options";
import SelectOption from "./SelectOption";
import { QuizSettingsContext } from "../store/quiz-settings-context";
import LoadingSpinner from "./LoadingSpinner";

const DEFAULT_QUESTIONS_COUT = 50;

function Settings({ onStart }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [quantityMaxCount, setQuantityMaxCount] = useState(
    DEFAULT_QUESTIONS_COUT
  );
  const {
    settings,
    changeCategory,
    changeDifficulty,
    changeQuestionsQuantity,
    changeTimer,
  } = useContext(QuizSettingsContext);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) => {
        const categories = [DEFAULT_CATEGORY, ...data.trivia_categories];

        setCategories(categories);
        setLoading(false);
      });
  }, []);

  function handleChangeCategory(category) {
    changeCategory(category);
    setAlertMessage("");
    setQuantityMaxCount(DEFAULT_QUESTIONS_COUT);
  }

  function handleChangeDifficulty(difficulty) {
    changeDifficulty(difficulty);
    setAlertMessage("");
    setQuantityMaxCount(DEFAULT_QUESTIONS_COUT);
  }

  function handleOnStart() {
    if (settings.category.id !== "any") {
      fetch(
        `https://opentdb.com/api_count.php?category=${settings.category.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (settings.difficulty.id === "any") {
            return data.category_question_count[`total_question_count`];
          } else {
            return data.category_question_count[
              `total_${settings.difficulty.id}_question_count`
            ];
          }
        })
        .then((count) => {
          if (
            settings.questionQuantity <= count &&
            settings.questionQuantity > 0
          ) {
            onStart();
          } else {
            setQuantityMaxCount(count);
            setAlertMessage("Please, enter correct number of questions!");
          }
        });
    } else {
      if (settings.questionQuantity <= 50 && settings.questionQuantity > 0) {
        onStart();
      } else {
        setAlertMessage("Please, enter correct number of questions!");
      }
    }
  }

  const isQuantityError =
    quantityMaxCount < settings.questionQuantity ||
    settings.questionQuantity < 1;

  return (
    <>
      {alertMessage !== "" && <Alert severity="error">{alertMessage}</Alert>}
      {!loading && (
        <Box>
          {categories && (
            <SelectOption
              title="Select Category:"
              options={categories}
              selectedOption={JSON.stringify(settings.category)}
              onChange={handleChangeCategory}
            />
          )}
          <SelectOption
            title="Select Difficulty:"
            options={DIFFICULTIES}
            selectedOption={JSON.stringify(settings.difficulty)}
            onChange={handleChangeDifficulty}
          />
          <FormGroup sx={{ mb: "1rem" }}>
            <FormLabel id="timer">Number of Questions:</FormLabel>
            <TextField
              variant="outlined"
              type="number"
              min="1"
              max={quantityMaxCount}
              value={settings.questionQuantity}
              onChange={(e) => changeQuestionsQuantity(e.target.value)}
              error={isQuantityError}
              helperText={
                isQuantityError &&
                `Questions quantity must be between 1 and ${quantityMaxCount}`
              }
              fullWidth
            />
          </FormGroup>
          <FormGroup sx={{ mb: "1rem" }}>
            <FormLabel id="timer">Timer (in seconds):</FormLabel>
            <Select
              labelId="timer"
              value={settings.timer}
              onChange={(e) => changeTimer(e.target.value)}
            >
              {TIMERS.map((timer) => (
                <MenuItem key={`timer-${timer}`} value={timer}>
                  {timer > 0 ? timer : "No Timer"}
                </MenuItem>
              ))}
            </Select>
          </FormGroup>
          <Button
            variant="contained"
            sx={{ p: "15px" }}
            fullWidth
            type="submit"
            onClick={handleOnStart}
          >
            Start Quiz
          </Button>
        </Box>
      )}
      {loading && <LoadingSpinner />}
    </>
  );
}

export default Settings;
