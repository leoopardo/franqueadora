import { Typography } from "antd";
import { useEffect, useState } from "react";

const RealTimeClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Typography
      style={{
        fontWeight: 800,
        fontSize: 22,
        minWidth: 100,
        textAlign: "center",
      }}
    >
      {time.toLocaleTimeString()}
    </Typography>
  );
};

export default RealTimeClock;
