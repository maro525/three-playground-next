import {Mesh, PerspectiveCamera, PlaneGeometry, Scene } from "three"

import MyMaterial from "./MyMaterial"
import createFilledPlane from "@/utils/3d/CreateFilledPlane"
import getCanvasResolution from "@/utils/3d/GetCanvasResolution"


const Settings = {
  grid: 34,
  mouse: 0.25,
  strength: 1,
  relaxation: 0.9
}

class Artwork {

  settings: any

  time: number
  size: number

  camera: PerspectiveCamera
  scene: Scene
  dom: HTMLCanvasElement

  material: MyMaterial
  geometry: PlaneGeometry
  plane: Mesh

  constructor(camera: PerspectiveCamera, scene: Scene, dom: HTMLCanvasElement) {

    this.camera = camera
    this.camera.position.set(0, 0, 1)

    this.dom = dom

    this.scene = scene

    this.settings = Settings


    this.init()

    window.addEventListener("resize", this.resize.bind(this))

  }

  init() {


    this.material = new MyMaterial()
    this.geometry = createFilledPlane(this.camera)

    this.plane = new Mesh(this.geometry, this.material.get())

    this.scene.add(this.plane)

    this.resize()

  }

  update(time: number) {
    this.time = time
    this.material.update(time)
  }

  resize() {

    const resolution = getCanvasResolution(this.dom)
    this.material.resize(resolution)

  }

}

export default Artwork
