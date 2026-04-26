"use client";

import { useEffect, useRef } from "react";

export function DrawStrokeSetup() {
  useEffect(() => {
    const drawPaths = document.querySelectorAll<SVGGeometryElement>(
      ".draw-stroke, .draw-stroke-on-enter",
    );

    drawPaths.forEach((path) => {
      try {
        const length = path.getTotalLength();
        path.style.setProperty("--path-length", String(length));
      } catch {
        path.style.setProperty("--path-length", "1000");
      }
    });
  }, []);

  return null;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const POINT_COUNT = 8;
    const RADIUS = 180;
    const SPRING = 0.16;
    const FRICTION = 0.69;
    const WANDER_SPEED = 0.075;
    const IDLE_TIMEOUT = 500;
    const DECAY_TIME = 250;
    const REMIND_TIME = 1000;
    const REMIND_DURATION = 3000;
    const SCALE_FACTOR = 1.133;
    const JITTER_SPEED = 0.001;
    const JITTER_RANGE = 60;

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let lastMouseTime = Date.now();
    let isIdle = true;
    let blobScale = 1;
    let animationFrame = 0;

    const wanderTarget = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    };

    type Point = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      seeds: number[];
    };

    const createPoint = (index: number): Point => {
      const subPointCount = Math.max(1, POINT_COUNT - index);

      return {
        x: mouse.x,
        y: mouse.y,
        vx: 0,
        vy: 0,
        seeds: Array.from({ length: subPointCount }, () => Math.random() * 100),
      };
    };

    const updatePoint = (point: Point, targetX: number, targetY: number) => {
      const dx = targetX - point.x;
      const dy = targetY - point.y;
      point.vx += dx * SPRING;
      point.vy += dy * SPRING;
      point.vx *= FRICTION;
      point.vy *= FRICTION;
      point.x += point.vx;
      point.y += point.vy;
    };

    const drawPoint = (
      point: Point,
      context: CanvasRenderingContext2D,
      baseRadius: number,
      time: number,
    ) => {
      if (baseRadius <= 1) return;

      point.seeds.forEach((seed) => {
        const offsetX = Math.cos(time * JITTER_SPEED + seed) * JITTER_RANGE;
        const offsetY = Math.sin(time * JITTER_SPEED * 1.1 + seed) * JITTER_RANGE;

        context.beginPath();
        context.arc(
          point.x + offsetX,
          point.y + offsetY,
          baseRadius * 0.8,
          0,
          Math.PI * 2,
        );
        context.fill();
      });
    };

    const points = Array.from({ length: POINT_COUNT }, (_, index) => createPoint(index));
    const blobCanvas = document.createElement("canvas");
    const blobCtx = blobCanvas.getContext("2d");
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");

    if (!blobCtx || !maskCtx) return;

    const image = new window.Image();
    image.src = "/profile/landscape-wireframe.jpg";

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const drawImageCover = (context: CanvasRenderingContext2D, img: HTMLImageElement) => {
      if (!img.complete || img.naturalWidth === 0) return;

      const width = context.canvas.width;
      const height = context.canvas.height;
      const imageRatio = img.width / img.height;
      const canvasRatio = width / height;

      let renderWidth: number;
      let renderHeight: number;
      const x = 0;
      let y = 0;

      if (canvasRatio > imageRatio) {
        renderWidth = width;
        renderHeight = width / imageRatio;
        y = height - renderHeight;
      } else {
        renderWidth = height * imageRatio;
        renderHeight = height;
      }

      context.drawImage(img, x, y, renderWidth, renderHeight);
    };

    const handleResize = () => {
      canvas.width = blobCanvas.width = maskCanvas.width = window.innerWidth;
      canvas.height = blobCanvas.height = maskCanvas.height = window.innerHeight;
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse = { x: event.clientX, y: event.clientY };
      lastMouseTime = Date.now();
      isIdle = false;
    };

    const updateWander = () => {
      if (Date.now() - lastMouseTime > IDLE_TIMEOUT) isIdle = true;

      if (!isIdle) return;

      const distance = Math.hypot(wanderTarget.x - mouse.x, wanderTarget.y - mouse.y);
      if (distance < 100) {
        wanderTarget.x = Math.random() * window.innerWidth;
        wanderTarget.y = Math.random() * window.innerHeight;
      }

      mouse = {
        x: lerp(mouse.x, wanderTarget.x, WANDER_SPEED),
        y: lerp(mouse.y, wanderTarget.y, WANDER_SPEED),
      };
    };

    const animate = (time: number) => {
      updateWander();

      const idleTime = Date.now() - lastMouseTime;
      let targetScale = 1;

      if (isIdle) {
        if (idleTime > DECAY_TIME) targetScale = 0;

        const reminderStart = DECAY_TIME + REMIND_TIME;
        const reminderEnd = reminderStart + REMIND_DURATION;

        if (idleTime > reminderStart && idleTime < reminderEnd) {
          targetScale = 1;
        }
      }

      blobScale = lerp(blobScale, targetScale, 0.05);

      if (points[0]) {
        updatePoint(points[0], mouse.x, mouse.y);
      }
      for (let index = 1; index < points.length; index += 1) {
        if (points[index] && points[index - 1]) {
          updatePoint(points[index], points[index - 1].x, points[index - 1].y);
        }
      }

      blobCtx.clearRect(0, 0, blobCanvas.width, blobCanvas.height);
      blobCtx.fillStyle = "white";

      points.forEach((point, index) => {
        const currentMaxRadius = RADIUS * blobScale;
        const radius = currentMaxRadius / Math.pow(SCALE_FACTOR, index);

        drawPoint(point, blobCtx, radius, time);
      });

      maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
      maskCtx.filter = "url(#gooey)";
      maskCtx.drawImage(blobCanvas, 0, 0);
      maskCtx.filter = "none";
      maskCtx.globalCompositeOperation = "source-in";
      drawImageCover(maskCtx, image);
      maskCtx.globalCompositeOperation = "source-over";

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(maskCanvas, 0, 0);

      animationFrame = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize();
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas id="hero-canvas" ref={canvasRef} width={100} height={100} />;
}

export function GooBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;

      float smin(float a, float b, float k) {
          float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
          return mix(b, a, h) - k * h * (1.0 - h);
      }

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          vec2 st = uv;
          float aspect = u_resolution.x / u_resolution.y;
          st.x *= aspect;

          float dist = 200.0;

          for(float i = 0.0; i < 12.0; i++) {
              vec2 anchor = vec2(
                  mod(i, 4.0) / 4.0 + 0.125,
                  floor(i / 4.0) / 3.0 + 0.166
              );
              anchor.x *= aspect;

              vec2 drift = vec2(
                  sin(u_time * 0.3 + i * 55.0),
                  cos(u_time * 0.4 + i * 88.0)
              ) * 0.6;

              vec2 groupCenter = anchor + drift;
              float groupRotation = u_time * (0.3 + mod(i, 0.6));

              for(float k = 0.0; k < 6.0; k++) {
                  float angle = (k / 6.0) * 6.28318 + groupRotation;
                  float bob = sin(u_time * (0.5 + mod(i+k, 0.5))) * 0.06 + 0.06;
                  vec2 pos = groupCenter + vec2(cos(angle), sin(angle)) * bob;

                  float circleDist = length(st - pos) - 0.02;
                  dist = smin(dist, circleDist, 0.36);
              }
          }

          float thickness = 0.0004;
          float edge = abs(dist);
          float line = smoothstep(thickness, 0.0, edge);
          vec3 strokeColor = vec3(.2,.2,.3);
          gl_FragColor = vec4(strokeColor, line);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
        1.0, -1.0,
        -1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        1.0, 1.0,
      ]),
      gl.STATIC_DRAW,
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    };

    let animationFrame = 0;

    const render = (time: number) => {
      gl.uniform1f(timeLocation, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrame = window.requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas id="goo-background" ref={canvasRef} width={100} height={100} />;
}
