import { STARS } from '../data/aquarius';

const NS       = 'http://www.w3.org/2000/svg';
const VW       = 800;
const VH       = 500;
const BG_COUNT = 45;

let _init = false;

export function initConstellation(container: HTMLElement): void {
  if (_init) return;
  _init = true;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const svg     = buildSVG();
  container.appendChild(svg);

  const defs       = svg.querySelector<SVGDefsElement>('defs')!;
  const bgGroup    = svg.getElementById('c-bg')    as SVGGElement;
  const starGroup  = svg.getElementById('c-stars') as SVGGElement;
  const driftGroup = svg.getElementById('c-drift') as SVGGElement;

  addGradients(defs);

  const bgStars = buildBgStars(bgGroup);
  const stars   = buildStars(starGroup, reduced);

  if (reduced) {
    bgStars.forEach(({ el, opacity }) => { el.style.opacity = opacity; });
    stars.forEach(g => { g.style.opacity = '1'; });
    return;
  }

  // Background stars fade in ahead of the constellation
  bgStars.forEach(({ el, opacity }, i) => {
    setTimeout(() => {
      el.style.transition = 'opacity 1.8s ease';
      el.style.opacity    = opacity;
    }, 80 + i * 18);
  });

  runAppearance(stars, driftGroup);
}

// ── SVG structure ─────────────────────────────────────────────────────────────

function buildSVG(): SVGSVGElement {
  const svg = el<SVGSVGElement>('svg');
  svg.setAttribute('viewBox', '0 0 800 500');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';

  svg.appendChild(el<SVGDefsElement>('defs'));

  const drift = el<SVGGElement>('g');
  drift.id = 'c-drift';

  (['c-bg', 'c-stars'] as const).forEach(id => {
    const g = el<SVGGElement>('g');
    g.id = id;
    drift.appendChild(g);
  });

  svg.appendChild(drift);
  return svg;
}

// ── Gradients ─────────────────────────────────────────────────────────────────

function addGradients(defs: SVGDefsElement): void {
  const STOPS: [string, string][] = [
    ['0%',   '1'    ],
    ['2%',   '0.9'  ],
    ['5%',   '0.65' ],
    ['10%',  '0.35' ],
    ['18%',  '0.15' ],
    ['30%',  '0.07' ],
    ['50%',  '0.025'],
    ['75%',  '0.008'],
    ['100%', '0'    ],
  ];

  STARS.forEach((_, i) => {
    const grad = el<SVGRadialGradientElement>('radialGradient');
    grad.id = `csg${i}`;
    grad.setAttribute('cx', '50%');
    grad.setAttribute('cy', '50%');
    grad.setAttribute('r', '50%');

    STOPS.forEach(([offset, opacity]) => {
      const s = el<SVGStopElement>('stop');
      s.setAttribute('offset', offset);
      s.setAttribute('stop-color', 'white');
      s.setAttribute('stop-opacity', opacity);
      grad.appendChild(s);
    });
    defs.appendChild(grad);
  });
}

// ── Background stars ──────────────────────────────────────────────────────────

function buildBgStars(group: SVGGElement): { el: SVGCircleElement; opacity: string }[] {
  const rng = seededRng(13);
  return Array.from({ length: BG_COUNT }, () => {
    const c = el<SVGCircleElement>('circle');
    c.setAttribute('cx', (rng() * 800).toFixed(1));
    c.setAttribute('cy', (rng() * 500).toFixed(1));
    c.setAttribute('r',  (0.4 + rng() * 0.9).toFixed(2));
    c.setAttribute('fill', 'white');
    c.style.opacity = '0';
    group.appendChild(c);
    return { el: c, opacity: (0.1 + rng() * 0.32).toFixed(2) };
  });
}

// ── Constellation stars ───────────────────────────────────────────────────────

function buildStars(group: SVGGElement, reduced: boolean): SVGGElement[] {
  return STARS.map((s, i) => {
    const g = el<SVGGElement>('g');
    g.style.opacity = '0';
    if (!reduced) {
      // Initial state for scale-up entrance
      g.style.transform       = 'scale(0.4)';
      g.style.transformOrigin = `${s.x * VW}px ${s.y * VH}px`;
    }

    // Core pequeño + halo difuso = efecto de lucero real
    const coreR = Math.max(0.6, s.radius * 0.3);
    const haloR = Math.max(s.radius * 12, 18);

    const halo = el<SVGCircleElement>('circle');
    halo.setAttribute('cx', `${s.x * VW}`);
    halo.setAttribute('cy', `${s.y * VH}`);
    halo.setAttribute('r',  `${haloR}`);
    halo.setAttribute('fill', `url(#csg${i})`);
    halo.setAttribute('data-role', 'halo');

    const core = el<SVGCircleElement>('circle');
    core.setAttribute('cx', `${s.x * VW}`);
    core.setAttribute('cy', `${s.y * VH}`);
    core.setAttribute('r',  `${coreR}`);
    core.setAttribute('fill', 'white');
    core.setAttribute('data-role', 'core');

    g.appendChild(halo);
    g.appendChild(core);
    group.appendChild(g);
    return g;
  });
}

// ── Appearance sequence ───────────────────────────────────────────────────────

async function runAppearance(
  stars:      SVGGElement[],
  driftGroup: SVGGElement,
): Promise<void> {
  const STAR_STAGGER = 110; // ms between each star
  const STAR_FADE    = 700; // ms for fade + scale

  stars.forEach((g, i) => {
    setTimeout(() => {
      g.style.transition = `opacity ${STAR_FADE}ms ease-out, transform ${STAR_FADE}ms ease-out`;
      g.style.transform  = 'scale(1)';
      g.style.opacity    = '1';
    }, i * STAR_STAGGER);
  });

  await sleep((stars.length - 1) * STAR_STAGGER + STAR_FADE + 400);

  addTwinkle(stars);
  startDrift(driftGroup);
}

// ── Steady-state behaviors ────────────────────────────────────────────────────

function addTwinkle(stars: SVGGElement[]): void {
  stars.forEach((g, i) => {
    const halo = g.querySelector('[data-role="halo"]') as SVGCircleElement | null;
    if (!halo) return;

    const dur   = (2.5 + (i * 0.37) % 3.5).toFixed(2);
    const delay = ((i * 0.53) % 4.0).toFixed(2);
    halo.style.animation = `con-twinkle ${dur}s ${delay}s ease-in-out infinite alternate`;
  });
}

function startDrift(group: SVGGElement): void {
  const AMP    = 4;     // px max displacement
  const PERIOD = 18000; // ms per full Lissajous cycle
  const t0     = performance.now();

  (function tick(now: number) {
    const t  = (now - t0) / PERIOD;
    const dx = (Math.sin(t * Math.PI * 2) * AMP).toFixed(2);
    const dy = (Math.cos(t * Math.PI * 2 * 0.7) * AMP).toFixed(2);
    group.style.transform = `translate(${dx}px, ${dy}px)`;
    requestAnimationFrame(tick);
  })(t0);
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function el<T extends SVGElement>(tag: string): T {
  return document.createElementNS(NS, tag) as T;
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

/** Linear Congruential Generator — same seed → same star layout every load. */
function seededRng(seed: number): () => number {
  let s = seed;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) | 0;
    return (s >>> 0) / 4294967295;
  };
}
