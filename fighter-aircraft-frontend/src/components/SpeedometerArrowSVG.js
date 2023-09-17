export default function SpeedometerArrowSVG({ rotation }) {
  return (
    <svg
      className="speedometer-arrow-svg"
      xmlns="http://www.w3.org/2000/svg"
      width="180px"
      height="180px"
      viewBox="0 0 100 100"
      style={{
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "bottom",
      }}
    >
      <polygon points="50,5 43,90 57,90" />
      <circle cx="50" cy="93" r="12" />
    </svg>
  );
}
