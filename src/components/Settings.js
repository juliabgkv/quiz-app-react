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
  TYPES,
} from "../quiz-settings-options";
import SelectOption from "./SelectOption";
import { QuizSettingsContext } from "../store/quiz-settings-context";
import LoadingSpinner from "./LoadingSpinner";

function Settings({ onStart }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const {
    settings,
    changeCategory,
    changeDifficulty,
    changeType,
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

  function handleChangeQuestionsQuantity(e) {
    if (!e.target.value) {
      setQuantityError("Questions quantity can`t be empty");
    } else if (e.target.value > 50 || e.target.value < 1) {
      setQuantityError("Questions quantity must be between 1 and 50");
    } else if (e.target.value <= 50 && e.target.value > 0) {
      setQuantityError("");
    }

    changeQuestionsQuantity(e.target.value);
  }

  function handleOnClick() {
    if (settings.questionQuantity <= 50 && settings.questionQuantity > 0) {
      onStart();
    } else {
      setAlertMessage("Please, enter correct number of questions!");
    }
  }

  return (
    <>
      {alertMessage !== "" && (
        <Alert severity="error">{alertMessage}</Alert>
      )}
      {!loading && (
        <Box>
          {categories && (
            <SelectOption
              title="Select Category:"
              options={categories}
              selectedOption={JSON.stringify(settings.category)}
              onChange={changeCategory}
            />
          )}
          <SelectOption
            title="Select Difficulty:"
            options={DIFFICULTIES}
            selectedOption={JSON.stringify(settings.difficulty)}
            onChange={changeDifficulty}
          />
          <SelectOption
            title="Select Type:"
            options={TYPES}
            selectedOption={JSON.stringify(settings.type)}
            onChange={changeType}
          />
          <FormGroup sx={{ mb: "1rem" }}>
            <FormLabel id="timer">Number of Questions:</FormLabel>
            <TextField
              variant="outlined"
              type="number"
              min="1"
              max="50"
              value={settings.questionQuantity}
              onChange={handleChangeQuestionsQuantity}
              error={quantityError.length > 0}
              helperText={quantityError}
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
            onClick={handleOnClick}
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
