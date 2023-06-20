const UseSwipeContainer = ({ children, swipeActions }) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }} {...swipeActions}>
      {children}
    </div>
  );
};

export default UseSwipeContainer;
