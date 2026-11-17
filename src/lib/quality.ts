// Progressive-enhancement capability detection. Never removes content — only scales visual cost.
export type QualityTier = 'high' | 'balanced' | 'low';

export interface Capabilities {
  tier: QualityTier;
  webgl: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  coarsePointer: boolean;
  /** Whether heavy WebGL scenes should mount at all. */
  allow3D: boolean;
  dpr: [number, number];
}

let cached: Capabilities | null = null;

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export function getCapabilities(): Capabilities {
  if (cached) return cached;
  if (typeof window === 'undefined') {
    return { tier: 'low', webgl: false, reducedMotion: true, saveData: true, coarsePointer: true, allow3D: false, dpr: [1, 1] };
  }
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
    deviceMemory?: number;
  };
  const mm = (q: string) => window.matchMedia(q).matches;
  const reducedMotion = mm('(prefers-reduced-motion: reduce)');
  const saveData = !!nav.connection?.saveData || mm('(prefers-reduced-data: reduce)');
  const slowNet = ['slow-2g', '2g', '3g'].includes(nav.connection?.effectiveType ?? '');
  const coarsePointer = mm('(pointer: coarse)');
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const webgl = hasWebGL();
  const smallScreen = window.innerWidth < 768;

  let tier: QualityTier = 'balanced';
  if (saveData || slowNet || cores <= 2 || memory <= 2) tier = 'low';
  else if (coarsePointer && (smallScreen || cores <= 4 || memory <= 4)) tier = 'low';
  else if (!coarsePointer && cores >= 8 && memory >= 8 && window.innerWidth >= 1200) tier = 'high';

  const dpr: [number, number] = tier === 'high' ? [1, 2] : tier === 'balanced' ? [1, 1.5] : [1, 1.25];

  cached = {
    tier,
    webgl,
    reducedMotion,
    saveData,
    coarsePointer,
    allow3D: webgl && !reducedMotion && !saveData && !slowNet,
    dpr,
  };
  return cached;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
