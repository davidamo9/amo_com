"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Procedural WebGL backdrop for the hero: three light streams flowing in one
 * direction — domain expertise, the AI fleet, and infrastructure converging
 * into one shipped product.
 *
 * Adapted from ThreeUI's StreamConvergenceBackground (MIT, © Meng To,
 * github.com/MengTo/threeui) with the streams re-colored to the site's ember
 * palette in the fragment shader — a single hue-rotate filter can't map three
 * differently-mixed streams into one warm family.
 *
 * Falls back to the previous static gradient blob before hydration and for
 * visitors who prefer reduced motion.
 */

const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_fidelity;
  varying vec2 vUv;

  mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;
    p = rotate2d(0.55) * p;

    // Ember family: gold, brand orange (#F97316), deep red-orange
    vec3 streamColors[3];
    streamColors[0] = vec3(0.98, 0.62, 0.10);
    streamColors[1] = vec3(0.976, 0.451, 0.086);
    streamColors[2] = vec3(0.85, 0.22, 0.05);

    vec3 color = vec3(0.0);
    float spread = 0.06 * (0.3 + u_fidelity * 0.7);

    for (int i = 0; i < 3; i++) {
      float offset = float(1 - i) * spread;
      float y = p.y + offset + (sin(p.x * 2.5 - u_time * 1.5) * 0.12);
      float wave = smoothstep(0.85, 0.99, sin(y * 6.0 + u_time * 2.0) * 0.5 + 0.5);
      color += wave * streamColors[i] * 0.72;
    }

    float vignette = exp(-length(vUv * 2.0 - 1.0) * 0.8);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const SPEED = 0.55;
const FIDELITY = 0.65;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create hero stream shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Hero stream shader compilation failed");
  }
  return shader;
}

function StaticGlow() {
  return (
    <div
      className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[180px] hidden md:block"
      aria-hidden="true"
    />
  );
}

export function HeroStreams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const active = mounted && !reducedMotion;

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;

    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "Hero stream program link failed");
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, "u_time");
    const resolutionUniform = gl.getUniformLocation(program, "u_resolution");
    const fidelityUniform = gl.getUniformLocation(program, "u_fidelity");

    let frame = 0;
    let visible = true;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
    };

    const render = (time: number) => {
      gl.uniform1f(timeUniform, time * 3e-4 * SPEED);
      gl.uniform1f(fidelityUniform, FIDELITY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = visible && !document.hidden ? requestAnimationFrame(render) : 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(render);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteProgram(program);
    };
  }, [active]);

  if (!active) {
    return <StaticGlow />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 mix-blend-screen pointer-events-none opacity-50"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
