import { useState } from "react";

const useSwipe = ({ swipeLeft, swipeRight, swipeDown, swipeUp }) => {
  const [horiTouchStart, setHoriTouchStart] = useState(0);
  const [horiTouchEnd, setHoriTouchEnd] = useState(0);
  const [vertiTouchStart, setVertiTouchStart] = useState(0);
  const [vertiTouchEnd, setVertiTouchEnd] = useState(0);

  const minSwipeDistance = 40;

  const onTouchStart = (e) => {
    setHoriTouchEnd(0);
    setVertiTouchEnd(0);

    setHoriTouchStart(e.targetTouches[0].clientX);
    setVertiTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    setHoriTouchEnd(e.targetTouches[0].clientX);
    setVertiTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (
      (!horiTouchStart || !horiTouchEnd) &&
      (!vertiTouchStart || !vertiTouchEnd)
    )
      return;

    const horiDistance = horiTouchStart - horiTouchEnd;
    const isLeftSwipe = horiDistance > minSwipeDistance;
    const isRightSwipe = horiDistance < -minSwipeDistance;

    const vertiDistance = vertiTouchStart - vertiTouchEnd;
    const isUpSwipe = vertiDistance > minSwipeDistance;
    const isDownSwipe = vertiDistance < -minSwipeDistance;

    const times = Math.floor(Math.abs(horiDistance / minSwipeDistance));

    if (isLeftSwipe) {
      swipeLeft(times);
    } else if (isRightSwipe) {
      swipeRight(times);
    } else if (isDownSwipe) {
      swipeDown();
    } else if (isUpSwipe) {
      swipeUp();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useSwipe;
