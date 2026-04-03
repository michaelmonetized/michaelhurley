"use client";

import { useEffect, useRef } from "react";

export function SinkDemosDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  function dialogOpen() {
    dialogRef.current?.showModal();
  }

  return (
    <>
      <h3>Dialog</h3>
      <button type="button" onClick={dialogOpen}>
        Open dialog
      </button>

      <dialog
        id="demo-dialog"
        ref={dialogRef}
        className="bg-background/50 backdrop-blur-2xl rounded-md place-self-center p-md"
      >
        <div className="relative">
          <h4>Dialog title</h4>
          <p>
            This is a native <code>&lt;dialog&gt;</code> element opened with{" "}
            <code>showModal()</code>. It traps focus and provides a built-in
            backdrop.
          </p>
          <form method="dialog" className="top-md right-md absolute z-9090">
            <button
              type="submit"
              aria-label="Close Dialog"
              className="py-sm px-md bg-background/50 rounded-md border-border border-2"
            >
              &times;
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

export function SinkDemosCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#666";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, 199, 123);

    const x = 199 / 1.618033988749895;
    ctx.setLineDash([4, 2]);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 124);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.font = "11px system-ui";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.fillText("φ : 1", 100, 65);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas-demo"
      width={200}
      height={124}
      role="img"
      aria-label="Golden rectangle rendered on canvas"
    >
      Your browser does not support the canvas element.
    </canvas>
  );
}
