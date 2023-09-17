import { useState } from "react";
import WebSocketComponent from "./components/WebSocketComponent";
import PlaneSVG from "./components/PlaneSVG";
import SpeedometerCircleSVG from "./components/SpeedometerCircleSVG";
import SpeedometerArrowSVG from "./components/SpeedometerArrowSVG";
import BatterySVG from "./components/BatterySVG";

function App() {
  //const [receivedMessage, setReceivedMessage] = useState("");
  const [planeAngle, setPlaneAngle] = useState(0);
  const [planeSpeed, setPlaneSpeed] = useState();
  const [planeSpeedArrowRotation, setPlaneSpeedArrowRotation] = useState(-150);
  const [batteryPercentage, setBatteryPercentage] = useState(100);

  const handleWebSocketMessage = (message) => {
    console.log("Received message:", message);
    //setReceivedMessage(message);

    if (JSON.parse(message).eventName === "PLANE_ANGLE") {
      console.log("Plane angle message received");
      setPlaneAngle(JSON.parse(message).data.angle);
    }

    if (JSON.parse(message).eventName === "PLANE_SPEED") {
      console.log("Plane speed message received");
      setPlaneSpeed(JSON.parse(message).data.speed);
      setPlaneSpeedArrowRotation(
        planeSpeedArrowRotation + JSON.parse(message).data.speed * 3
      );

      console.log("Plane speed:", JSON.parse(message).data.speed);
    }

    if (JSON.parse(message).eventName === "PLANE_BATTERY") {
      setBatteryPercentage(JSON.parse(message).data.battery);
    }
  };

  return (
    <>
      <div className="aircraft-container">
        <PlaneSVG className="plane-svg" rotation={planeAngle} />
        <SpeedometerCircleSVG className="speedometer-circle-svg" />
        <SpeedometerArrowSVG
          className="speedometer-arrow-svg"
          rotation={planeSpeedArrowRotation}
        />
        <div className="text-white text-center">
          <h2 className="speedometer-text-top">
            <strong>{planeSpeed}</strong>
          </h2>
          <h3 className="speedometer-text-bottom">km/h</h3>
        </div>
        <BatterySVG
          className="battery-svg"
          batteryPercentage={batteryPercentage}
        />
        <div className="text-white text-center">
          <h2 className="battery-text">
            <strong>{batteryPercentage}%</strong>
          </h2>
        </div>
      </div>
      <WebSocketComponent
        onMessageReceived={handleWebSocketMessage}
        planeAngleCallback={setPlaneAngle}
      />
    </>
  );
}

export default App;
