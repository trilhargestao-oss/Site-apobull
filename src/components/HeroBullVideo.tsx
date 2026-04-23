"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroBullVideoProps {
  /** Ref da `<section>` do hero — usada como target do useScroll. */
  targetRef: RefObject<HTMLElement>;
  className?: string;
  /** Largura em px. O aspect ratio do vídeo é 9:16 (retrato). */
  width?: number;
}

// Shader vertex — mapeia um quad full-screen e coordenadas de textura.
const VERT_SRC = `
  attribute vec2 a_pos;
  attribute vec2 a_tex;
  varying vec2 v_tex;
  void main() {
    v_tex = a_tex;
    gl_Position = vec4(a_pos, 0.0, 1.0);
  }
`;

// Shader fragment — chroma-key verde robusto.
//
// H.264 4:2:0 subsampling causa "chroma bleed" nas bordas do sujeito:
// pixels do touro ficam com tinta verde residual. Combina duas métricas:
//   A) greenness = G − max(R,B) — dominância do verde
//   B) distância Euclidiana até o verde puro (0,1,0)
// O min() das duas aumenta a área detectada, pegando também gradientes
// de bleed. Depois um despill forte zera qualquer halo esverdeado.
const FRAG_SRC = `
  precision mediump float;
  uniform sampler2D u_video;
  varying vec2 v_tex;
  void main() {
    vec4 c = texture2D(u_video, v_tex);
    vec3 rgb = c.rgb;

    // A) chromaticidade — o verde domina os outros canais
    float greenness = rgb.g - max(rgb.r, rgb.b);
    float alphaA = 1.0 - smoothstep(0.0, 0.15, greenness);

    // B) distância ao verde puro
    float dG = distance(rgb, vec3(0.0, 1.0, 0.0));
    float alphaB = smoothstep(0.35, 0.65, dG);

    // Mais agressivo dos dois (menor alpha → mais transparente)
    float alpha = min(alphaA, alphaB);

    // Despill: trava G ao teto de R/B — elimina halo verde na borda
    rgb.g = min(rgb.g, max(rgb.r, rgb.b));

    gl_FragColor = vec4(rgb * alpha, alpha);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/**
 * Vídeo do touro sincronizado ao scroll do hero, com chroma-key do fundo
 * branco feito em tempo real via shader WebGL no canvas. Funciona com
 * qualquer fonte (MP4 sem alpha), independente do navegador.
 *
 * Pipeline:
 *  1. `<video>` oculto reproduz o MP4, `currentTime` controlado pelo scroll.
 *  2. RAF amostra o vídeo e faz upload como textura WebGL.
 *  3. Shader fragment descarta pixels com luminância ≈ 1 (fundo branco),
 *     preservando cores do touro.
 *  4. Canvas final compõe normalmente sobre o hero (aurora vermelha
 *     aparece atrás do touro).
 */
export function HeroBullVideo({
  targetRef,
  className,
  width = 320,
}: HeroBullVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingTimeRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const reduce = useReducedMotion();

  // offset ["start start", "end end"] mapeia o progresso 0→1 EXATAMENTE
  // à duração do pin (enquanto o sticky está travado no topo da viewport).
  // Quando o bull video chega no fim, o pin solta e a próxima seção aparece.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Setup do canvas WebGL e loop de render.
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let glCtx: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let posBuffer: WebGLBuffer | null = null;
    let texBuffer: WebGLBuffer | null = null;
    let loopId: number | null = null;

    const init = () => {
      glCtx =
        (canvas.getContext("webgl", {
          premultipliedAlpha: true,
          alpha: true,
        }) as WebGLRenderingContext | null) ??
        (canvas.getContext(
          "experimental-webgl"
        ) as WebGLRenderingContext | null);
      if (!glCtx) return;
      const gl = glCtx;

      program = createProgram(gl);
      if (!program) return;

      // Quad full-screen: 2 triângulos cobrindo -1..1
      const positions = new Float32Array([
        -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
      ]);
      // Coord. de textura com Y invertido porque WebGL tem origem bottom-left
      const texCoords = new Float32Array([
        0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0,
      ]);

      posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      texBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.useProgram(program);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    };

    const draw = () => {
      const gl = glCtx;
      if (!gl || !program || !texture || video.readyState < 2) return;

      // Ajusta viewport ao tamanho da textura caso metadados tenham chegado
      if (canvas.width !== video.videoWidth && video.videoWidth > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      // Upload do frame atual do vídeo como textura
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      try {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          video
        );
      } catch {
        // Vídeo ainda não pronto para upload
        return;
      }

      // Atributos
      const posLoc = gl.getAttribLocation(program, "a_pos");
      const texLoc = gl.getAttribLocation(program, "a_tex");

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
      gl.enableVertexAttribArray(texLoc);
      gl.vertexAttribPointer(texLoc, 2, gl.FLOAT, false, 0, 0);

      // Uniform
      const vidLoc = gl.getUniformLocation(program, "u_video");
      gl.uniform1i(vidLoc, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = () => {
      draw();
      loopId = requestAnimationFrame(loop);
    };

    const start = () => {
      setReady(true);
      init();
      loop();
    };

    if (video.readyState >= 1) start();
    else video.addEventListener("loadedmetadata", start, { once: true });

    return () => {
      if (loopId !== null) cancelAnimationFrame(loopId);
      video.removeEventListener("loadedmetadata", start);
      if (glCtx) {
        if (program) glCtx.deleteProgram(program);
        if (texture) glCtx.deleteTexture(texture);
        if (posBuffer) glCtx.deleteBuffer(posBuffer);
        if (texBuffer) glCtx.deleteBuffer(texBuffer);
      }
    };
  }, []);

  // Ajusta currentTime do vídeo conforme o scroll (rAF-throttled).
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const v = videoRef.current;
    if (!v || reduce || !v.duration || Number.isNaN(v.duration)) return;

    const target = Math.max(
      0,
      Math.min(v.duration * progress, v.duration - 0.05)
    );
    pendingTimeRef.current = target;

    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const t = pendingTimeRef.current;
      if (t === null || !videoRef.current) return;
      if (Math.abs(videoRef.current.currentTime - t) > 0.015) {
        try {
          videoRef.current.currentTime = t;
        } catch {
          /* noop */
        }
      }
    });
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative inline-block", className)}
      style={{ width }}
    >
      {/* Aurora vermelha atrás do touro */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-45"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(204,0,0,0.6) 0%, rgba(204,0,0,0) 60%)",
        }}
      />

      {/* Vídeo oculto — fonte dos frames (MP4 com chroma-key verde) */}
      <video
        ref={videoRef}
        src="/bull-scroll.mp4?v=10"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        crossOrigin="anonymous"
        className="hidden"
        aria-hidden
      />

      {/* Canvas onde o shader renderiza o touro com fundo transparente */}
      <canvas
        ref={canvasRef}
        width={720}
        height={1280}
        className="block w-full h-auto drop-shadow-[0_10px_40px_rgba(204,0,0,0.4)] select-none pointer-events-none"
        aria-label="APOBULL FC — animação do touro"
      />

      {!ready && (
        <div className="absolute inset-x-0 bottom-2 flex justify-center pointer-events-none">
          <div className="h-px w-16 bg-gold/40 animate-pulse" />
        </div>
      )}
    </motion.div>
  );
}
