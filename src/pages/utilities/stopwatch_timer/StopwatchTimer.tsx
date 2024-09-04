import { useState, useEffect, useRef } from 'react';
import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import { Trans } from 'react-i18next';
import './StopwatchTimer.css';
import Button from '../../../components/Button.tsx';
import Icon from '../../../components/Icon.tsx';

export default function StopwatchTimer() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isTimer, setIsTimer] = useState<boolean>(false);
  const [timerInputs, setTimerInputs] = useState({ hh: '', mm: '', ss: '' });
  const [laps, setLaps] = useState<number[]>([]);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const beepSoundRef = useRef<HTMLAudioElement | null>(null);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1 && isTimer) {
            playBeep();
            setShowPopup(true); // Show popup at the end
            setIsRunning(false); // Stop timer
          }
          return isTimer ? Math.max(prevTime - 1, 0) : prevTime + 1;
        });
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isRunning, isTimer]);

  const handleStartPause = () => {
    setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(parseInputToSeconds(timerInputs)); // Set time directly
    setLaps([]);
  };

  const handleLap = () => {
    if (!isTimer) setLaps([...laps, time]);
  };

  const handleToggleFullScreen = () => {
    setIsFullScreen(prev => !prev);
  };

  const handleModeSwitch = () => {
    setIsRunning(false);
    setTime(isTimer ? 0 : parseInputToSeconds(timerInputs)); // Switch between modes
    setLaps([]);
    setIsTimer(prev => !prev);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Function to parse inputs into total seconds
  const parseInputToSeconds = (inputs: {
    hh: string;
    mm: string;
    ss: string;
  }): number => {
    const hours = parseInt(inputs.hh, 10) || 0;
    const minutes = parseInt(inputs.mm, 10) || 0;
    const seconds = parseInt(inputs.ss, 10) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleTimerInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTimerInputs(prev => ({ ...prev, [name]: value }));
    if (isTimer)
      setTime(parseInputToSeconds({ ...timerInputs, [name]: value })); // Update time in real-time
  };

  const playBeep = () => {
    if (beepSoundRef.current) {
      beepSoundRef.current.play();
    }
  };

  // Hide controls after 2 seconds of non-hover
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (!showControls && isFullScreen) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
    return () => clearTimeout(timeout!);
  }, [showControls]);

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', url: '/' },
          {
            label: <Trans>navigation.utilities_page</Trans>,
            url: '/utilities',
          },
          { label: 'Stopwatch/Timer' },
        ]}
      />
      <Page gap="20px">
        <Title>Stopwatch/Timer</Title>

        <div
          className={`stopwatch_timer_container ${isFullScreen ? 'full-screen' : ''}`}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <div className="timer_display">{formatTime(time)}</div>

          <div
            className={`controls ${isFullScreen ? 'fullscreen-controls' : ''} ${showControls ? 'visible' : ''}`}
          >
            <Button onClick={handleStartPause}>
              {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
            {!isTimer && isRunning && <Button onClick={handleLap}>Lap</Button>}
            <Button onClick={handleToggleFullScreen}>
              {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
            </Button>
            <Button onClick={handleModeSwitch}>
              {isTimer ? 'Switch to Stopwatch' : 'Switch to Timer'}
            </Button>
          </div>

          {isTimer && (
            <div className="timer_input_container">
              <input
                type="number"
                name="hh"
                className="timer_input"
                value={timerInputs.hh}
                placeholder="hh"
                onChange={handleTimerInputsChange}
              />
              <span>:</span>
              <input
                type="number"
                name="mm"
                className="timer_input"
                value={timerInputs.mm}
                placeholder="mm"
                onChange={handleTimerInputsChange}
              />
              <span>:</span>
              <input
                type="number"
                name="ss"
                className="timer_input"
                value={timerInputs.ss}
                placeholder="ss"
                onChange={handleTimerInputsChange}
              />
            </div>
          )}

          {laps.length > 0 && (
            <div className={`laps ${isFullScreen ? 'fullscreen-laps' : ''}`}>
              <h3>Laps</h3>
              <ul>
                {laps.map((lap, index) => (
                  <li key={index}>
                    Lap {index + 1}: {formatTime(lap)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Beep sound */}
        <audio ref={beepSoundRef}>
          <source src="/path/to/beep-sound.mp3" type="audio/mpeg" />
        </audio>

        {/* Fullscreen Popup */}
        {showPopup && (
          <div className="popup">
            <div className="popup_content">
              <h2>Time's Up!</h2>
              <Button onClick={() => setShowPopup(false)}>
                <Icon type="close" />
              </Button>
            </div>
          </div>
        )}
      </Page>
      <Footer />
    </>
  );
}
