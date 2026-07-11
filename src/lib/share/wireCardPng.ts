/**
 * Wire card share renderer — Till spec v1.0, dark variant.
 *
 * Renders the votive tablet directly on a <canvas> and returns a PNG
 * Blob. Canvas output sidesteps the SVG font-portability problem
 * entirely: the PNG carries no font dependencies (the "text as paths"
 * requirement is satisfied by rasterization).
 *
 * Artboards:
 *   square — 1080×1080, chambers in one row  (feeds, kind:20)
 *   story  — 1080×1920, chambers 2×2, link chip at bottom
 *
 * Dark is the default for share exports per spec: basalt ground and
 * gold inscription stop the scroll; light cards vanish in feeds.
 */

import type { Wire } from '@/lib/wire';
import { formatWire } from '@/lib/wire';

export type ShareFormat = 'square' | 'story';

export interface ShareCardOptions {
  format: ShareFormat;
  displayName?: string;
  npubShort?: string;
  /** Link line for the story chip, e.g. "delphi.app/w/npub1…" */
  link?: string;
}

// ─── Palette (dark variant, spec §2) ───
const BASALT = '#191713';
const BONE = '#EFE9DC';
const ORACLE = '#C9A227';
const UMBRA = '#4A4238';
const ASH = '#6B6558';

const FRAUNCES = '"Fraunces Variable", Fraunces, Georgia, serif';
const MONO = '"IBM Plex Mono", ui-monospace, monospace';

interface ChamberData {
  label: string;
  value?: string;
  sub?: string;
}

function chambersOf(wire: Wire): ChamberData[] {
  return [
    { label: 'JUNG', value: wire.jung?.type },
    {
      label: 'HD',
      value: wire.humanDesign?.type,
      sub: wire.humanDesign?.profile,
    },
    { label: 'NUM', value: wire.millman?.number },
    {
      label: 'ENNEA',
      value: wire.enneagram ? `${wire.enneagram.core}w${wire.enneagram.wing}` : undefined,
    },
  ];
}

/** Ensure the display faces are loaded before drawing. */
async function ensureFonts(): Promise<void> {
  if (typeof document === 'undefined' || !document.fonts) return;
  try {
    await Promise.all([
      document.fonts.load(`500 64px ${FRAUNCES}`),
      document.fonts.load(`500 40px ${MONO}`),
      document.fonts.load(`400 28px ${MONO}`),
    ]);
  } catch {
    // Fall back to whatever is available — never block the export.
  }
}

/** Engraved double-line rectangle: carved umbra stroke + subtle inner highlight. */
function engravedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save();
  ctx.strokeStyle = 'rgba(74, 66, 56, 0.9)'; // umbra
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 3, y + 3, w - 6, h - 6);
  ctx.restore();
}

/** The omphalos mark, drawn at (cx, baseY) with the given width. */
function drawOmphalos(ctx: CanvasRenderingContext2D, cx: number, baseY: number, width: number, color: string) {
  const h = width * 0.72;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineCap = 'round';
  ctx.lineWidth = Math.max(2, width * 0.055);

  // Dome
  ctx.beginPath();
  ctx.ellipse(cx, baseY, width / 2, h, 0, Math.PI, 2 * Math.PI);
  ctx.stroke();
  // Base line
  ctx.beginPath();
  ctx.moveTo(cx - width * 0.62, baseY);
  ctx.lineTo(cx + width * 0.62, baseY);
  ctx.stroke();
  // Three carved bands, fading upward
  ctx.lineWidth = Math.max(1.5, width * 0.035);
  const bands = [
    { y: baseY - h * 0.28, half: width * 0.44, alpha: 0.7 },
    { y: baseY - h * 0.56, half: width * 0.36, alpha: 0.5 },
    { y: baseY - h * 0.82, half: width * 0.24, alpha: 0.35 },
  ];
  for (const b of bands) {
    ctx.globalAlpha = b.alpha;
    ctx.beginPath();
    ctx.moveTo(cx - b.half, b.y);
    ctx.lineTo(cx + b.half, b.y);
    ctx.stroke();
  }
  ctx.restore();
}

/** ~2% mono noise grain over the whole surface. */
function drawGrain(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const image = ctx.getImageData(0, 0, w, h);
  const data = image.data;
  for (let i = 0; i < data.length; i += 4) {
    const n = (Math.random() - 0.5) * 10; // ±5 luminance
    data[i] += n;
    data[i + 1] += n;
    data[i + 2] += n;
  }
  ctx.putImageData(image, 0, 0);
}

/** Wrap text into at most maxLines lines that fit maxWidth. */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const attempt = current ? `${current} ${word}` : word;
    if (ctx.measureText(attempt).width <= maxWidth || !current) {
      current = attempt;
    } else {
      lines.push(current);
      current = word;
      if (lines.length === maxLines - 1) break;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function drawChamber(
  ctx: CanvasRenderingContext2D,
  c: ChamberData,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  engravedRect(ctx, x, y, w, h);

  // Label
  ctx.fillStyle = ASH;
  ctx.font = `500 22px ${MONO}`;
  ctx.textAlign = 'center';
  ctx.fillText(c.label, x + w / 2, y + 46);

  if (c.value) {
    ctx.fillStyle = BONE;
    ctx.font = `500 ${c.sub ? 40 : 46}px ${FRAUNCES}`;
    const lines = wrapText(ctx, c.value, w - 28, 2);
    const baseY = y + h / 2 + (c.sub ? 2 : 14) - (lines.length - 1) * 22;
    lines.forEach((line, i) => ctx.fillText(line, x + w / 2, baseY + i * 46));
    if (c.sub) {
      ctx.fillStyle = ASH;
      ctx.font = `400 30px ${FRAUNCES}`;
      ctx.fillText(c.sub, x + w / 2, y + h / 2 + 52);
    }
  } else {
    // The prepared niche
    ctx.strokeStyle = ASH;
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 6]);
    ctx.beginPath();
    ctx.moveTo(x + w / 2 - 34, y + h / 2 + 4);
    ctx.lineTo(x + w / 2 + 34, y + h / 2 + 4);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = ASH;
    ctx.font = `400 22px ${MONO}`;
    ctx.fillText('unwritten', x + w / 2, y + h / 2 + 46);
  }
}

/**
 * Render the Wire card as a PNG Blob.
 */
export async function renderWireCardPng(wire: Wire, opts: ShareCardOptions): Promise<Blob> {
  await ensureFonts();

  const W = 1080;
  const H = opts.format === 'square' ? 1080 : 1920;
  const M = 84; // outer margin

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context unavailable');

  // ─── Ground ───
  ctx.fillStyle = BASALT;
  ctx.fillRect(0, 0, W, H);

  // Tablet frame
  engravedRect(ctx, 36, 36, W - 72, H - 72);

  // ─── Header strip ───
  drawOmphalos(ctx, M + 30, M + 42, 52, ASH);
  ctx.fillStyle = ASH;
  ctx.font = `500 26px ${MONO}`;
  ctx.textAlign = 'right';
  ctx.fillText('D E L P H I', W - M, M + 36);

  let cursorY = opts.format === 'square' ? M + 150 : M + 220;

  // ─── Name + npub ───
  ctx.textAlign = 'center';
  if (opts.displayName) {
    ctx.fillStyle = BONE;
    ctx.font = `500 ${opts.format === 'square' ? 64 : 76}px ${FRAUNCES}`;
    ctx.fillText(opts.displayName, W / 2, cursorY);
    cursorY += 52;
  }
  if (opts.npubShort) {
    ctx.fillStyle = ASH;
    ctx.font = `400 26px ${MONO}`;
    ctx.fillText(opts.npubShort, W / 2, cursorY);
    cursorY += 40;
  }

  // Engraved rule
  cursorY += 20;
  ctx.strokeStyle = 'rgba(107,101,88,0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(M, cursorY);
  ctx.lineTo(W - M, cursorY);
  ctx.stroke();

  // ─── Chambers ───
  const chambers = chambersOf(wire);
  const gap = 24;

  if (opts.format === 'square') {
    const cw = (W - 2 * M - 3 * gap) / 4;
    const ch = 250;
    const cy = cursorY + 56;
    chambers.forEach((c, i) => drawChamber(ctx, c, M + i * (cw + gap), cy, cw, ch));
    cursorY = cy + ch + 96;
  } else {
    const cw = (W - 2 * M - gap) / 2;
    const ch = 330;
    const cy = cursorY + 72;
    chambers.forEach((c, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      drawChamber(ctx, c, M + col * (cw + gap), cy + row * (ch + gap), cw, ch);
    });
    cursorY = cy + 2 * ch + gap + 130;
  }

  // ─── THE WIRE — mono gold, highest contrast ───
  const wireStr = formatWire(wire).toUpperCase();
  if (wireStr) {
    ctx.fillStyle = ORACLE;
    ctx.font = `500 ${opts.format === 'square' ? 38 : 44}px ${MONO}`;
    const lines = wrapText(ctx, wireStr, W - 2 * M, 2);
    lines.forEach((line, i) => {
      ctx.fillText(line, W / 2, cursorY + i * (opts.format === 'square' ? 54 : 62));
    });
    cursorY += lines.length * 58;
  }

  // ─── Story link chip ───
  if (opts.format === 'story' && opts.link) {
    ctx.font = `400 30px ${MONO}`;
    const tw = ctx.measureText(opts.link).width;
    const chipW = tw + 88;
    const chipH = 74;
    const chipX = (W - chipW) / 2;
    const chipY = H - M - 190;
    engravedRect(ctx, chipX, chipY, chipW, chipH);
    ctx.fillStyle = BONE;
    ctx.fillText(opts.link, W / 2, chipY + 48);
  }

  // ─── Footer: motto left, seal center-none, issued right ───
  const footY = H - M - 20;
  ctx.fillStyle = UMBRA;
  ctx.font = `500 26px ${FRAUNCES}`;
  ctx.textAlign = 'left';
  ctx.fillText('\u0393 \u039D \u03A9 \u0398 \u0399   \u03A3 \u0395 \u0391 \u03A5 \u03A4 \u039F \u039D', M, footY);
  ctx.fillStyle = ASH;
  ctx.font = `400 24px ${MONO}`;
  ctx.textAlign = 'right';
  const issued = new Date().toLocaleDateString('en-GB', { month: '2-digit', year: '2-digit' }).replace('/', '\u00B7');
  ctx.fillText(`issued ${issued}`, W - M, footY);

  // ─── Grain last, over everything ───
  drawGrain(ctx, W, H);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('PNG encoding failed'));
    }, 'image/png');
  });
}
