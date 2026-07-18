"use client";

import { useEffect, useState } from "react";

export const useTypingText = (text: string, speed = 120) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = window.setInterval(() => {
      setDisplayedText((current) => text.slice(0, current.length + 1));
      index += 1;
      if (index > text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};
