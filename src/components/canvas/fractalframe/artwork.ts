import { ShaderMaterial, PlaneBufferGeometry, Mesh, Vector2} from 'three'
import { vertexShader as vertex, fragShader as fragment } from "./shader"
import Common from "@/components/canvas/common"
import {getViewSizeAtDepth} from '@/utils/3d'


class Artwork {

  mouse: Vector2
  plane: Mesh
  material: ShaderMaterial

  constructor() {
    this.init();

    this.mouse = new Vector2(0, 0)
  }

  init() {

    // ==============================
    // material
    // ------------------------------
    this.material = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: {
          value: 0.0
        },
        uResolution: {
          value: new Vector2(length, length)
        },

      }
    })

    const __size = this.getSize()

    // ==============================
    // plane
    // ------------------------------
    this.plane = new Mesh(
      new PlaneBufferGeometry(...__size),
      this.material
    )
    Common.getScene().add(this.plane)

    window.addEventListener('resize', this.getSize)

  }

  getSize() {
    const canvasSize = getViewSizeAtDepth(Common.getCamera())
    const length = Math.min(canvasSize.height, canvasSize.width)
    return [length, length]
  }

  update(t: number) {

    const material = this.material
    material.uniforms.uTime.value = t / 1000

  }

}

export default Artwork
