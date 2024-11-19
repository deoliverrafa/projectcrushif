import { useState, useEffect, useCallback } from 'react';

function useLongPress(callback = () => { }, ms = 300) {
  const [isPressed, setIsPressed] = useState(false);

  const startPress = useCallback(() => {
    setIsPressed(true);
  }, []);

  const endPress = useCallback(() => {
    setIsPressed(false);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isPressed) {
      timer = setTimeout(() => {
        callback();
      }, ms);
    } else {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isPressed, ms, callback]);

  return {
    onMouseDown: startPress,
    onMouseUp: endPress,
    onMouseLeave: endPress,
    onTouchStart: startPress,
    onTouchEnd: endPress,
  };
}

export default useLongPress;
