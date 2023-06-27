const PausePage = ({ resumeHandler, restartHandler }) => {
  return (
    <div>
      <button onClick={resumeHandler}>Resume</button>
      <button onClick={restartHandler}>Restart</button>
    </div>
  );
};

export default PausePage;
