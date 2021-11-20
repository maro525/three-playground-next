import {
  Vector3, 
  BufferGeometry,
  BufferAttribute,
  Mesh,
  MeshBasicMaterial,
  DoubleSide,
  Color,
  Shape,
  ExtrudeGeometry,
  MeshPhysicalMaterial
} from "three"
import {hslToRgb} from "@/utils/color"

class Triangle {

  h: number;
  w: number;
  center: Vector3;
  color: any;
  geometry: BufferGeometry
  mesh: Mesh

  constructor(
    x: number,
    y: number,
    z: number,
    h: number,
    color: any
  ) {
    this.h = h
    this.center = new Vector3(x, y, z)
    this.color = color

    const w = ( 2 * h ) / Math.sqrt(3)
    this.w = w

    const a = Math.abs(this.w * 2) + Math.abs(this.h * 2)

    if (a > 0.2 && Math.random() < Math.random() / 8 + a / 1.5) {
      this.subdivide()
    } else {
      triangles.push(this)
    }
  }

  toTriangle() {
    const vertices = new Float32Array([
      0,
      0 + this.h,
      0,
      0 - this.w,
      0 - this.h,
      0,
      0 + this.w,
      0 - this.h,
      0,
    ]);

    this.geometry = new BufferGeometry()
    this.geometry.setAttribute("position", new BufferAttribute(vertices, 3));
    this.geometry.computeVertexNormals()

    const c = hslToRgb(this.color.h, this.color.s, this.color.l);
    const mesh = new Mesh(
      this.geometry,
      new MeshBasicMaterial({
        color: new Color(c[0] / 255, c[1] / 255, c[2] / 255),
        side: DoubleSide
      })
    )
    mesh.position.copy(this.center)
    return mesh
  }

  toMesh() {
    const bevelThickness = 0.01
    const bevelSize = 0.01

    const shape = new Shape()
    shape.moveTo(0, this.h);
    shape.lineTo(-this.w, -this.h)
    shape.lineTo(this.w, -this.h)
    shape.lineTo(0, this.h)

    const extrudeSettings = {
      steps: 1,
      depth: 0.1,
      bevelEnabled: true,
      bevelThickness,
      bevelSize,
      bevelOffset: -bevelSize,
      bevelSegment: 3,
    };

    const col = hslToRgb(this.color.h, this.color.s, this.color.l)

    const geometry = new ExtrudeGeometry(shape, extrudeSettings)

    const material = new MeshPhysicalMaterial({
      color: new Color(col[0] / 255, col[1] / 255, col[2] / 255),
      side: DoubleSide,
      roughness: 0.1,
      metalness: 0
    });
    const mesh = new Mesh(geometry, material)
    mesh.position.copy(this.center)
    this.mesh = mesh
    return mesh
  }

  subdivide() {

  }
}
