import {Texture} from "three"


export default function createImageTexture(src: string) {

  const element = document.createElement('img')
  element.src = src

  const texture = new Texture(element)
  texture.needsUpdate = true

  return texture

}
