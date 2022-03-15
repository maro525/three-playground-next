import { ShaderMaterial, PlaneBufferGeometry, Mesh, Vector2} from 'three'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
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

    const canvasSize = getViewSizeAtDepth(Common.getCamera())

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
          value: new Vector2(canvasSize.width, canvasSize.height)
        },

      }
    })


    // ==============================
    // plane
    // ------------------------------
    this.plane = new Mesh(
      new PlaneBufferGeometry(canvasSize.width, canvasSize.height),
      this.material
    )
    Common.getScene().add(this.plane)

  }

  update(t: number) {

    const material = this.material
    material.uniforms.uTime.value = t / 1000

  }

}

export default Artwork
