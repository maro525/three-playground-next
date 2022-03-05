import { PerspectiveCamera, Vector4 } from "three"

export function getViewSizeAtDepth(camera: PerspectiveCamera, depth = 0) {
  const fovInRadians = (camera.fov * Math.PI ) / 180
  const height = Math.abs(
    (camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
  )
  return { width: height * camera.aspect, height }
}

export function setQuaternionFromProperEuler(q: Vector4, a: number, b: number, c: number, order: string) {
  // Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles

  // rotations are applied to the axes in the order specified by 'order'
  // rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
  // angles are in radians

  const cos = Math.cos
  const sin = Math.sin

  const c2 = cos(b / 2)
  const s2 = sin(b / 2)

  const c13 = cos((a + c) / 2)
  const s13 = sin((a + c) / 2)

  const c1_3 = cos((a - c) / 2)
  const s1_3 = sin((a - c) / 2)

  const c3_1 = cos((c - a) / 2)
  const s3_1 = sin((c - a) / 2)

  switch (order) {
    case 'XYX':
      q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13)
      break

    case 'YZY':
      q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13)
      break

    case 'ZXZ':
      q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13)
      break

    case 'XZX':
      q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13)
      break

    case 'YXY':
      q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13)
      break

    case 'ZYZ':
      q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13)
      break

    default:
      console.warn(
        'THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' +
          order
      )
  }
}
