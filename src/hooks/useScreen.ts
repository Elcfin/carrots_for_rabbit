import { useEffect, useState } from "react";

const THRESHOLD = 600;

const getWindowSize = () => ({
  innerHeight: window.innerHeight,
  innerWidth: window.innerWidth,
});

export const useScreen = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const [isMobile, setIsMobile] = useState(windowSize.innerWidth < THRESHOLD);
  const handleResize = () => {
    const newWindowSize = getWindowSize();
    setWindowSize(newWindowSize);
    setIsMobile(newWindowSize.innerWidth < THRESHOLD);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
  return { windowSize, isMobile };
};
