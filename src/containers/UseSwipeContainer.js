import { useEffect, useRef } from "react";

const UseSwipeContainer = ({
  children,
  swipeRight,
  swipeLeft,
  swipeDown,
  swipeUp,
  onClick,
  fastDown,
}) => {
  const startPos = useRef(null);
  const startTime = useRef(null);

  const onTouchStart = (e) => {
    startPos.current = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
    startTime.current = Date.now();
  };

  const onTouchMove = (e) => {
    const { clientX, clientY } = e.targetTouches[0];
    const deltaX = clientX - startPos.current[0];
    const deltaY = clientY - startPos.current[1];

    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > minSwipeDistance) {
        swipeRight();
        console.log("right");
        startPos.current = [
          e.targetTouches[0].clientX,
          e.targetTouches[0].clientY,
        ];
      } else if (deltaX < -minSwipeDistance) {
        swipeLeft();
        console.log("left");
        startPos.current = [
          e.targetTouches[0].clientX,
          e.targetTouches[0].clientY,
        ];
      }
    } else {
      // Vertical swipe
      if (deltaY > minSwipeDistance) {
        swipeDown();
        console.log("down");
        startPos.current = [
          e.targetTouches[0].clientX,
          e.targetTouches[0].clientY,
        ];
      } else if (deltaY < -minSwipeDistance) {
        swipeUp();
        console.log("up");
        startPos.current = [
          e.targetTouches[0].clientX,
          e.targetTouches[0].clientY,
        ];
      }
    }
  };

  const onTouchEnd = (e) => {
    const endTime = Date.now();
    const duration = endTime - startTime.current;
    const endY = e.changedTouches[0].clientY;
    const distance = Math.abs(endY - startPos.current[1]);
    const swipeSpeed = distance / duration;
    if (swipeSpeed > 1) {
      fastDown();
      console.log("hard drop");
    }

    startPos.current = null;
    startTime.current = null;
  };

  useEffect(() => {
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("click", onClick);
    };
  });

  return <div>{children}</div>;
};

export default UseSwipeContainer;
