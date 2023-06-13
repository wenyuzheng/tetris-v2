import { useEffect, useRef, useState } from "react";

const App2 = () => {
  const [counter, setCounter] = useState(100);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => stopCounter(); // when App is unmounted we should stop counter
  }, []);

  const containerStyle = {
    height: "300px",
    width: "300px",
  };

  const elementStyle = {
    margin: "5px",
    height: `${counter}px`,
    width: `${counter}px`,
    background: "radial-gradient(at 25% 25%, #2b86c5, #562b7c, #ff3cac)",
    border: "2px solid black",
    borderRadius: "50%",
    boxShadow: "10px 5px 5px #BEBEBE",
  };

  const startCounter = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 10);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div style={containerStyle}>
      <div
        onMouseDown={startCounter}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
        style={elementStyle}
      />
    </div>
  );
};

export default App2;
