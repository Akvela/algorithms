import React, { useState, useEffect } from "react";

type TProps = {
  children: JSX.Element;
  delay?: number;
}

export const Delayed = ({children, delay = 500}: TProps) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRender(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay])

  return render ? children : null;
}