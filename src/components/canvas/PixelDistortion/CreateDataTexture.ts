import {Color, DataTexture, FloatType, NearestFilter, RGBFormat} from "three"


export default function createDataTexture(__size: number) {

  const width = __size
  const height = __size

  const size = width * height

  const data = new Float32Array(3 * size)
  const color = new Color(0xffffff)

  const r = Math.floor(color.r * 255)
  const g = Math.floor(color.g * 255)
  const b = Math.floor(color.b * 255)

  for (let i=0; i < size; i++) {
    let r = Math.random() * 255 - 125
    let r1 = Math.random() * 255 - 125

    const stride = i & 3

    data[stride] = r
    data[stride+1] = r1
    data[stride+2] = r
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

