import { useEffect, useState } from "react";

const UseSwipeContainer = ({
  children,
  swipeRight,
  swipeLeft,
  swipeDown,
  swipeUp,
  onClick,
}) => {
  const [horiTouch, setHoriTouch] = useState(null);
  const [vertiTouch, setVertiTouch] = useState(null);

  const onTouchStart = (e) => {
    setHoriTouch(e.targetTouches[0].clientX);
    setVertiTouch(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    // console.log(horiTouch, vertiTouch);

    if (!horiTouch || !vertiTouch) return;

    const { clientX, clientY } = e.touches[0];
    const deltaX = clientX - horiTouch;
    const deltaY = clientY - vertiTouch;

    const minSwipeDistance = 30;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > minSwipeDistance) {
        swipeRight();
        console.log("right");
      } else if (deltaX < -minSwipeDistance) {
        swipeLeft();
        console.log("left");
      }
    } else {
      // Vertical swipe
      if (deltaY > minSwipeDistance) {
        swipeDown();
        console.log("down");
      } else if (deltaY < -minSwipeDistance) {
        swipeUp();
        console.log("up");
      }
    }
  };

  const onTouchEnd = () => {
    // console.log(horiTouch, vertiTouch);
    // console.log("should be tap");

    setHoriTouch(null);
    setVertiTouch(null);
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
