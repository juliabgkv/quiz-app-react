import { createContext, useReducer } from "react";
import {
  DEFAULT_CATEGORY,
  DIFFICULTIES,
  TIMERS,
  TYPES,
} from "../quiz-settings-options";

const SETTINGS_TITLES = {
  CATEGORY: "CATEGORY",
  DIFFICULTY: "DIFFICULTY",
  TYPE: "TYPE",
  QUANTITY: "QUANTITY",
  TIMER: "TIMER"
};

const INIT_SETTINGS = {
  category: DEFAULT_CATEGORY,
  difficulty: DIFFICULTIES[0],
  type: TYPES[0],
  questionQuantity: 10,
  timer: TIMERS[0],
};

export const QuizSettingsContext = createContext({
  settings: null,
  changeCategory: () => {},
  changeDifficulty: () => {},
  changeType: () => {},
  changeQuestionsQuantity: () => {},
  handleChangeTimer: () => {}
});

function settingsReducer(state, action) {
  switch (action.type) {
    case SETTINGS_TITLES.CATEGORY: {
      return {
        ...state,
        category: action.payload,
      };
    }
    case SETTINGS_TITLES.DIFFICULTY: {
      return {
        ...state,
        difficulty: action.payload,
      };
    }
    case SETTINGS_TITLES.TYPE: {
      return {
        ...state,
        type: action.payload,
      };
    }
    case SETTINGS_TITLES.QUANTITY: {
      return {
        ...state,
        questionQuantity: action.payload,
      };
    }
    case SETTINGS_TITLES.TIMER: {
      return {
        ...state,
        timer: action.payload,
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
    });
  }

  function handleChangeQuestionsQuantity(quantity) {
    settingsDispatch({
      type: "QUANTITY",
      payload: quantity,
    });
  }

  function handleChangeTimer(time) {
    settingsDispatch({
      type: "TIMER",
      payload: time,
    });
  }

  const ctxValue = {
    settings: settingsState,
    changeCategory: handleChangeCategory,
    changeDifficulty: handleChangeDifficulty,
    changeType: handleChangeType,
    changeQuestionsQuantity: handleChangeQuestionsQuantity,
    changeTimer: handleChangeTimer
  };

  return (
    <QuizSettingsContext.Provider value={ctxValue}>
      {children}
    </QuizSettingsContext.Provider>
  );
}
