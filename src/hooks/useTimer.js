import { useState, useEffect, useRef, useCallback } from 'react';

const TIMER_DURATIONS = {
  pomodoro: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60  // 15 minutes
};

export const useTimer = () => {
  const [mode, setMode] = useState('pomodoro');
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [savedTimes, setSavedTimes] = useState({
    pomodoro: TIMER_DURATIONS.pomodoro,
    shortBreak: TIMER_DURATIONS.shortBreak,
    longBreak: TIMER_DURATIONS.longBreak
  });
  
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.pomodoro);
  const intervalRef = useRef(null);
  const endTimeRef = useRef(null);

  // Audio refs
  const buttonSoundRef = useRef(null);
  const breakSoundRef = useRef(null);
  const backToWorkSoundRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    buttonSoundRef.current = new Audio('/sounds/button-sound.mp3');
    breakSoundRef.current = new Audio('/sounds/break.mp3');
    backToWorkSoundRef.current = new Audio('/sounds/backtowork.mp3');
    
    // Set volume
    buttonSoundRef.current.volume = 0.5;
    breakSoundRef.current.volume = 0.7;
    backToWorkSoundRef.current.volume = 0.7;
  }, []);

  // Play sound helper
  const playSound = (soundRef) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current.play().catch(e => console.log('Sound play failed:', e));
    }
  };

  // Calculate progress percentage
  const progress = ((TIMER_DURATIONS[mode] - timeLeft) / TIMER_DURATIONS[mode]) * 100;

  // Update document title
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const modeText = mode === 'pomodoro' ? 'Focus Time' : 'Break Time';
    document.title = `${timeString} - ${modeText} | FocusFlow`;
  }, [timeLeft, mode]);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + timeLeft * 1000;
      }

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000));
        
        setTimeLeft(remaining);
        setSavedTimes(prev => ({ ...prev, [mode]: remaining }));

        if (remaining === 0) {
          setIsRunning(false);
          endTimeRef.current = null;
          
          // Auto-switch modes and increment sessions
          if (mode === 'pomodoro') {
            setSessions(prev => prev + 1);
            // Switch to break mode
            const nextMode = (sessions + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
            switchMode(nextMode, true);
            playSound(breakSoundRef);
          } else {
            // Switch back to pomodoro
            switchMode('pomodoro', true);
            playSound(backToWorkSoundRef);
          }

          // Show notification
          if (Notification.permission === 'granted') {
            const message = mode === 'pomodoro' 
              ? 'Great work! Time for a break.' 
              : 'Break time is over. Ready to focus?';
            new Notification('FocusFlow Timer', { body: message });
          }

          // Auto-start next session after 3 seconds
          setTimeout(() => {
            setIsRunning(true);
          }, 3000);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (!isRunning) {
        endTimeRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, mode, sessions]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const startTimer = useCallback(() => {
    playSound(buttonSoundRef);
    setIsRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    playSound(buttonSoundRef);
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    playSound(buttonSoundRef);
    setIsRunning(false);
    endTimeRef.current = null;
    const newTime = TIMER_DURATIONS[mode];
    setTimeLeft(newTime);
    setSavedTimes(prev => ({ ...prev, [mode]: newTime }));
  }, [mode]);

  const switchMode = useCallback((newMode, autoSwitch = false) => {
    if (!autoSwitch) {
      playSound(buttonSoundRef);
    }
    
    if (isRunning && !autoSwitch) {
      // Save current progress before switching
      setSavedTimes(prev => ({ ...prev, [mode]: timeLeft }));
      setIsRunning(false);
    }
    
    setMode(newMode);
    
    // Use saved time if available, otherwise use default duration
    const newTime = autoSwitch ? TIMER_DURATIONS[newMode] : savedTimes[newMode];
    setTimeLeft(newTime);
    
    if (!autoSwitch) {
      endTimeRef.current = null;
    }
  }, [isRunning, mode, timeLeft, savedTimes]);

  return {
    mode,
    isRunning,
    timeLeft,
    sessions,
    progress,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode
  };
};