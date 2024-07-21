import { useState, useEffect } from "react";

function QuestionTimer({ timeout, onTimeout, answerState }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SETTING TIMEOUT");

    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    console.log("SETTING INTERVAL");

    const interval = setInterval(() => {
      console.log("ANSWER STATE", answerState);
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <progress max={timeout} min="0" value={remainingTime} />
      <div>{Math.floor(remainingTime / 1000)} seconds left</div>
    </div>
  );
}

export default QuestionTimer;
