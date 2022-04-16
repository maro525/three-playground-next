

export default function getCanvasResolution(dom: HTMLCanvasElement) {

  const width = dom.offsetWidth
  const height = dom.offsetHeight

  const imageAspect = 1. / 1.5

  let a1: number
  let a2: number

  if (height / width > imageAspect) {
    a1 = (width / height) * imageAspect
    a2 = 1
  } else {
    a1 = 1
    a2 = (height / width) / imageAspect
  }

  return [width, height, a1, a2]
}
