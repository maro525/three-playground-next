import { ShaderMaterial, PlaneBufferGeometry, Mesh, Vector2, AdditiveAnimationBlendMode, AdditiveBlending, NoBlending} from 'three'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import circle_vertex from './glsl/circle.vert'
import circle_fragment from './glsl/circle.frag'

import Common from "@/components/canvas/common"
import {getViewSizeAtDepth} from '@/utils/3d'


class Artwork {

  mouse: Vector2
  plane: Mesh
  material1: ShaderMaterial
  material2: ShaderMaterial

  constructor() {
    this.init();

    this.mouse = new Vector2(0, 0)
  }

  init() {

    const canvasSize = getViewSizeAtDepth(Common.getCamera())

    // ==============================
    // material
    // ------------------------------
    this.material1 = new ShaderMaterial({
      vertexShader: circle_vertex,
      fragmentShader: circle_fragment,
      uniforms: {
        uTime: {
          value: 0.0
        },
        uResolution: {
          value: new Vector2(canvasSize.width, canvasSize.height)
        },
      },
      // transparent: true,
      blending: NoBlending,
    })

    // ==============================
    // plane
    // ------------------------------
    this.plane = new Mesh(
      new PlaneBufferGeometry(canvasSize.width, canvasSize.height),
      this.material1
    )
    Common.getScene().add(this.plane)

    // ==============================
    // material
    // ------------------------------
    this.material2 = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: {
          value: 0.0
        },
        uResolution: {
          value: new Vector2(canvasSize.width, canvasSize.height)
        },
      },
      // transparent: true,
      blending: NoBlending
    })
    // ==============================
    // plane
    // ------------------------------
    this.plane = new Mesh(
      new PlaneBufferGeometry(canvasSize.width, canvasSize.height),
      this.material2
    )
    Common.getScene().add(this.plane)


  }

  update(t: number) {

    const m1 = this.material1
    m1.uniforms.uTime.value = t / 1000

    const m2 = this.material2
    m2.uniforms.uTime.value = t / 1000


  }

}

export default Artwork
