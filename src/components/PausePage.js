import "./css/PausePage.css";

const PausePage = ({ resumeHandler, restartHandler }) => {
  return (
    <div className="container">
      <button onClick={resumeHandler}>Resume</button>
      <button onClick={restartHandler}>Restart</button>
    </div>
  );
};

export default PausePage;
