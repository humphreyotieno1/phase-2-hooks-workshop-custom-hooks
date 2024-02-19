import { useState, useEffect } from "react";

// checks if the user is idle or not based on these event types
const activityEvents = [
  "mousedown",
  "mousemove",
  "keydown",
  "scroll",
  "touchstart",
];

export function useIdle(ms, eventTypes = activityEvents) {
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    // Set a timeout to change isIdle to true after 'ms' milliseconds
    let timeoutId = setTimeout(() => setIsIdle(true), ms);

    // Function to reset idle state and clear timeout
    function setActive() {
      setIsIdle(false);
      clearTimeout(timeoutId);
      // Reset timeout for the next idle period
      timeoutId = setTimeout(() => setIsIdle(true), ms);
    }

    // Add event listeners for each specified event type to reset idle state
    for (const type of eventTypes) {
      window.addEventListener(type, setActive);
    }

    // Cleanup function to remove event listeners and clear timeout
    return function cleanup() {
      for (const type of eventTypes) {
        window.removeEventListener(type, setActive);
      }
      clearTimeout(timeoutId);
    };
  }, [ms, eventTypes]);

  return isIdle;
}

export default function Idle() {
  const isIdle = useIdle(3000);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>useIdle Demo</h2>
      <h3>
        {isIdle ? (
          <span role="img" aria-label="idle">
            Idle 😴
          </span>
        ) : (
          <span role="img" aria-label="active">
            Active 🤠
          </span>
        )}
      </h3>
    </div>
  );
}
