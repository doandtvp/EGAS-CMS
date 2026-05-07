"use client";
import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialSeconds: number;
  className?: string;
  prefix?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  className = "",
  prefix = "Còn lại: ",
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timerId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <span className={className}>
      {prefix}
      {formatTime(seconds)}
    </span>
  );
};

export default CountdownTimer;
