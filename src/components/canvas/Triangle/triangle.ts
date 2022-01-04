import { Vector3, BufferGeometry, Scene, Mesh } from 'three'
import { MathUtils as math } from '@/utils/math'
import { toMesh, mutateColor } from './util'

export class Triangle {
  h: number
  w: number
  center: Vector3
  color: any
  geometry: BufferGeometry
  mesh: Mesh
  triangles: Triangle[]
  scene: Scene

  constructor(
    x: number,
    y: number,
    z: number,
    h: number,
    color: { h: number; s: number; l: number },
    scene: Scene
  ) {
    this.h = h
    const w = (2 * this.h) / Math.sqrt(3)
    this.w = w
    this.center = new Vector3(x, y, z)
    this.color = color

    this.triangles = []
    this.scene = scene

    this.setup()
    this.init()
  }

  setup() {
    const a = Math.abs(this.w * 2) + Math.abs(this.h * 2)

    if (a > 0.2 && Math.random() < Math.random() / 8 + a / 1.5) {
      this.subdivide()
    } else {
      this.triangles.push(this)
    }
  }

  init() {
    for (const triangle of this.triangles) {
      const mesh = toMesh(this.w, this.h, this.color, this.center)
      this.mesh = mesh
      if (mesh) {
        mesh.castShadow = mesh.receiveShadow = true
        this.scene.add(mesh)
      }
    }
  }

  update(point: Vector3, point2: Vector3) {
    for (let i = 0; i < this.triangles.length; i++) {
      const d1 = math.clamp(
        this.triangles[i].center.distanceTo(point),
        0.000001,
        10000000
      )
      const d2 = math.clamp(
        this.triangles[i].center.distanceTo(point2),
        0.000001,
        1000000
      )
      const s = math.clamp(1 / d1 ** 20 + 1 / d2 ** 20, 0, 1)
      this.triangles[i].mesh.scale.set(s, s, 1)

      this.triangles[i].update(point, point2)
    }
  }

  subdivide() {
    const x0 = -this.w / 2
    const x1 = 0
    const x2 = this.w / 2
    const y0 = this.h / 2

    const x = this.center.x
    const y = this.center.y
    const z = this.center.z

    const a = Math.abs(this.w) + Math.abs(this.h)
    const nh = this.h / 2

    const t1 = new Triangle(
      x + x0,
      y - y0,
      z + math.r(),
      nh,
      mutateColor(this.color, a),
      this.scene
    )

    const t2 = new Triangle(
      x + x1,
      y + y0,
      z + math.r(),
      nh,
      mutateColor(this.color, a),
      this.scene
    )

    const t3 = new Triangle(
      x + x2,
      y - y0,
      z + math.r(),
      nh,
      mutateColor(this.color, a),
      this.scene
    )

    const t4 = new Triangle(
      x + x1,
      y - y0,
      z + math.r(),
      -nh,
      mutateColor(this.color, a),
      this.scene
    )

    for (let i = 0; i < this.triangles.length; i++) {
      if (this.triangles[i] == this) {
        this.triangles.splice(i, 1)
      }
    }
  }
}
