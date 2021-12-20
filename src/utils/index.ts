
export const r = () => 0.1 * Math.random()

export const clamp = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
}
