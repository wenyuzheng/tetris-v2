import { useEffect, useRef } from "react";

const useLongPress = (callback = () => {}, ms = 300) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => stopLongPress();
  }, []);

  const stopLongPress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startLongPress = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(callback, ms);
  };

  return {
    onMouseDown: startLongPress,
    onMouseUp: stopLongPress,
    onMouseLeave: stopLongPress,
    onTouchStart: startLongPress,
    onTouchEnd: stopLongPress,
  };
};

export default useLongPress;
