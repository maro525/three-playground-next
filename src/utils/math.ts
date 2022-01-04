const r = () => 0.1 * Math.random()

const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value))
}

const DEG2RAD = Math.PI / 180
const RAD2DEG = 180 / Math.PI

// compute euclidian modulo of m % n
// https://en.wikipedia.org/wiki/Modulo_operation
const euclideanModulo = (n: number, m: number): number => {
  return ((n % m) + m) % m
}

// Linear mapping from range <a1, a2> to range <b1, b2>
const mapLinear = (x: number, a1: number, a2: number, b1: number, b2: number): number => {
  return b1 + ((x - a1) * (b2 - b1)) / (a2 - a1)
}

// https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/
const inverseLerp = (x: number, y: number, value: number): number => {
  if (x !== y) {
    return (value - x) / (y - x)
  } else {
    return 0
  }
}

const lerp = (x: number, y: number, t: number): number => {
  return (1 - t) * x + t * y
}

// http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
const damp = (x: number, y: number, lambda: number, dt: number): number => {
  return lerp(x, y, 1 - Math.exp(-lambda * dt))
}

// https://www.desmos.com/calculator/vcsjnyz7x4
const pingpong = (x: number, length = 1): number => {
  return length - Math.abs(euclideanModulo(x, length * 2) - length)
}

// http://en.wikipedia.org/wiki/Smoothstep
const smoothstep = (x: number, min: number, max: number): number => {
  if (x <= min) return 0
  if (x >= max) return 1

  x = (x - min) / (max - min)

  return x * x * (3 - 2 * x)
}

const smootherstep = (x: number, min: number, max: number) => {
  if (x <= min) return 0
  if (x >= max) return 1

  x = (x - min) / (max - min)

  return x * x * x * (x * (x * 6 - 15) + 10)
}

// Random integer from <low, high> interval
const randInt = (low: number, high: number): number => {
  return low + Math.floor(Math.random() * (high - low + 1))
}

// Random float from <low, high> interval
const randFloat = (low: number, high: number): number => {
  return low + Math.random() * (high - low)
}

// Random float from <-range/2, range/2> interval
const randFloatSpread = (range: number): number => {
  return range * (0.5 - Math.random())
}

const degToRad = (degrees: number): number => {
  return degrees * DEG2RAD
}

const radToDeg = (radians: number): number => {
  return radians * RAD2DEG
}

const isPowerOfTwo = (value: nunmber): boolean => {
  return (value & (value - 1)) === 0 && value !== 0
}

const ceilPowerOfTwo = (value: number): number => {
  return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2))
}

const floorPowerOfTwo = (value: number): number => {
  return Math.pow(2, Math.floor(Math.log(value) / Math.LN2))
}

export const MathUtils = Object.freeze({
  __proto__: null,
  r: r,
  clamp: clamp,
  euclideanModulo: euclideanModulo,
  mapLinear: mapLinear,
  inverseLerp: inverseLerp,
  lerp: lerp,
  damp: damp,
  pingpong: pingpong,
  smoothstep: smoothstep,
  smootherstep: smootherstep,
  randInt: randInt,
  randFloat: randFloat,
  randFloatSpread: randFloatSpread,
  degToRad: degToRad,
  radToDeg: radToDeg,
  isPowerOfTwo: isPowerOfTwo,
  ceilPowerOfTwo: ceilPowerOfTwo,
  floorPowerOfTwo: floorPowerOfTwo,
})
