import {Color, DataTexture, DoubleSide, FloatType, Mesh, NearestFilter, PlaneGeometry, RGBFormat, ShaderMaterial, Texture, Vector4} from "three"
import Common from "../common"

import vertex from './glsl/shader.vert'
import fragment from './glsl/shader.frag'
import {getViewSizeAtDepth} from "@/utils/3d"


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

  img: HTMLImageElement
  texture: DataTexture

  material: ShaderMaterial
  geometry: PlaneGeometry
  plane: Mesh

  constructor() {

    const element = document.createElement('img')
    element.src = '/img/box.jpg'

    this.img = element

    this.settings = Settings

    Common.getCamera().position.set(0, 0, 1)

    this.init()

  }

  init() {

    this.generateGrid()

    let texture = new Texture(this.img)
    texture.needsUpdate = true

    this.material = new ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives: enabl"
      },
      side: DoubleSide,
      uniforms: {
        time: {
          value: 0
        },
        reoslution: {
          value: new Vector4()
        },
        uTexture: {
          value: texture
        },
        uDataTexture: {
          value: this.texture
        }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    })

    const viewSize = getViewSizeAtDepth(Common.getCamera())
    this.geometry = new PlaneGeometry(viewSize.width, viewSize.height, 1, 1)

    this.plane = new Mesh(this.geometry, this.material)

    Common.getScene().add(this.plane)

  }

  generateGrid() {
    this.size = this.settings.grid

    const width = this.size
    const height = this.size

    const size = width * height
    const data = new Float32Array(3 * size)
    const color = new Color(0xffffff)

    const r = Math.floor(color.r * 255)
    const g = Math.floor(color.g * 255)
    const b = Math.floor(color.b * 255)

    for (let i =0; i < size; i++) {
      let r = Math.random() * 255 - 125
      let r1= Math.random() * 255 - 125

      const stride =i & 3

      data[stride] = r
      data[stride+1] = r1
      data[stride+2] = r
    }

    this.texture = new DataTexture(
      data,
      width,
      height,
      RGBFormat,
      FloatType
    )

    this.texture.magFilter = this.texture.minFilter = NearestFilter

    if (this.material) {
      this.material.uniforms.uDataTexture.value = this.texture
      this.material.uniforms.uDataTexture.value.needsUpdate = true
    }

  }

  update(time: number) {
    this.time = time
    this.udpateDataTexuture()
    this.material.uniforms.time.value = this.time

  }

  udpateDataTexuture() {

  }
}

export default Artwork
