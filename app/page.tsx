"use client";

import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

const HomePage = () => {
  const container = useRef<HTMLDivElement>(null);
  const [randomMove, setRandomMove] = useState({
    top: 0,
    left: 0,
  });
  const makeNewPosition = (canvasWidth: number, canvasHeight: number) => {
    // Get viewport dimensions (remove the dimension of the div)
    var h = canvasHeight - 128;
    var w = canvasWidth;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
  };

  const animateDiv = (canvasWidth: number, canvasHeight: number) => {
    var newq = makeNewPosition(canvasWidth, canvasHeight);
    return {
      top: newq[0],
      left: newq[1],
    };
  };

  const handleMove = () => {
    if (container && container.current) {
      const canvasEl = container.current;
      console.log({
        w: canvasEl.offsetWidth as number,
        h: canvasEl.offsetHeight as number,
      });
      setRandomMove(
        animateDiv(
          canvasEl.offsetWidth as number,
          canvasEl.offsetHeight as number
        )
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => handleMove(), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <main className="flex w-full h-screen flex-col items-center justify-center gap-4 overflow-hidden">
      <div ref={container} className="w-full h-full absolute overflow-hidden">
        <h1
          className={classNames(
            "transition-all duration-1000 relative text-xl"
          )}
          style={randomMove}
        >
          Coming Soon..
        </h1>
      </div>
      <h2 className="animate-bounce font-bold text-5xl">Crawlyx</h2>
    </main>
  );
};

export default HomePage;
