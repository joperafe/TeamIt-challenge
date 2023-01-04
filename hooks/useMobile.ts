import { useEffect, useState } from "react";

export const useMobile = () => {
  const [width, setWidth] = useState<number>();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const isMobile = width ? width <= 768 : false;

  return isMobile;
};

export default useMobile;
