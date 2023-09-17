import React, { useEffect, useRef, useState } from "react";
import { act } from "react-dom/test-utils";

const WebSocketComponent = ({ onMessageReceived }) => {
  const [isStarted, setIsStarted] = useState(false);
  const socketRef = useRef(null);
  const [activeTimeout, setActiveTimeout] = useState(null);

  useEffect(() => {
    const socketUrl = "ws://localhost:5175";
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socketRef.current.onmessage = (event) => {
      if (onMessageReceived) {
        onMessageReceived(event.data);
      }
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const handleStartClick = () => {
    if (!isStarted) {
      setIsStarted(true);

      socketRef.current.send("START");

      setActiveTimeout(
        setTimeout(() => {
          setIsStarted(false);
          socketRef.current.send("STOP");
        }, 10000)
      ); // 10 seconds
    }
  };

  const handleStopClick = () => {
    if (isStarted) {
      setIsStarted(false);

      socketRef.current.send("STOP");
      clearTimeout(activeTimeout);
      setActiveTimeout(null);
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ width: "1000px" }}>
      <button
        className="btn btn-lg btn-primary mb-4 me-4"
        onClick={handleStartClick}
        disabled={isStarted}
      >
        Start
      </button>
      <button
        className="btn btn-lg btn-danger mb-4 me-4"
        onClick={handleStopClick}
        disabled={!isStarted}
      >
        Stop
      </button>
    </div>
  );
};

export default WebSocketComponent;
