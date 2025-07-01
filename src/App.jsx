import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Settings, Quote, Sun, Moon } from 'lucide-react';
import TimerDisplay from './components/TimerDisplay';
import ModeSelector from './components/ModeSelector';
import QuoteCard from './components/QuoteCard';
import ProgressBar from './components/ProgressBar';
import { useTimer } from './hooks/useTimer';
import { useQuotes } from './hooks/useQuotes';
import { useTheme } from './hooks/useTheme';

function App() {
  const {
    mode,
    isRunning,
    timeLeft,
    sessions,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode
  } = useTimer();

  const { currentQuote, fetchNewQuote } = useQuotes();
  const { isDark, toggleTheme } = useTheme();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getModeConfig = (mode) => {
    const configs = {
      pomodoro: { 
        label: 'Focus Time', 
        color: 'from-red-500 to-pink-600',
        bgColor: isDark ? 'bg-gradient-to-br from-red-900/20 to-pink-900/20' : 'bg-gradient-to-br from-red-50 to-pink-50',
        textColor: 'text-red-600 dark:text-red-400'
      },
      shortBreak: { 
        label: 'Short Break', 
        color: 'from-green-500 to-emerald-600',
        bgColor: isDark ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/20' : 'bg-gradient-to-br from-green-50 to-emerald-50',
        textColor: 'text-green-600 dark:text-green-400'
      },
      longBreak: { 
        label: 'Long Break', 
        color: 'from-blue-500 to-indigo-600',
        bgColor: isDark ? 'bg-gradient-to-br from-blue-900/20 to-indigo-900/20' : 'bg-gradient-to-br from-blue-50 to-indigo-50',
        textColor: 'text-blue-600 dark:text-blue-400'
      }
    };
    return configs[mode];
  };

  const currentConfig = getModeConfig(mode);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${currentConfig.bgColor} dark:bg-gray-900`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <h1 className="text-5xl font-bold text-gray-800 dark:text-white">
              Focus<span className={`bg-gradient-to-r ${currentConfig.color} bg-clip-text text-transparent`}>Flow</span>
            </h1>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="text-yellow-500" size={24} /> : <Moon className="text-gray-600" size={24} />}
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Stay focused, stay productive</p>
        </div>

        {/* Main Timer Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 mb-8">
            {/* Mode Selector */}
            <ModeSelector 
              currentMode={mode} 
              onModeChange={switchMode}
              isRunning={isRunning}
              isDark={isDark}
            />

            {/* Timer Display */}
            <div className="text-center mb-8">
              <div className={`text-sm font-medium ${currentConfig.textColor} mb-2`}>
                {currentConfig.label}
              </div>
              <TimerDisplay 
                time={formatTime(timeLeft)} 
                mode={mode}
                isDark={isDark}
              />
              <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Session {sessions} • {mode === 'pomodoro' ? 'Focus' : 'Break'} Time
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <button
                onClick={isRunning ? pauseTimer : startTimer}
                className={`bg-gradient-to-r ${currentConfig.color} text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2`}
              >
                {isRunning ? <Pause size={20} /> : <Play size={20} />}
                {isRunning ? 'Pause' : 'Start'}
              </button>
              
              <button
                onClick={resetTimer}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-2xl font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <RotateCcw size={18} />
                Reset
              </button>
            </div>

            {/* Progress Bar */}
            <ProgressBar progress={progress} mode={mode} />
          </div>

          {/* Quote Card */}
          <QuoteCard 
            quote={currentQuote} 
            onRefresh={fetchNewQuote}
            isDark={isDark}
          />
        </div>

        {/* Stats */}
        <div className="max-w-md mx-auto mt-8">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Today's Progress</h3>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{sessions}</div>
            <div className="text-gray-600 dark:text-gray-300">Pomodoro Sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;