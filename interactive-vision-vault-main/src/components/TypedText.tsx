
import { useState, useEffect } from "react";

interface TypedTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypedText = ({ text, speed = 100, delay = 0, className = "" }: TypedTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Initial delay before typing starts
    const startDelay = setTimeout(() => {
      setIsStarted(true);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [currentIndex, text, speed, isStarted]);

  return (
    <span className={`typing-container ${isTypingComplete ? "" : ""} ${className}`}>
      {displayText}
    </span>
  );
};

export default TypedText;
