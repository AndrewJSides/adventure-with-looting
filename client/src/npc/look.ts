// How each cast member reads at a glance: clearly a man or clearly a woman.
//
// drawNpc in App.tsx used to give every NPC without a hand-made hairdo the
// same broad torso and a chin beard in their hair colour, so Tamsin, Bria,
// Nia, Dr. Hale and the rest were drawn bearded. This file owns the parts of
// the in-world figure that say "man" or "woman": shoulders and waist, head
// shape, hair, beards and a few face marks. drawNpc calls into it.

import type { CastNpcId } from "./cast";
import type { Gender } from "./types";

type HairStyle =
  // men
  | "short" | "swept" | "curls" | "bald" | "hat"
  // women
  | "long" | "bob" | "bun" | "ponytail" | "braid" | "curly" | "bandana" | "hood" | "headscarf" | "redBraid";
type Beard = "none" | "stubble" | "chin" | "full";

export type CastLook = { gender: Gender; hair: HairStyle; beard: Beard; glasses?: boolean };

// Hair and beards follow each person's portrait.
export const CAST_LOOK: Record<CastNpcId, CastLook> = {
  // women
  mara: { gender: "female", hair: "headscarf", beard: "none" },
  elowen: { gender: "female", hair: "redBraid", beard: "none" },
  sable: { gender: "female", hair: "ponytail", beard: "none" },
  tamsin: { gender: "female", hair: "bun", beard: "none" },
  juno: { gender: "female", hair: "bob", beard: "none" },
  bria: { gender: "female", hair: "long", beard: "none" },
  ysra: { gender: "female", hair: "braid", beard: "none" },
  nia: { gender: "female", hair: "curly", beard: "none" },
  cora: { gender: "female", hair: "ponytail", beard: "none" },
  edda: { gender: "female", hair: "long", beard: "none" },
  suri: { gender: "female", hair: "long", beard: "none" },
  patch: { gender: "female", hair: "bandana", beard: "none" },
  veiled: { gender: "female", hair: "hood", beard: "none" },
  sel: { gender: "female", hair: "bob", beard: "none" },
  mira: { gender: "female", hair: "braid", beard: "none" },
  imogen: { gender: "female", hair: "ponytail", beard: "none" },
  // men
  orin: { gender: "male", hair: "bald", beard: "full" },
  kael: { gender: "male", hair: "curls", beard: "none" },
  rowan: { gender: "male", hair: "short", beard: "full" },
  vale: { gender: "male", hair: "short", beard: "full" },
  maro: { gender: "male", hair: "short", beard: "full" },
  tomas: { gender: "male", hair: "short", beard: "stubble" },
  rook: { gender: "male", hair: "short", beard: "stubble" },
  fen: { gender: "male", hair: "short", beard: "stubble" },
  lark: { gender: "male", hair: "swept", beard: "none" },
  alden: { gender: "male", hair: "short", beard: "stubble" },
  ilyan: { gender: "male", hair: "short", beard: "chin", glasses: true },
  lio: { gender: "male", hair: "short", beard: "stubble" },
  marsh: { gender: "male", hair: "short", beard: "chin" },
  cobb: { gender: "male", hair: "short", beard: "full" },
  preacher: { gender: "male", hair: "hat", beard: "full" },
};

export type Figure = {
  /** Horizontal squash applied to the whole figure. */
  widthScale: number;
  shoulder: number;
  torsoHalf: number;
  /** Narrow point of the coat at y=8. Women only; men are drawn straight. */
  waist: number | null;
  /** Half-width of the coat hem at y=24. */
  hem: number;
  headW: number;
  headH: number;
};

const FIGURE: Record<Gender, Figure> = {
  male: { widthScale: 1, shoulder: 20.5, torsoHalf: 22, waist: null, hem: 17, headW: 14.5, headH: 14 },
  female: { widthScale: 1, shoulder: 15, torsoHalf: 16.5, waist: 11.5, hem: 15.5, headW: 12, headH: 14.5 },
};
const FIGURE_TUNING: Partial<Record<CastNpcId, Partial<Figure>>> = {
  mara: { headW: 12.5, headH: 15 },
  elowen: { widthScale: 0.92, headW: 11.5, headH: 15.5 },
  kael: { widthScale: 0.9 },
  orin: { widthScale: 1.08 },
};

const lookOf = (id: string): CastLook => CAST_LOOK[id as CastNpcId] ?? { gender: "male", hair: "short", beard: "none" };

export function npcFigure(id: string): Figure {
  return { ...FIGURE[lookOf(id).gender], ...FIGURE_TUNING[id as CastNpcId] };
}

/** Coat outline: straight for men, fitted at the waist for women. Caller fills. */
export function traceNpcCoat(ctx: CanvasRenderingContext2D, figure: Figure): void {
  const { shoulder, waist, hem } = figure;
  ctx.moveTo(-shoulder, -5);
  ctx.lineTo(0, -14);
  ctx.lineTo(shoulder, -5);
  if (waist !== null) ctx.lineTo(waist, 8);
  ctx.lineTo(hem, 24);
  ctx.lineTo(-hem, 24);
  if (waist !== null) ctx.lineTo(-waist, 8);
  ctx.closePath();
}

// ---------------------------------------------------------------- hair

function crown(ctx: CanvasRenderingContext2D, w: number): void {
  ctx.beginPath();
  ctx.ellipse(0, -26, w + 1.6, 12.6, 0, Math.PI, Math.PI * 2);
  ctx.fill();
  // a soft fringe so the hairline is not a ruler-straight cap
  ctx.beginPath();
  ctx.moveTo(-w - 1.6, -26.5);
  ctx.quadraticCurveTo(-w * 0.35, -31.5, 0.5, -27.6);
  ctx.quadraticCurveTo(w * 0.5, -31.8, w + 1.6, -26.5);
  ctx.lineTo(w + 1.6, -24.5);
  ctx.quadraticCurveTo(w * 0.5, -28.4, 0.5, -25.6);
  ctx.quadraticCurveTo(-w * 0.35, -28.8, -w - 1.6, -24.5);
  ctx.closePath();
  ctx.fill();
}

/** Hair that frames the face and falls to `bottom` (y). */
function curtains(ctx: CanvasRenderingContext2D, w: number, bottom: number, sides: (-1 | 1)[] = [-1, 1]): void {
  for (const s of sides) {
    ctx.beginPath();
    ctx.moveTo(s * (w + 1.6), -27);
    ctx.bezierCurveTo(s * (w + 4.5), -17, s * (w + 5), bottom - 9, s * (w + 2.5), bottom);
    ctx.lineTo(s * (w - 2.5), bottom - 2);
    ctx.bezierCurveTo(s * (w - 0.5), bottom - 10, s * (w - 1), -18, s * (w - 2.5), -25);
    ctx.closePath();
    ctx.fill();
  }
}

function braidDown(ctx: CanvasRenderingContext2D, x: number, top: number, bottom: number, light: string): void {
  ctx.save();
  ctx.strokeStyle = light;
  ctx.lineWidth = 1.4;
  for (let y = top; y <= bottom; y += 6) {
    const bx = x + Math.sin((y - top) / 9) * 1.2;
    ctx.beginPath();
    ctx.ellipse(bx, y, 3.4, 3.6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function beard(ctx: CanvasRenderingContext2D, style: Beard, w: number, hair: string): void {
  if (style === "none") return;
  if (style === "stubble") {
    ctx.fillStyle = "rgba(38,28,24,.34)";
    ctx.beginPath();
    ctx.moveTo(-w + 1.5, -21);
    ctx.bezierCurveTo(-w + 1, -12, -7, -9.5, 0, -9.5);
    ctx.bezierCurveTo(7, -9.5, w - 1, -12, w - 1.5, -21);
    ctx.bezierCurveTo(w - 4, -17, 4, -18.5, 0, -18.5);
    ctx.bezierCurveTo(-4, -18.5, -w + 4, -17, -w + 1.5, -21);
    ctx.fill();
    return;
  }
  ctx.fillStyle = hair;
  if (style === "chin") {
    ctx.beginPath();
    ctx.ellipse(0, -12, 9.5, 6.5, 0, 0, Math.PI);
    ctx.fill();
  } else {
    // full beard from the sideburns round the jaw
    ctx.beginPath();
    ctx.moveTo(-w + 0.5, -25);
    ctx.bezierCurveTo(-w - 0.5, -11, -8, -1, 0, 0);
    ctx.bezierCurveTo(8, -1, w + 0.5, -11, w - 0.5, -25);
    ctx.lineTo(w - 3, -22);
    ctx.bezierCurveTo(w - 4, -15, 4, -13, 0, -13);
    ctx.bezierCurveTo(-4, -13, -w + 4, -15, -w + 3, -22);
    ctx.closePath();
    ctx.fill();
  }
  // moustache
  ctx.beginPath();
  ctx.ellipse(-3.2, -17.2, 4, 1.7, 0.18, 0, Math.PI * 2);
  ctx.ellipse(3.2, -17.2, 4, 1.7, -0.18, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Hair, hats, hoods and beards. Drawn after the head and before the eyes.
 * The special cases for Orin, Mara, Elowen and Kael are the original
 * drawings from App.tsx, moved here unchanged.
 */
export function drawNpcHair(ctx: CanvasRenderingContext2D, id: string, hair: string, color: string, accent: string): void {
  const look = lookOf(id);
  const { headW: w } = npcFigure(id);
  ctx.save();
  ctx.fillStyle = hair;
  switch (look.hair) {
    case "bald":
      ctx.beginPath();
      ctx.arc(0, -24, 14, Math.PI * 1.08, Math.PI * 1.92);
      ctx.fill();
      ctx.fillStyle = "#6e6258";
      ctx.beginPath();
      ctx.ellipse(0, -12, 11, 7, 0, 0, Math.PI);
      ctx.fill();
      ctx.restore();
      return; // Orin's beard is part of his original drawing
    case "headscarf":
      ctx.fillStyle = "#625c4b";
      ctx.beginPath();
      ctx.ellipse(0, -28, 15, 12, 0, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-15, -29, 30, 7);
      ctx.fillStyle = "#89806a";
      ctx.strokeStyle = "#39352e";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-14, -29);
      ctx.quadraticCurveTo(0, -39, 15, -29);
      ctx.lineTo(11, -19);
      ctx.quadraticCurveTo(0, -26, -12, -18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // grey hair escaping the scarf on both sides
      ctx.fillStyle = hair;
      curtains(ctx, w - 0.5, -11);
      ctx.beginPath();
      ctx.arc(12, -19, 4.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "redBraid":
      ctx.fillStyle = "#713923";
      ctx.beginPath();
      ctx.ellipse(-1, -29, 13, 11, -0.18, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-12, -31);
      ctx.quadraticCurveTo(0, -40, 13, -29);
      ctx.quadraticCurveTo(6, -29, -2, -20);
      ctx.quadraticCurveTo(-6, -24, -12, -21);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#4a261c";
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-11, -20);
      ctx.quadraticCurveTo(-17, -8, -12, 4);
      ctx.quadraticCurveTo(-7, 14, -12, 26);
      ctx.stroke();
      ctx.strokeStyle = "#8d4a2e";
      ctx.lineWidth = 2;
      for (const [bx, by] of [[-13, -14], [-12, -7], [-10, 0], [-9, 7], [-10, 14], [-12, 21]] as const) {
        ctx.beginPath();
        ctx.arc(bx, by, 3.2, 0, Math.PI * 2);
        ctx.stroke();
      }
      break;
    case "curls":
      for (const [hx, hy, hr] of [[-9, -31, 7], [0, -34, 8], [9, -31, 7], [-11, -24, 6], [10, -24, 6]] as const) {
        ctx.beginPath();
        ctx.arc(hx, hy, hr, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case "short":
      ctx.beginPath();
      ctx.arc(0, -27, w, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-w + 1, -27, (w - 1) * 2, 4.5);
      // sideburns
      ctx.fillRect(-w + 0.5, -27, 3, 8);
      ctx.fillRect(w - 3.5, -27, 3, 8);
      break;
    case "swept":
      ctx.beginPath();
      ctx.arc(0, -27, w, Math.PI, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-w + 1, -27, (w - 1) * 2, 3);
      ctx.beginPath();
      ctx.moveTo(-w - 1, -28);
      ctx.quadraticCurveTo(-3, -40, w + 2, -33);
      ctx.quadraticCurveTo(6, -31, -1, -26);
      ctx.quadraticCurveTo(-7, -25, -w - 1, -24);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(-w + 0.5, -27, 3, 7);
      ctx.fillRect(w - 3.5, -27, 3, 7);
      break;
    case "hat":
      // grey hair under a wide-brimmed preacher's hat
      ctx.fillRect(-w - 0.5, -29, 4, 13);
      ctx.fillRect(w - 3.5, -29, 4, 13);
      ctx.fillStyle = "#24302e";
      ctx.beginPath();
      ctx.roundRect(-11, -47, 22, 16, 4);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, -31, 24, 5.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = accent;
      ctx.fillRect(-11, -35, 22, 3);
      break;
    case "long":
      crown(ctx, w);
      curtains(ctx, w, 4);
      break;
    case "bob":
      crown(ctx, w);
      curtains(ctx, w, -11);
      break;
    case "bun":
      crown(ctx, w);
      curtains(ctx, w - 1, -17);
      ctx.beginPath();
      ctx.arc(0, -38.5, 6.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "ponytail": {
      crown(ctx, w);
      curtains(ctx, w - 1, -16);
      ctx.beginPath();
      ctx.moveTo(w - 3, -35);
      ctx.bezierCurveTo(w + 11, -33, w + 11, -16, w + 6, -2);
      ctx.bezierCurveTo(w + 4, -12, w + 2, -22, w - 1, -28);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.ellipse(w + 2.5, -31, 2.2, 3, 0.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "braid":
      crown(ctx, w);
      curtains(ctx, w - 0.5, -14, [1]);
      ctx.fillStyle = hair;
      braidDown(ctx, -w + 0.5, -18, 14, "rgba(255,255,255,.18)");
      break;
    case "curly": {
      const curls: [number, number, number][] = [];
      for (let a = 0; a <= 8; a += 1) {
        const angle = Math.PI + (a / 8) * Math.PI;
        curls.push([Math.cos(angle) * (w + 2), -26 + Math.sin(angle) * 12.5, 5.6]);
      }
      for (const s of [-1, 1]) for (const y of [-20, -14, -8]) curls.push([s * (w + 2.5), y, 5]);
      for (const [cx, cy, r] of curls) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      crown(ctx, w);
      break;
    }
    case "bandana":
      crown(ctx, w);
      curtains(ctx, w, -5);
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(-w - 2, -28.5);
      ctx.quadraticCurveTo(0, -35.5, w + 2, -28.5);
      ctx.lineTo(w + 2, -32);
      ctx.quadraticCurveTo(0, -39.5, -w - 2, -32);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(w + 1, -31);
      ctx.lineTo(w + 8, -27);
      ctx.lineTo(w + 6, -23);
      ctx.closePath();
      ctx.fill();
      break;
    case "hood": {
      // dark hair visible inside the hood, then the hood with a face opening
      curtains(ctx, w - 0.5, -10);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-19, 2);
      ctx.bezierCurveTo(-23, -20, -15, -42, 0, -43);
      ctx.bezierCurveTo(15, -42, 23, -20, 19, 2);
      ctx.bezierCurveTo(10, -4, -10, -4, -19, 2);
      ctx.closePath();
      ctx.ellipse(0, -22.5, w - 0.5, 13.5, 0, 0, Math.PI * 2);
      ctx.fill("evenodd");
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, -22.5, w - 0.5, 13.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(12,9,18,.42)";
      ctx.beginPath();
      ctx.ellipse(0, -33.5, w - 1.5, 5.5, 0, 0, Math.PI);
      ctx.fill();
      break;
    }
  }
  beard(ctx, look.beard, w, hair);
  ctx.restore();
}

/** Brows for men; lashes and colour on the lips for women. Drawn after the eyes and mouth. */
export function drawNpcFace(ctx: CanvasRenderingContext2D, id: string, hair: string): void {
  const look = lookOf(id);
  ctx.save();
  ctx.lineCap = "round";
  if (look.gender === "male") {
    ctx.strokeStyle = look.hair === "hat" || look.hair === "bald" ? "#3a3330" : hair;
    ctx.lineWidth = 2.3;
    ctx.beginPath();
    ctx.moveTo(-8.6, -27.4);
    ctx.lineTo(-3, -26.5);
    ctx.moveTo(8.6, -27.4);
    ctx.lineTo(3, -26.5);
    ctx.stroke();
  } else {
    // thin arched brows and a flick of lashes at the outer corners
    ctx.strokeStyle = "rgba(40,28,24,.85)";
    ctx.lineWidth = 1.1;
    for (const cx of [-5, 5]) {
      ctx.beginPath();
      ctx.arc(cx, -24.6, 3.4, Math.PI * 1.18, Math.PI * 1.82);
      ctx.stroke();
    }
    ctx.strokeStyle = "#1b1513";
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(-6.4, -23.3);
    ctx.lineTo(-8, -24.1);
    ctx.moveTo(6.4, -23.3);
    ctx.lineTo(8, -24.1);
    ctx.stroke();
    ctx.fillStyle = "rgba(170,70,76,.92)";
    ctx.beginPath();
    ctx.ellipse(0.5, -15.5, 2.9, 1.35, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  if (look.glasses) {
    ctx.strokeStyle = "rgba(214,224,224,.9)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(-5, -23, 3.4, 0, Math.PI * 2);
    ctx.moveTo(8.4, -23);
    ctx.arc(5, -23, 3.4, 0, Math.PI * 2);
    ctx.moveTo(-1.6, -23.4);
    ctx.lineTo(1.6, -23.4);
    ctx.stroke();
  }
  ctx.restore();
}
