import { useContext, useEffect, useState } from "react";
import Select from "./Select";
import { QuizSettingsContext } from "../store/quiz-settings-context";
import {
  DEFAULT_CATEGORY,
  DIFFICULTIES,
  TYPES,
} from "../quiz-settings-options";

function Settings({ onStart }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(null);
  const {
    settings,
    changeCategory,
    changeDifficulty,
    changeType,
    changeQuestionsQuantity,
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
        <div>
          {categories && (
            <Select
              title="Select Category:"
              options={categories}
              selectedOption={JSON.stringify(settings.category)}
              onChange={changeCategory}
            />
          )}
          <Select
            title="Select Difficulty:"
            options={DIFFICULTIES}
            selectedOption={JSON.stringify(settings.difficulty)}
            onChange={changeDifficulty}
          />
          <Select
            title="Select Type:"
            options={TYPES}
            selectedOption={JSON.stringify(settings.type)}
            onChange={changeType}
          />
          <div>
            <h2>Number of Questions:</h2>
            <input
              type="number"
              value={settings.questionQuantity}
              min="1"
              max="50"
              onChange={(e) => changeQuestionsQuantity(e.target.value)}
            />
          </div>
          <button onClick={onStart}>Start Quiz</button>
        </div>
      )}
    </>
  );
}

export default Settings;
