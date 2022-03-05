import { ShaderMaterial, PlaneBufferGeometry, Mesh, Camara, Vector2, Raycaster, MeshBasicMaterial, Color, Camera } from 'three'
import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import Common from "@/components/canvas/common"


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
        uMouse: {
          value: new Vector2(0.0, 0.0)
        }
      }
    })

    this.camera = Common.getCamera()
    const scene = Common.getScene()

    const getViewSizeAtDepth = (depth = 0) =>  {
      const fovInRadians = (this.camera.fov * Math.PI) / 180;
      const height = Math.abs(
        (this.camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
      );
      return { width: height * this.camera.aspect, height };
    }


    // ==============================
    // plane
    // ------------------------------
    const viewSIze = getViewSizeAtDepth()
    this.plane = new Mesh(
      new PlaneBufferGeometry(viewSIze.width, viewSIze.height),
      this.material
    )
    scene.add(this.plane)

    window.addEventListener('mousemove', this.onMouseMove.bind(this))
  }

  update(t: number) {

    this.raycaster.setFromCamera(this.mouse, this.camera)
    const intersects = this.raycaster.intersectObject(this.plane)

    let point
    if (intersects.length) {
      point = intersects[0].point
    }

    const material = this.material
    material.uniforms.uTime.value = t / 1000

    material.uniforms.uMouse.value = this.mouse

  }

  onMouseMove (event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = -(event.clientX / window.innerWidth) * 2 + 1
  }

}

export default Artwork
