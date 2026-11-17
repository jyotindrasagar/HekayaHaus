import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneProps } from './InteractiveCanvas';

const vert = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uIndex;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // gentle cloth-like bend that follows the pointer
    float bend = sin(uv.y * 3.14159 + uTime * 0.6 + uIndex) * 0.025;
    p.z += bend + uPointer.x * (uv.y - 0.5) * 0.06;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const frag = /* glsl */ `
  uniform sampler2D uMap;
  uniform vec4 uRect;      // x offset, y offset, width, height in texture space
  uniform float uReveal;   // 0..1
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uIndex;
  varying vec2 vUv;
  void main() {
    // reveal: slice wipes upward
    if (vUv.y > uReveal * 1.08) discard;
    vec2 uv = uRect.xy + vUv * uRect.zw;
    // subtle chromatic offset driven by pointer velocity proxy
    float shift = 0.0025 * (uPointer.x + sin(uTime * 0.4 + uIndex) * 0.4);
    float r = texture2D(uMap, uv + vec2(shift, 0.0)).r;
    vec2 gb = texture2D(uMap, uv).gb;
    vec3 col = vec3(r, gb);
    // edge sheen on each slice (architectural glass edge)
    float edge = smoothstep(0.0, 0.02, vUv.x) * smoothstep(1.0, 0.98, vUv.x);
    col = mix(vec3(0.86, 0.9, 1.0), col, edge);
    // soft top fade so the reveal edge feels luminous
    float glow = smoothstep(uReveal * 1.08 - 0.06, uReveal * 1.08, vUv.y) * (1.0 - step(0.999, uReveal));
    col += glow * vec3(0.09, 0.27, 1.0);
    gl_FragColor = vec4(col, 1.0);
  }
`;

interface SliceDef {
  x: number;
  w: number;
  y: number;
  h: number;
  z: number;
}

function Slices({ texture, tier, onFirstFrame }: { texture: THREE.Texture; tier: SceneProps['tier']; onFirstFrame: () => void }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2());
  const smooth = useRef(new THREE.Vector2());
  const start = useRef<number | null>(null);
  const firstFrame = useRef(false);
  const { viewport, size } = useThree();

  const img = texture.image as HTMLImageElement;
  const aspect = img.width / img.height; // portrait ~0.667
  const narrow = size.width < 700;

  // Slice layout in normalized portrait space (0..1). Varying heights echo an architectural skyline.
  const defs: SliceDef[] = useMemo(
    () =>
      narrow
        ? [
            { x: 0.06, w: 0.2, y: 0.12, h: 0.74, z: -0.1 },
            { x: 0.28, w: 0.22, y: 0.0, h: 1.0, z: 0.12 },
            { x: 0.52, w: 0.22, y: 0.04, h: 0.92, z: 0.04 },
            { x: 0.76, w: 0.18, y: 0.18, h: 0.66, z: -0.16 },
          ]
        : [
            { x: 0.02, w: 0.15, y: 0.22, h: 0.6, z: -0.25 },
            { x: 0.19, w: 0.17, y: 0.06, h: 0.88, z: 0.0 },
            { x: 0.38, w: 0.2, y: 0.0, h: 1.0, z: 0.18 },
            { x: 0.6, w: 0.17, y: 0.1, h: 0.8, z: 0.06 },
            { x: 0.79, w: 0.14, y: 0.26, h: 0.56, z: -0.2 },
          ],
    [narrow],
  );

  const height = Math.min(viewport.height * 0.92, (viewport.width * 0.9) / aspect);
  const width = height * aspect;

  const materials = useMemo(
    () =>
      defs.map(
        (d, i) =>
          new THREE.ShaderMaterial({
            vertexShader: vert,
            fragmentShader: frag,
            uniforms: {
              uMap: { value: texture },
              uRect: { value: new THREE.Vector4(d.x, 1 - d.y - d.h, d.w, d.h) },
              uReveal: { value: 0 },
              uTime: { value: 0 },
              uPointer: { value: new THREE.Vector2() },
              uIndex: { value: i },
            },
          }),
      ),
    [defs, texture],
  );
  const geo = useMemo(() => new THREE.PlaneGeometry(1, 1, 1, tier === 'low' ? 8 : 24), [tier]);

  useEffect(
    () => () => {
      materials.forEach((m) => m.dispose());
      geo.dispose();
    },
    [materials, geo],
  );

  useEffect(() => {
    const on = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
  }, []);

  useFrame((state, delta) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - start.current;
    smooth.current.lerp(pointer.current, Math.min(1, delta * 3));
    const p = smooth.current;
    if (group.current) {
      group.current.rotation.y = p.x * 0.22;
      group.current.rotation.x = -p.y * 0.1;
      group.current.position.x = p.x * 0.08;
    }
    materials.forEach((m, i) => {
      const local = Math.min(1, Math.max(0, (t - 0.15 - i * 0.12) / 1.3));
      m.uniforms.uReveal.value = 1 - Math.pow(1 - local, 4);
      m.uniforms.uTime.value = t;
      m.uniforms.uPointer.value.copy(p);
    });
    if (!firstFrame.current) {
      firstFrame.current = true;
      onFirstFrame();
    }
  });

  return (
    <group ref={group}>
      {defs.map((d, i) => (
        <mesh
          key={i}
          geometry={geo}
          material={materials[i]}
          scale={[d.w * width, d.h * height, 1]}
          position={[(d.x + d.w / 2 - 0.5) * width, (0.5 - d.y - d.h / 2) * height, d.z]}
        />
      ))}
    </group>
  );
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const m = new THREE.PointsMaterial({ color: '#1746FF', size: 0.018, transparent: true, opacity: 0.55, depthWrite: false, sizeAttenuation: true });
    return { geometry: g, material: m };
  }, [count]);
  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.02;
      ref.current.position.y = Math.sin(performance.now() * 0.0002) * 0.05;
    }
  });
  return <points ref={ref} geometry={geometry} material={material} />;
}

function Frame() {
  const ref = useRef<THREE.LineSegments>(null);
  const { geometry, material } = useMemo(() => {
    const g = new THREE.EdgesGeometry(new THREE.BoxGeometry(2.6, 3.6, 0.9));
    const m = new THREE.LineBasicMaterial({ color: '#1746FF', transparent: true, opacity: 0.35 });
    return { geometry: g, material: m };
  }, []);
  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.15) * 0.35 + 0.4;
      ref.current.rotation.x = 0.08;
    }
  });
  return <lineSegments ref={ref} geometry={geometry} material={material} position={[0.2, 0, -0.8]} />;
}

/** Drops resolution if the device can't hold a smooth frame rate. */
function AdaptiveDpr({ max }: { max: number }) {
  const { setDpr } = useThree();
  const samples = useRef<number[]>([]);
  const current = useRef(max);
  useFrame((_, d) => {
    samples.current.push(d);
    if (samples.current.length >= 60) {
      const avg = samples.current.reduce((a, b) => a + b, 0) / samples.current.length;
      samples.current = [];
      if (avg > 1 / 40 && current.current > 1) {
        current.current = Math.max(1, current.current - 0.25);
        setDpr(current.current);
      }
    }
  });
  return null;
}

function Loader({ src, children, onError }: { src: string; children: (t: THREE.Texture) => React.ReactNode; onError: () => void }) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  const errRef = useRef(onError);
  errRef.current = onError;
  useEffect(() => {
    let disposed = false;
    let loaded: THREE.Texture | null = null;
    new THREE.TextureLoader().load(
      src,
      (t) => {
        // Raw texture values; the shader writes them straight to the (sRGB) canvas, matching the CSS image.
        t.colorSpace = THREE.NoColorSpace;
        t.minFilter = THREE.LinearFilter;
        t.generateMipmaps = false;
        loaded = t;
        if (disposed) t.dispose();
        else setTex(t);
      },
      undefined,
      () => errRef.current(),
    );
    return () => {
      disposed = true;
      loaded?.dispose();
    };
  }, [src]);
  return tex ? <>{children(tex)}</> : null;
}

export default function HeroScene({ active, onReady, onFail, dpr, tier, src }: SceneProps & { src: string }) {
  const dust = tier === 'high' ? 700 : tier === 'balanced' ? 360 : 140;
  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: false }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault();
          onFail();
        });
      }}
    >
      <Loader src={src} onError={onFail}>{(tex) => <Slices texture={tex} tier={tier} onFirstFrame={onReady} />}</Loader>
      {tier !== 'low' && <Frame />}
      <Dust count={dust} />
      <AdaptiveDpr max={dpr[1]} />
    </Canvas>
  );
}
