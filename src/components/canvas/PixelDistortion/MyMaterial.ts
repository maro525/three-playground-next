import {Color, DataTexture, DoubleSide, FloatType, NearestFilter, RGBFormat, ShaderMaterial, Vector4} from "three";

import createImageTexture from "./CreateImageTexture";
import { fragShader, vertShader} from "./shader";


export default class MyMaterial {

  material: ShaderMaterial

  dataTexture: DataTexture

  relaxation: number = 0.9
  grid: number = 10

  constructor() {


    const imgTexture = createImageTexture("/img/box.jpg")

    this.dataTexture = this.createDataTexture(this.grid)

    this.material = new ShaderMaterial({
      side: DoubleSide,
      uniforms: {
        time: {
          value: 0
        },
        progres: {
          value: 0
        },
        resolution: {
          value: new Vector4()
        },
        uImgTexture: {
          value: imgTexture
        },
        uDataTexture: {
          value: this.dataTexture
        }
      },
      vertexShader: vertShader,
      fragmentShader: fragShader
    })

  }

  createDataTexture(__size: number) {

    const width = __size
    const height = __size

    const size = width * height

    const data = new Float32Array(3 * size)
    const color = new Color(0xffffff)

    for (let i=0; i < size; i++) {
      let r = Math.random() * 255 - 125
      let r1 = Math.random() * 255 - 125

      const stride = i * 3

      data[stride] = 0
      data[stride+1] = r
      data[stride+2] = 0
    }

    const dataTexture = new DataTexture(
      data,
      width,
      height,
      RGBFormat,
      FloatType
    )

    dataTexture.magFilter = dataTexture.minFilter = NearestFilter

    return dataTexture
}


  get() {
    return this.material
  }

  update(time: number) {
    this.material.uniforms.time.value = time

    let data = this.dataTexture.image.data

    for (let i=0; i<data.length; i+=3) {
      data[i] *= this.relaxation
      data[i+1] *= this.relaxation
    }

    this.dataTexture.needsUpdate = true
  }

  resize(resolution: number[]) {

    this.material.uniforms.resolution.value.x = resolution[0]
    this.material.uniforms.resolution.value.y = resolution[1]
    this.material.uniforms.resolution.value.z = resolution[2]
    this.material.uniforms.resolution.value.w = resolution[3]
  }
}
