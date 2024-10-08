import { useState, useEffect } from "react";
import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from "@mui/material";
import { primaryColor, wrongColor } from "../../helpers/colors";

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

  const progress = Math.ceil((remainingTime / timeout) * 100);

  let bgColor = primaryColor;
  if (mode === "wrong") bgColor = wrongColor;

  return (
    <Box sx={{ mt: 2 }}>
      <LinearProgress
        value={progress}
        variant="determinate"
        sx={{
          borderRadius: 5,
          [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: bgColor,
          },
        }}
      />
      <Box sx={{ height: 24, textAlign: "center" }}>
        {timeout > 2000 && (
          <Typography variant="caption" color="text.secondary">
            {Math.ceil(remainingTime / 1000)} seconds left
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default QuestionTimer;
