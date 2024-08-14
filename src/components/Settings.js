import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormGroup,
  FormLabel,
  Input,
  MenuItem,
  Select,
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

  return (
    <>
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
            <FormLabel id="questions-quantity">Number of Questions:</FormLabel>
            <Input
              type="number"
              value={settings.questionQuantity}
              min="1"
              max="50"
              onChange={(e) => changeQuestionsQuantity(e.target.value)}
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
            onClick={onStart}
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
