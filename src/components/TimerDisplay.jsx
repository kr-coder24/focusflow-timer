import React from 'react';

const TimerDisplay = ({ time, mode, isDark }) => {
  const getModeColor = (mode) => {
    const colors = {
      pomodoro: isDark ? 'text-red-400' : 'text-red-600',
      shortBreak: isDark ? 'text-green-400' : 'text-green-600',
      longBreak: isDark ? 'text-blue-400' : 'text-blue-600'
    };
    return colors[mode];
  };

  return (
    <div className={`text-8xl md:text-9xl font-bold ${getModeColor(mode)} font-mono tracking-tight`}>
      {time}
    </div>
  );
};

export default TimerDisplay;