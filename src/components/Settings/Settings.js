import { useContext, useEffect, useState } from "react";
import { Alert, Box, Button } from "@mui/material";
import {
  DEFAULT_CATEGORY,
  DIFFICULTIES,
  TIMERS,
} from "../../helpers/quiz-settings-options";
import SelectOption from "./SelectOption";
import { QuizSettingsContext } from "../../store/quiz-settings-context";
import LoadingSpinner from "../LoadingSpinner";
import QuestionNumberInput from "./QuestionNumberInput";
import { API_URL } from "../../helpers/api";

const DEFAULT_QUESTIONS_COUT = 50;

function Settings({ onStart }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [quantityMaxCount, setQuantityMaxCount] = useState(
    DEFAULT_QUESTIONS_COUT
  );
  const { settings, changeCategory, changeDifficulty, changeTimer } =
    useContext(QuizSettingsContext);

  useEffect(() => {
    fetch(`${API_URL}api_category.php`)
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

  function handleChangeTimer(time) {
    changeTimer(time);
  }

  function handleOnStart() {
    if (settings.category.id !== "anyCategory") {
      fetch(
        `https://opentdb.com/api_count.php?category=${settings.category.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (settings.difficulty.id === "anyDifficulty") {
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
          <QuestionNumberInput quantityMaxCount={quantityMaxCount} />
          <SelectOption
            title="Timer (in seconds):"
            options={TIMERS}
            selectedOption={JSON.stringify(settings.timer)}
            onChange={handleChangeTimer}
          />
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
