import React from 'react';

const ProgressBar = ({ progress, mode }) => {
  const getModeColor = (mode) => {
    const colors = {
      pomodoro: 'from-red-500 to-pink-600',
      shortBreak: 'from-green-500 to-emerald-600',
      longBreak: 'from-blue-500 to-indigo-600'
    };
    return colors[mode];
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r ${getModeColor(mode)} transition-all duration-1000 ease-out rounded-full`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;