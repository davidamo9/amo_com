"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Full-page procedural WebGL backdrop: three ember light streams flowing in
 * one direction, fixed behind the whole page. As the visitor scrolls, the
 * scene evolves smoothly: the streams rotate and drift, the palette deepens
 * from gold and orange into darker ember, the field dims through the middle
 * sections so text stays legible, then warms back up toward the contact
 * section.
 *
 * Adapted from ThreeUI's StreamConvergenceBackground (MIT, © Meng To,
 * github.com/MengTo/threeui) with the palette and scroll behavior baked into
 * the fragment shader, since a single hue-rotate filter can't map three
 * differently-mixed streams into one warm family.
 *
 * Visitors who prefer reduced motion get a still scene that only responds to
 * their own scrolling. If WebGL is unavailable a static gradient glow
 * renders instead.
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
  uniform float u_scroll;
  varying vec2 vUv;

  mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;
    p = rotate2d(0.55 + u_scroll * 0.8) * p;

    // Ember family at the top of the page: gold, brand orange (#F97316),
    // deep red-orange. Each stream sinks toward darker ember as you scroll.
    vec3 topColors[3];
    topColors[0] = vec3(0.98, 0.62, 0.10);
    topColors[1] = vec3(0.976, 0.451, 0.086);
    topColors[2] = vec3(0.85, 0.22, 0.05);

    vec3 deepColors[3];
    deepColors[0] = vec3(0.85, 0.34, 0.05);
    deepColors[1] = vec3(0.80, 0.20, 0.06);
    deepColors[2] = vec3(0.55, 0.10, 0.12);

    vec3 color = vec3(0.0);
    float spread = 0.06 * (0.3 + u_fidelity * 0.7);

    for (int i = 0; i < 3; i++) {
      float offset = float(1 - i) * spread;
      float y = p.y + offset + (sin(p.x * 2.5 - u_time * 1.5 + u_scroll * 3.0) * 0.12);
      float wave = smoothstep(0.85, 0.99, sin(y * 6.0 + u_time * 2.0 - u_scroll * 6.0) * 0.5 + 0.5);
      color += wave * mix(topColors[i], deepColors[i], u_scroll) * 0.72;
    }

    // Bright at the hero, subdued through the reading sections, warming
    // again toward the end of the page.
    float envelope = mix(1.0, 0.35, smoothstep(0.04, 0.30, u_scroll));
    envelope += 0.35 * smoothstep(0.72, 1.0, u_scroll);

    float vignette = exp(-length(vUv * 2.0 - 1.0) * 0.8);
    color *= vignette * envelope;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const SPEED = 0.55;
const FIDELITY = 0.65;
// Shader time for the reduced-motion still scene
const STATIC_TIME = 1.65;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create stream backdrop shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Stream backdrop shader compilation failed");
  }
  return shader;
}

function scrollProgress(): number {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / max));
}

function StaticGlow() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[180px] hidden md:block" />
    </div>
  );
}

export function StreamBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const active = mounted && !webglFailed;

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    const vertex = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "Stream backdrop program link failed");
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
    const scrollUniform = gl.getUniformLocation(program, "u_scroll");

    let frame = 0;
    let scrollRaf = 0;
    let scrollCurrent = scrollProgress();

    const drawFrame = (shaderTime: number, scroll: number) => {
      gl.uniform1f(timeUniform, shaderTime);
      gl.uniform1f(fidelityUniform, FIDELITY);
      gl.uniform1f(scrollUniform, scroll);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const render = (time: number) => {
      // Lenis already smooths the scroll; the lerp adds a slow settle so the
      // backdrop trails the content instead of snapping with it
      scrollCurrent += (scrollProgress() - scrollCurrent) * 0.06;
      drawFrame(time * 3e-4 * SPEED, scrollCurrent);
      frame = document.hidden ? 0 : requestAnimationFrame(render);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
      if (reducedMotion) drawFrame(STATIC_TIME, scrollProgress());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const handleScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        drawFrame(STATIC_TIME, scrollProgress());
      });
    };

    const handleVisibility = () => {
      if (!reducedMotion && !document.hidden && !frame) {
        frame = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    if (reducedMotion) {
      drawFrame(STATIC_TIME, scrollCurrent);
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      frame = requestAnimationFrame(render);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteProgram(program);
    };
  }, [active, reducedMotion]);

  if (!active) {
    return <StaticGlow />;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 mix-blend-screen pointer-events-none opacity-50"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
