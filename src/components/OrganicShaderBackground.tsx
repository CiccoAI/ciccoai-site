import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

function AnimatedShader() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const [startTime] = useState(() => performance.now() / 1000);
  const lastFrameTime = useRef(performance.now());

  useFrame(() => {
    if (material.current) {
      const now = performance.now();
      // Detect large frame jumps (e.g., browser suspension)
      if (now - lastFrameTime.current > 5000) {
        console.warn('Browser likely suspended animation for', ((now - lastFrameTime.current) / 1000).toFixed(1), 'seconds');
      }
      lastFrameTime.current = now;
      const elapsed = now / 1000 - startTime;
      material.current.uniforms.u_time.value = elapsed;
    }
  });
  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={{
          u_time: { value: 0 },
          u_resolution: { value: [window.innerWidth, window.innerHeight] },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          // iq's classic 2D noise
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }
          uniform float u_time;
          uniform vec2 u_resolution;
          varying vec2 vUv;
          void main() {
            vec2 st = vUv * 2.0; // balanced gradient size
            float t = u_time * 0.25;
            // Animate the noise
            float n = noise(st + vec2(t, t * 0.5));
            float n2 = noise(st * 0.7 - vec2(t * 0.3, t * 0.2));
            float n3 = noise(st * 1.3 + vec2(-t * 0.2, t * 0.4));
            float organic = (n + n2 * 0.5 + n3 * 0.3);
            // 5 purple shades from light to dark
            vec3 shade1 = vec3(161.0/255.0, 120.0/255.0, 240.0/255.0); // #A178F0
            vec3 shade2 = vec3(132.0/255.0, 90.0/255.0, 207.0/255.0);  // #845ACF
            vec3 shade3 = vec3(102.0/255.0, 81.0/255.0, 169.0/255.0);  // #6651A9
            vec3 shade4 = vec3(73.0/255.0, 51.0/255.0, 126.0/255.0);   // #49337E
            vec3 shade5 = vec3(42.0/255.0, 29.0/255.0, 76.0/255.0);    // #2A1D4C
            // Blend between the 5 shades
            vec3 color;
            if (organic < 0.25) {
              color = mix(shade1, shade2, organic * 4.0);
            } else if (organic < 0.5) {
              color = mix(shade2, shade3, (organic - 0.25) * 4.0);
            } else if (organic < 0.75) {
              color = mix(shade3, shade4, (organic - 0.5) * 4.0);
            } else {
              color = mix(shade4, shade5, (organic - 0.75) * 4.0);
            }
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function OrganicShaderBackground({ hidden = false }: { hidden?: boolean }) {
  const [canvasKey, setCanvasKey] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        setCanvasKey(k => k + 1); // remount Canvas on tab focus
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const canvas = container.querySelector('canvas');
    if (!canvas) return;
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost! This is a browser/GPU event.');
    };
    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, [canvasKey]);

  return (
    <div ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', opacity: hidden ? 0 : 1, transition: 'opacity 0.5s' }}>
      <Canvas key={canvasKey} gl={{ alpha: true }} camera={{ position: [0, 0, 1], fov: 50 }} style={{ width: '100vw', height: '100vh', background: 'transparent' }}>
        <AnimatedShader />
      </Canvas>
    </div>
  );
} 