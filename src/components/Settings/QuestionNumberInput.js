import { useContext } from "react";
import { FormGroup, FormLabel, TextField } from "@mui/material";
import { QuizSettingsContext } from "../../store/quiz-settings-context";

function QuestionNumberInput({ quantityMaxCount }) {
  const { settings, changeQuestionsQuantity } = useContext(QuizSettingsContext);

  const isQuantityError =
    quantityMaxCount < settings.questionQuantity ||
    settings.questionQuantity < 1;

  return (
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
  );
}

export default QuestionNumberInput;
