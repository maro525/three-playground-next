import {getViewSizeAtDepth} from "@/utils/3d"
import {PerspectiveCamera, PlaneBufferGeometry} from "three"

export default function createFilledPlane(camera: PerspectiveCamera) {
  const viewSize = getViewSizeAtDepth(camera)
  const geometry = new PlaneBufferGeometry(viewSize.width, viewSize.height, 1, 1)

  return geometry

}
