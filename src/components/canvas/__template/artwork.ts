import { ShaderMaterial, Mesh, Vector2, Scene, PerspectiveCamera} from 'three'
import { fragShader, vertShader } from './shader'
import createFilledPlane from '@/utils/3d/CreateFilledPlane'
import getCanvasResolution from '@/utils/3d/GetCanvasResolution'


class Artwork {

  camera: PerspectiveCamera
  scene: Scene
  dom: HTMLCanvasElement

  mouse: Vector2

  plane: Mesh
  material: ShaderMaterial

  constructor(camera: PerspectiveCamera, scene: Scene, dom: HTMLCanvasElement) {

    this.camera = camera
    this.scene = scene
    this.dom = dom

    this.createMesh();
    this.resize()

    this.mouse = new Vector2(0, 0)

    window.addEventListener("resize", this.resize.bind(this))
  }

  createMesh() {

    // material
    this.material = new ShaderMaterial({
      vertexShader: vertShader,
      fragmentShader: fragShader,
      uniforms: {
        uTime: {
          value: 0.0
        },
        uResolution: {
          value: new Vector2()
        },

      }
    })

    const geometry = createFilledPlane(this.camera)


    // ==============================
    // plane
    // ------------------------------
    this.plane = new Mesh(
      geometry,
      this.material
    )
    this.scene.add(this.plane)

  }

  update(t: number) {

    const material = this.material
    material.uniforms.uTime.value = t / 1000

  }

  resize() {
    const resolution = getCanvasResolution(this.dom)
    this.material.uniforms.uResolution.value = new Vector2(resolution[0], resolution[1])
  }

}

export default Artwork
