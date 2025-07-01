import React from 'react';

const ModeSelector = ({ currentMode, onModeChange, isRunning, isDark }) => {
  const modes = [
    { key: 'pomodoro', label: 'Pomodoro', color: 'red' },
    { key: 'shortBreak', label: 'Short Break', color: 'green' },
    { key: 'longBreak', label: 'Long Break', color: 'blue' }
  ];

  const getButtonClasses = (mode, color) => {
    const isActive = currentMode === mode;
    const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105";
    
    if (isActive) {
      const activeColors = {
        red: 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg',
        green: 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg',
        blue: 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
      };
      return `${baseClasses} ${activeColors[color]}`;
    }
    
    return `${baseClasses} ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`;
  };

  return (
    <div className="flex justify-center mb-8">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-50'} p-2 rounded-2xl flex gap-2`}>
        {modes.map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => !isRunning && onModeChange(key)}
            disabled={isRunning}
            className={`${getButtonClasses(key, color)} ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelector;