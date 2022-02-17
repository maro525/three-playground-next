import {Camera, Scene} from "three";

class Common {

  camera: Camera
  scene: Scene

  constructor() {}

  setCamera(ref: Camera){
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
