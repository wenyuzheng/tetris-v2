const PausePage = ({ resumeHandler }) => {
  return (
    <div>
      <button onClick={resumeHandler}>Resume</button>
    </div>
  );
};

export default PausePage;
