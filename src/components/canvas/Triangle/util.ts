import {
  Mesh,
  BufferGeometry,
  BufferAttribute,
  MeshBasicMaterial,
  Color,
  DoubleSide,
  Vector3,
  Shape,
  ExtrudeGeometry,
  MeshPhysicalMaterial,
} from 'three'
import { hslToRgb } from '@/utils/color'

export const mutateColor = (
  hsl: { h: number; s: number; l: number },
  f: number
): { h: number; s: number; l: number } => {
  const r = f / 50

  return {
    h: hsl.h + r * (Math.random() * 2 - 1),
    s: hsl.s + Math.random() * 0.1 - 0.05,
    l: hsl.l + Math.random() * 0.1 - 0.05,
  }
}

export const toTriangle = (
  w: number,
  h: number,
  color: { h: number; s: number; l: number },
  center: Vector3
): Mesh => {
  const vertices = new Float32Array([
    0,
    0 + h,
    0,
    0 - w,
    0 - h,
    0,
    0 + w,
    0 - h,
    0,
  ])

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(vertices, 3))
  geometry.computeVertexNormals()

  const c = hslToRgb(color.h, color.s, color.l)
  const mesh = new Mesh(
    geometry,
    new MeshBasicMaterial({
      color: new Color(c[0] / 255, c[1] / 255, c[2] / 255),
      side: DoubleSide,
    })
  )
  mesh.position.copy(center)
  return mesh
}

export const toMesh = (
  w: number,
  h: number,
  color: { h: number; s: number; l: number },
  center: Vector3
) => {
  const bevelThickness = 0.01
  const bevelSize = 0.01

  const shape = new Shape()
  shape.moveTo(0, h)
  shape.lineTo(-w, -h)
  shape.lineTo(w, -h)
  shape.lineTo(0, h)

  const extrudeSettings = {
    steps: 1,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness,
    bevelSize,
    bevelOffset: -bevelSize,
    bevelSegment: 3,
  }

  const col = hslToRgb(color.h, color.s, color.l)

  const geometry = new ExtrudeGeometry(shape, extrudeSettings)

  const material = new MeshPhysicalMaterial({
    color: new Color(col[0] / 255, col[1] / 255, col[2] / 255),
    side: DoubleSide,
    roughness: 0.1,
    metalness: 0,
  })
  const mesh = new Mesh(geometry, material)
  mesh.position.copy(center)
  return mesh
}
