const PausePage = ({ resumeHandler, musicHandler, soundHandler }) => {
  return (
    <div>
      <button onClick={resumeHandler}>Resume</button>
      <button onClick={musicHandler}>Music</button>
      <button onClick={soundHandler}>Sound</button>
    </div>
  );
};

export default PausePage;
