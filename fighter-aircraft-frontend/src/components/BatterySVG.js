import { useEffect, useState } from "react";

export default function BatterySVG({ batteryPercentage }) {
  const [blackRectangleHeight, setBlackRectangleHeight] = useState("0px");
  const [batteryColor, setBatteryColor] = useState("lime");
  const [blinkEnabled, setBlinkEnabled] = useState(false);

  useEffect(() => {
    console.log("Battery percentage:", batteryPercentage);
    if (batteryPercentage <= 100 && batteryPercentage >= 75) {
      setBlackRectangleHeight((100 - batteryPercentage) * (80 / 25) + "px");
      setBatteryColor("lime");
      setBlinkEnabled(false);
    }
    if (batteryPercentage <= 75 && batteryPercentage >= 50) {
      setBlackRectangleHeight(
        10 + (100 - batteryPercentage) * (80 / 25) + "px"
      );
      setBatteryColor("lime");
      setBlinkEnabled(false);
    }
    if (batteryPercentage <= 50 && batteryPercentage >= 25) {
      setBlackRectangleHeight(
        20 + (100 - batteryPercentage) * (80 / 25) + "px"
      );
      setBatteryColor("yellow");
      setBlinkEnabled(false);
    }
    if (batteryPercentage <= 25 && batteryPercentage >= 0) {
      setBlackRectangleHeight(
        30 + (100 - batteryPercentage) * (80 / 25) + "px"
      );
      setBatteryColor("red");
      setBlinkEnabled(false);
    }
    if (batteryPercentage <= 20) {
      setBatteryColor("red");
      setBlinkEnabled(true);
    }
  });

  return (
    <svg
      className="battery-svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 471.829 471.829"
      xmlSpace="preserve"
      width="250px"
      height="250px"
    >
      {blinkEnabled && (
        <animate
          attributeType="XML"
          attributeName="fill"
          values="#ffffff;#000; #ffffff ; #000 "
          dur="2s"
          repeatCount="indefinite"
        />
      )}
      <path d="M319.089,27.221h-36.475V0h-95.27v27.221h-34.607c-22.517,0-40.829,18.317-40.829,40.832v362.946   c0,22.51,18.317,40.83,40.829,40.83h166.352c22.524,0,40.832-18.32,40.832-40.83V68.052   C359.921,45.538,341.613,27.221,319.089,27.221z M332.705,431.002c0,7.501-6.108,13.607-13.616,13.607H152.737   c-7.501,0-13.608-6.095-13.608-13.607V68.052c0-7.501,6.107-13.611,13.608-13.611h166.352c7.508,0,13.616,6.109,13.616,13.611" />
      <svg>
        <rect x="150" y="70" width="170" height="80px" fill={batteryColor}>
          {blinkEnabled && (
            <animate
              attributeType="rect"
              attributeName="fill"
              values="#ffffff;#000; #ffffff ; #000 "
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </rect>
        <rect x="150" y="160" width="170" height="80px" fill={batteryColor}>
          {blinkEnabled && (
            <animate
              attributeType="rect"
              attributeName="fill"
              values="#ffffff;#000; #ffffff ; #000 "
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </rect>
        <rect x="150" y="250" width="170" height="80px" fill={batteryColor}>
          {blinkEnabled && (
            <animate
              attributeType="rect"
              attributeName="fill"
              values="#ffffff;#000; #ffffff ; #000 "
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </rect>
        <rect x="150" y="340" width="170" height="80px" fill={batteryColor}>
          {blinkEnabled && (
            <animate
              attributeType="rect"
              attributeName="fill"
              values="#ff0000 ;#000; #ff0000  ; #000 "
              dur="2s"
              repeatCount="indefinite"
            />
          )}
        </rect>
        <rect
          x="150"
          y="70"
          width="170"
          height={blackRectangleHeight}
          fill="black"
        />
      </svg>
    </svg>
  );
}
