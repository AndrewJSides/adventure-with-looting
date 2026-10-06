export const MELEE_POINT_BLANK_REACH = 24;

export function meleeTargetCanBeHit(
  distance: number,
  combinedRadii: number,
  angleDifference: number,
  frontalArc: number,
  hasLineOfSight: boolean,
): boolean {
  if (!hasLineOfSight) return false;
  const pointBlank = distance <= combinedRadii + MELEE_POINT_BLANK_REACH;
  return pointBlank || Math.abs(angleDifference) <= frontalArc / 2;
}

export function speedSensitiveTurnScale(isMotorcycle: boolean, speedRatio: number): number {
  const normalized = Math.max(0, Math.min(1, speedRatio));
  const eased = normalized * normalized * (3 - 2 * normalized);
  const highSpeedRetention = isMotorcycle ? 0.34 : 0.18;
  return 1 - (1 - highSpeedRetention) * eased;
}

export function vehicleTurnStep(
  isMotorcycle: boolean,
  baseTurnRate: number,
  topSpeed: number,
  currentAngle: number,
  targetAngle: number,
  speed: number,
  throttle: number,
  dt: number,
): number {
  const angleDelta = Math.atan2(
    Math.sin(targetAngle - currentAngle),
    Math.cos(targetAngle - currentAngle),
  );
  const speedRatio = Math.abs(speed) / topSpeed;
  const turnScale = speedSensitiveTurnScale(isMotorcycle, speedRatio);
  const maxTurn = baseTurnRate * turnScale * (0.45 + throttle * 0.55) * dt;
  return Math.max(-maxTurn, Math.min(maxTurn, angleDelta));
}
