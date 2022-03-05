import {Camera, PerspectiveCamera, Scene} from "three";

class Common {

  camera: PerspectiveCamera
  scene: Scene

  constructor() {}

  setCamera(ref: PerspectiveCamera){
    this.camera = ref
  }
  getCamera() {
    return this.camera
  }

  setScene(ref: Scene) {
    this.scene = ref
  }
  getScene() {
    return this.scene
  }


}

export default new Common()
