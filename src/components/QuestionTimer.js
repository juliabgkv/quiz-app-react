import { useState, useEffect } from "react";
import "./QuestionTimer.module.css";

function QuestionTimer({ timeout, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(mode);

  return (
    <div>
      <progress max={timeout} min="0" value={remainingTime} className={mode}/>
      {timeout > 2000 && <div>{Math.ceil(remainingTime / 1000)} seconds left</div>}
    </div>
  );
}

export default QuestionTimer;
