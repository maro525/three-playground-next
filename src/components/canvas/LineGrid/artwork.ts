import { ShaderMaterial, PlaneBufferGeometry, Mesh, Camara, Vector2, Raycaster, MeshBasicMaterial, Color, Vector3, Camera } from 'three'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import Common from "@/components/canvas/common"
import {getFullScreenPlane, getViewSizeAtDepth} from '@/utils/3d'


class Artwork {

  mouse: Vector2
  raycaster: Raycaster
  plane: Mesh
  material: ShaderMaterial
  camera: Camera

  constructor() {
    this.init();

    this.raycaster= new Raycaster()
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
        uStart: {
          value: new Vector3(-1.0, 0., 0.)
        },
        uEnd: {
          value: new Vector3(1.0, 0., 0.)
        },
        uColor: {
          value: new Vector3(1.0, 1.0, 1.0)
        },
        uOpacity: {
          value: 1.0,
        }
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
