import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { getCapabilities } from '../../lib/quality';
import { useInViewport, useNearViewport, usePageVisible } from '../../lib/hooks';

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export interface SceneProps {
  active: boolean;
  onReady: () => void;
  onFail: () => void;
  dpr: [number, number];
  tier: 'high' | 'balanced' | 'low';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Loader = () => Promise<{ default: React.ComponentType<any> }>;

/**
 * Mounts a WebGL scene only when (a) the device can afford it and (b) the section is near the viewport.
 * The static `fallback` is always rendered underneath, so content never depends on WebGL.
 */
export function InteractiveCanvas({
  load,
  fallback,
  className = '',
  sceneProps = {},
  eager = false,
}: {
  load: Loader;
  fallback: ReactNode;
  className?: string;
  sceneProps?: Record<string, unknown>;
  eager?: boolean;
}) {
  const [nearRef, near] = useNearViewport<HTMLDivElement>('300px');
  const box = useRef<HTMLDivElement>(null);
  const visible = useInViewport(box);
  const pageVisible = usePageVisible();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [caps] = useState(() => getCapabilities());
  const [Scene, setScene] = useState<React.ComponentType<SceneProps & Record<string, unknown>> | null>(null);
  const loadRef = useRef(load);

  const shouldMount = caps.allow3D && !failed && (near || eager);

  useEffect(() => {
    if (!shouldMount || Scene) return;
    let cancelled = false;
    const start = () =>
      loadRef.current().then((m) => {
        if (!cancelled) setScene(() => m.default);
      }).catch(() => setFailed(true));
    // Let the page paint and become interactive first.
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number }).requestIdleCallback;
    const handle = idle ? idle(start, { timeout: 1200 }) : window.setTimeout(start, 300);
    return () => {
      cancelled = true;
      if (!idle) clearTimeout(handle);
    };
  }, [shouldMount, Scene]);

  return (
    <div
      ref={(el) => {
        (nearRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        box.current = el;
      }}
      className={`ic ${ready && !failed ? 'ic-ready' : ''} ${className}`}
    >
      <div className="ic-fallback">{fallback}</div>
      {Scene && !failed && (
        <SceneBoundary fallback={null} onError={() => setFailed(true)}>
          <Suspense fallback={null}>
            <div className="ic-canvas">
              <Scene
                active={visible && pageVisible}
                onReady={() => setReady(true)}
                onFail={() => setFailed(true)}
                dpr={caps.dpr}
                tier={caps.tier}
                {...sceneProps}
              />
            </div>
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}

export const lazyScene = (l: Loader) => lazy(l);
