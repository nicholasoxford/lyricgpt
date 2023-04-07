"use client";
import CountUp from "react-countup";

export function CountUpFunction() {
  return (
    <CountUp start={7800} end={8003} delay={0}>
      {({ countUpRef }) => (
        <div>
          <span ref={countUpRef} />
        </div>
      )}
    </CountUp>
  );
}
