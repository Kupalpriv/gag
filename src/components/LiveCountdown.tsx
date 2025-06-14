import React, { useState, useEffect } from 'react';
import { parseCountdown } from '../utils/timeUtils';

interface LiveCountdownProps {
  countdown: string;
}

export const LiveCountdown: React.FC<LiveCountdownProps> = ({ countdown }) => {
  const [timeLeft, setTimeLeft] = useState(parseCountdown(countdown));

  useEffect(() => {
    setTimeLeft(parseCountdown(countdown));
  }, [countdown]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return prev;
        }

        let newSeconds = prev.seconds - 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        if (newHours < 0) {
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <span className="font-mono">
      {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
    </span>
  );
};