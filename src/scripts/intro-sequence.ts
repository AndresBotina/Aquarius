import { PHASES } from '../data/intro';

const CHAR_WRITE_MS = 55;  // ms por caracter al escribir
const CHAR_ERASE_MS = 30;  // ms por caracter al borrar

let _started = false;

export function runIntro(): void {
  if (_started) return;
  _started = true;

  const inner         = document.getElementById('headline-inner') as HTMLElement | null;
  const cursor        = document.getElementById('cursor-line')    as HTMLElement | null;
  const contactWrap   = document.getElementById('contact-wrap')   as HTMLElement | null;
  const textWrapper   = document.getElementById('text-wrapper')   as HTMLElement | null;
  const dotsContainer = document.getElementById('dots')           as HTMLElement | null;
  const dots          = Array.from(document.querySelectorAll<HTMLElement>('.dot'));

  if (!inner || !cursor || !contactWrap) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    skipToEnd(inner, cursor, contactWrap, textWrapper, dotsContainer, dots);
    return;
  }

  runSequence(inner, cursor, contactWrap, textWrapper, dotsContainer, dots);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

function setDot(dots: HTMLElement[], index: number): void {
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function revealContact(el: HTMLElement): void {
  el.classList.add('visible');
  el.removeAttribute('aria-hidden');
}

function skipToEnd(
  inner:         HTMLElement,
  cursor:        HTMLElement,
  contactWrap:   HTMLElement,
  textWrapper:   HTMLElement | null,
  dotsContainer: HTMLElement | null,
  dots:          HTMLElement[],
): void {
  const last = PHASES[PHASES.length - 1];
  inner.textContent     = last.text;
  inner.style.opacity   = '1';
  inner.style.transform = 'none';
  inner.style.filter    = 'none';
  cursor.classList.toggle('visible', !last.hideCursor);
  revealContact(contactWrap);
  contactWrap.classList.add('finale');
  setDot(dots, PHASES.length - 1);
  if (textWrapper)   textWrapper.style.opacity   = '0';
  if (dotsContainer) dotsContainer.style.opacity = '0';
}

async function typeWrite(inner: HTMLElement, text: string): Promise<void> {
  inner.textContent = '';
  for (const char of text) {
    inner.textContent += char;
    await sleep(CHAR_WRITE_MS);
  }
}

async function typeErase(inner: HTMLElement): Promise<void> {
  const text = inner.textContent ?? '';
  for (let i = text.length; i > 0; i--) {
    inner.textContent = text.slice(0, i - 1);
    await sleep(CHAR_ERASE_MS);
  }
}

// ── Main sequence ─────────────────────────────────────────────────────────────

async function runSequence(
  inner:         HTMLElement,
  cursor:        HTMLElement,
  contactWrap:   HTMLElement,
  textWrapper:   HTMLElement | null,
  dotsContainer: HTMLElement | null,
  dots:          HTMLElement[],
): Promise<void> {
  inner.style.opacity   = '1';
  inner.style.transform = 'none';
  inner.style.filter    = 'none';
  inner.textContent     = '';

  await sleep(400);

  for (let i = 0; i < PHASES.length; i++) {
    const phase  = PHASES[i];
    const isLast = i === PHASES.length - 1;

    setDot(dots, i);

    // Cursor siempre visible mientras se escribe
    cursor.classList.add('visible');
    await typeWrite(inner, phase.text);

    // Después de escribir, aplicar preferencia de cursor
    cursor.classList.toggle('visible', !phase.hideCursor);

    if (isLast) break;

    await sleep(phase.duration);

    cursor.classList.add('visible');
    await typeErase(inner);
    await sleep(200);
  }

  // ── Finale ────────────────────────────────────────────────────────────────
  await sleep(PHASES[PHASES.length - 1].duration);

  revealContact(contactWrap);
  contactWrap.classList.add('finale');

  if (textWrapper) {
    textWrapper.style.transition = 'opacity 0.9s ease';
    textWrapper.style.opacity    = '0';
  }
  if (dotsContainer) {
    dotsContainer.style.transition = 'opacity 0.6s ease';
    dotsContainer.style.opacity    = '0';
  }
}
