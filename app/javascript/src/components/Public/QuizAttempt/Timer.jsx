import React, { useState, useEffect, useRef } from "react";

import { Typography } from "neetoui";

const Timer = ({
  totalTimeInMinutes = 1,
  onTimerEnd = () => {},
  callbackIntervalInSeconds = 0,
  onFixedInterval = () => {},
}) => {
  const [timeRemaining, setTimeRemaining] = useState(totalTimeInMinutes * 60);
  const timerRef = useRef(null);

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}
      :${String(minutes).padStart(2, "0")}
      :${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timeRemaining <= 0) {
      clearInterval(timerRef.current);
      onTimerEnd();
    } else {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;

          if (
            callbackIntervalInSeconds > 0 &&
            newTime % callbackIntervalInSeconds === 0
          ) {
            onFixedInterval(newTime);
          }

          if (newTime <= 0) {
            clearInterval(timerRef.current);
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [timeRemaining]);

  return (
    <div className="bg rounded-md bg-gray-100 p-3">
      <Typography>{formatTime(timeRemaining)}</Typography>
    </div>
  );
};

export default Timer;
