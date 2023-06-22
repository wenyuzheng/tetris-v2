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
  const canMove = useRef(false);

  const onTouchStart = (e) => {
    startPos.current = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
    startTime.current = Date.now();
    canMove.current = true;
  };

  const onTouchMove = (e) => {
    if (!canMove.current) return;
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
        startTime.current = Date.now();
      } else if (deltaX < -minSwipeDistance) {
        swipeLeft();
        console.log("left");
        startPos.current = [
          e.targetTouches[0].clientX,
          e.targetTouches[0].clientY,
        ];
        startTime.current = Date.now();
      }
    } else {
      // Vertical swipe
      if (deltaY > minSwipeDistance) {
        const duration = Date.now() - startTime.current;
        const swipeSpeed = deltaY / duration;

        if (swipeSpeed > 5) {
          fastDown();
          console.log("hard drop");
          canMove.current = false;
        } else {
          swipeDown();
          console.log("down");
        }

        startPos.current = [
          e.targetTouches[0].clientX,
          e.targetTouches[0].clientY,
        ];
        startTime.current = Date.now();
      } else if (deltaY < -minSwipeDistance) {
        swipeUp();
        console.log("up");
        startPos.current = [
          e.targetTouches[0].clientX,
          e.targetTouches[0].clientY,
        ];
        startTime.current = Date.now();
      }
    }
  };

  const onTouchEnd = () => {
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
