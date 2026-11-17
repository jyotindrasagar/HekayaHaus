import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { SceneProps } from './InteractiveCanvas';

/**
 * Five architectural frames — one per process stage. The active stage steps forward in cobalt while the
 * others recede, so the structure "assembles" as the visitor reads the process.
 */
function Frames({ step, onFirstFrame }: { step: number; onFirstFrame: () => void }) {
  const group = useRef<THREE.Group>(null);
  const first = useRef(false);
  const pointer = useRef(new THREE.Vector2());
  const items = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const w = 1.6 + i * 0.35;
        const h = 2.4 - i * 0.12;
        const geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, 0.02 + i * 0.25));
        const material = new THREE.LineBasicMaterial({ color: '#0B0D12', transparent: true, opacity: 0.25 });
        const fill = new THREE.MeshBasicMaterial({ color: '#1746FF', transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
        const plane = new THREE.PlaneGeometry(w, h);
        return { geometry, material, fill, plane };
      }),
    [],
  );
  useEffect(
    () => () =>
      items.forEach((it) => {
        it.geometry.dispose();
        it.material.dispose();
        it.fill.dispose();
        it.plane.dispose();
      }),
    [items],
  );
  useEffect(() => {
    const on = (e: PointerEvent) => pointer.current.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
  }, []);

  const cobalt = useMemo(() => new THREE.Color('#1746FF'), []);
  const ink = useMemo(() => new THREE.Color('#0B0D12'), []);

  useFrame((s, d) => {
    const k = Math.min(1, d * 4);
    if (group.current) {
      group.current.rotation.y += ((-0.55 + step * 0.18 + pointer.current.x * 0.15) - group.current.rotation.y) * k;
      group.current.rotation.x += ((0.18 - pointer.current.y * 0.08) - group.current.rotation.x) * k;
      group.current.position.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.04;
    }
    group.current?.children.forEach((child, i) => {
      const active = i === step;
      const passed = i < step;
      const targetZ = active ? 0.9 : (i - step) * -0.45;
      child.position.z += (targetZ - child.position.z) * k;
      child.rotation.z += ((active ? 0 : (i - 2) * 0.06) - child.rotation.z) * k;
      const lines = child.children[0] as THREE.LineSegments;
      const plane = child.children[1] as THREE.Mesh;
      const lm = lines.material as THREE.LineBasicMaterial;
      lm.color.lerp(active || passed ? cobalt : ink, k);
      lm.opacity += ((active ? 0.95 : passed ? 0.5 : 0.18) - lm.opacity) * k;
      const pm = plane.material as THREE.MeshBasicMaterial;
      pm.opacity += ((active ? 0.12 : 0) - pm.opacity) * k;
    });
    if (!first.current) {
      first.current = true;
      onFirstFrame();
    }
  });

  return (
    <group ref={group}>
      {items.map((it, i) => (
        <group key={i} position={[0, 0, -i * 0.45]}>
          <lineSegments geometry={it.geometry} material={it.material} />
          <mesh geometry={it.plane} material={it.fill} />
        </group>
      ))}
    </group>
  );
}

export default function ArchitecturalScene({ active, onReady, onFail, dpr, tier, step = 0 }: SceneProps & { step?: number }) {
  return (
    <Canvas
      dpr={[1, Math.min(dpr[1], 1.5)]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onFail(); })}
    >
      <Frames step={step as number} onFirstFrame={onReady} />
    </Canvas>
  );
}
