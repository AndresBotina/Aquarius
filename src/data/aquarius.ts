/**
 * Aquarius constellation — real RA/Dec positions projected to viewBox fractions.
 *
 * Projection (atlas view, north up):
 *   x = (RA_decimal_hours − 21.30) / 2.25   [RA 21.30 h → 23.55 h]
 *   y = (3.0 − Dec_degrees)        / 20.0   [Dec +3° → −17°]
 *
 * Source data (J2000, Hipparcos/Yale BSC):
 *   β  RA 21h31m  Dec −05°34′   α  RA 22h05m  Dec −00°19′
 *   γ  RA 22h21m  Dec −01°23′   ζ  RA 22h28m  Dec −00°01′
 *   π  RA 22h25m  Dec +01°22′   η  RA 22h35m  Dec −00°07′
 *   θ  RA 22h16m  Dec −07°46′   λ  RA 22h52m  Dec −07°34′
 *   τ² RA 22h49m  Dec −13°35′   δ  RA 22h54m  Dec −15°49′
 *   φ  RA 23h14m  Dec −06°02′   ψ¹ RA 23h15m  Dec −09°04′
 *   χ  RA 23h16m  Dec −07°50′
 *
 * Radii are proportional to visual magnitude (brighter → larger).
 * x and y are 0–1 fractions; constellation.ts scales them to the viewBox.
 */
export interface Star {
  /** Fraction of viewBox width  (0 = left,  1 = right) */
  x: number;
  /** Fraction of viewBox height (0 = top,   1 = bottom) */
  y: number;
  /** Core radius in SVG units (not scaled) */
  radius: number;
}

export const STARS: Star[] = [
  { x: 0.10, y: 0.43, radius: 3.5 }, // 0  β Aqr  Sadalsuud   mag 2.91 (brightest)
  { x: 0.35, y: 0.17, radius: 3.4 }, // 1  α Aqr  Sadalmelik  mag 2.95
  { x: 0.47, y: 0.22, radius: 2.5 }, // 2  γ Aqr  Sadachbia   mag 3.84
  { x: 0.52, y: 0.15, radius: 2.6 }, // 3  ζ Aqr              mag 3.65
  { x: 0.50, y: 0.08, radius: 1.7 }, // 4  π Aqr  (jar top)   mag 4.66
  { x: 0.57, y: 0.16, radius: 2.2 }, // 5  η Aqr              mag 4.02
  { x: 0.44, y: 0.54, radius: 2.0 }, // 6  θ Aqr  Ancha       mag 4.16
  { x: 0.70, y: 0.53, radius: 2.5 }, // 7  λ Aqr              mag 3.74
  { x: 0.68, y: 0.83, radius: 2.2 }, // 8  τ² Aqr             mag 4.01
  { x: 0.72, y: 0.94, radius: 3.0 }, // 9  δ Aqr  Skat        mag 3.27
  { x: 0.86, y: 0.45, radius: 2.0 }, // 10 φ Aqr              mag 4.22
  { x: 0.87, y: 0.60, radius: 2.0 }, // 11 ψ¹ Aqr             mag 4.21
  { x: 0.88, y: 0.54, radius: 1.4 }, // 12 χ Aqr              mag 5.06
];

/**
 * Index pairs that form the constellation lines.
 *
 * Body:    β(0)→α(1)→γ(2)  and  α(1)→θ(6)
 * Jar:     γ(2)→ζ(3)→π(4)→γ(2)  +  γ(2)→η(5)   ← [4,2] closes the triangle
 * Stream:  η(5)→θ(6)→λ(7)→τ²(8)→δ(9)           ← η→Skat flow
 * Cascade: δ(9)→φ(10)→ψ¹(11)→χ(12)             ← complete cascade
 */
export const EDGES: [number, number][] = [
  [0,  1],  // β → α     (left shoulder to right shoulder)
  [1,  2],  // α → γ     (right shoulder to forearm / jar hand)
  [1,  6],  // α → θ     (body axis going south)
  [2,  3],  // γ → ζ     (jar: right arm of Y)
  [3,  4],  // ζ → π     (jar: up to top)
  [4,  2],  // π → γ     (jar: close the triangle ← user-specified)
  [2,  5],  // γ → η     (jar: left arm of Y)
  [5,  6],  // η → θ     (water stream begins, flows southwest)
  [6,  7],  // θ → λ     (stream continues east)
  [7,  8],  // λ → τ²    (stream flows south)
  [8,  9],  // τ² → δ    (stream reaches Skat)
  [9,  10], // δ → φ     (cascade: Skat → φ)
  [10, 11], // φ → ψ¹    (cascade continues)
  [11, 12], // ψ¹ → χ    (cascade end)
];
