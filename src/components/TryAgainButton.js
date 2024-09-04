import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

function TryAgainButton({ onTryAgain }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(6);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsDisabled(false);
    }
  }, [timer]);

  return (
    <Box sx={{ textAlign: "center" }}>
      {
        <Typography variant="body1">
          Too many requests! You've reached the maximum number of requests
          allowed in a short period of time. Please wait a few seconds before
          trying again.
        </Typography>
      }
      <Button variant="contained" sx={{ mt: 3, mb: 1 }} disabled={isDisabled} onClick={onTryAgain}>
        Try Again
      </Button>
      {timer > 0 && (
        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>Will be able in ... {timer} seconds</Typography>
      )}
    </Box>
  );
}

export default TryAgainButton;
