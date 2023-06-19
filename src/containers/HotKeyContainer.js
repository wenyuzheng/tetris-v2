import { useEffect } from "react";

const HotKeyContainer = ({ handleKeyPress, children }) => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return <div>{children}</div>;
};

export default HotKeyContainer;
