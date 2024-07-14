import { createContext, useReducer } from "react";
import { DIFFICULTIES, TYPES } from "../quiz-settings-options";

const INIT_SETTINGS = {
  category: "any",
  difficulty: DIFFICULTIES[0].id,
  type: TYPES[0].id,
  questionQuantity: 10,
};

export const QuizSettingsContext = createContext({
  settings: null,
  changeCategory: () => {},
  changeDifficulty: () => {},
  changeType: () => {},
  changeQuestionsQuantity: () => {},
});

function settingsReducer(state, action) {
  switch (action.type) {
    case "CATEGORY": {
      return {
        ...state,
        category: action.payload,
      };
    }
    case "DIFFICULTY": {
      return {
        ...state,
        difficulty: action.payload,
      };
    }
    case "TYPE": {
      return {
        ...state,
        type: action.payload,
      };
    }
    case "QUANTITY": {
      return {
        ...state,
        questionQuantity: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default function QuizSettingsContextProvider({ children }) {
  const [settingsState, settingsDispatch] = useReducer(
    settingsReducer,
    INIT_SETTINGS
  );

  function handleChangeCategory(category) {
    settingsDispatch({
      type: "CATEGORY",
      payload: category,
    });
  }

  function handleChangeDifficulty(difficulty) {
    settingsDispatch({
      type: "DIFFICULTY",
      payload: difficulty,
    });
  }

  function handleChangeType(type) {
    settingsDispatch({
      type: "TYPE",
      payload: type,
    });}

  function handleChangeQuestionsQuantity(quantity) {
    settingsDispatch({
      type: "QUANTITY",
      payload: quantity,
    });}

  const ctxValue = {
    settings: settingsState,
    changeCategory: handleChangeCategory,
    changeDifficulty: handleChangeDifficulty,
    changeType: handleChangeType,
    changeQuestionsQuantity: handleChangeQuestionsQuantity,
  };

  return (
    <QuizSettingsContext.Provider value={ctxValue}>
      {children}
    </QuizSettingsContext.Provider>
  );
}
