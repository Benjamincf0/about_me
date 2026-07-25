import { useEffect, useRef } from "react";
import "./hero.css"
const FOREGROUND = "red";
const BACKGROUND = "black";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const displayWidth = canvas?.parentElement.clientWidth;
      const displayHeight = canvas?.parentElement.clientHeight;
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    // falling sand
    canvas.addEventListener('mousemove', (e) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const rect = canvas.getBoundingClientRect();
        drawPoint(ctx, {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
    })


    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div id="hero">
      <canvas
        ref={canvasRef}
        id="myCanvas"
      />
    </div>
  );
}

function drawPoint(ctx, { x, y }) {
  ctx.fillStyle = FOREGROUND;
  ctx.fillRect(x, y, 5, 5);
}
