import EventBus from "@/utils/EventBus"
import {sRGBEncoding, TextureLoader} from "three"

import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js"

class Assets {

  textures: any
  envs: any
  shapes: {}
  illusts: {}
  total: number
  count: number

  constructor() {

    this.textures = {
      matcap: {
        src: "/img/matcap.png",
        value: null
      }
    }

    this.envs = {
      main: {
        src: "/img/studio_small_08_1k.hdr",
        value: null
      }
    }

    this.shapes = {}

    this.illusts = []

    this.total = 0
    this.count = 0
    this.countTotal(this.textures)
    this.countTotal(this.shapes)
    this.countTotal(this.envs)

  }

  countTotal(obj: {}) {
    for (let key in obj) {
      this.total++
    }
  }

  compLoad() {
    this.count++;
    EventBus.emit("COUNT_LOADING", {
      progress: this.count / this.total
    })

    if (this.count == this.total) {
      EventBus.emit("FINISH_LOADING", {})
    }
  }

  load() {
    this.loadShapes()
    this.loadTextures()
    this.loadEnv()
  }

  loadShapes() {

  }

  loadEnv() {
    for (let key in this.envs) {
      const data = this.envs[key]
      const loader = new RGBELoader()
      loader.load(data.src, (texture) => {
        texture.encoding = sRGBEncoding
        data.value = texture
        this.compLoad()
      })
    }
  }

  loadTextures() {
    for (let key in this.textures) {
      const data = this.textures[key]
      const loader = new TextureLoader()
      loader.load(data.src, (texture) => {
        texture.encoding = sRGBEncoding
        data.value = texture
        this.compLoad()
      })
    }
  }
}

export default new Assets()
