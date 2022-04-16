import {getViewSizeAtDepth} from "@/utils/3d"
import {PerspectiveCamera, PlaneGeometry} from "three"

export default function createFilledPlane(camera: PerspectiveCamera) {
  const viewSize = getViewSizeAtDepth(camera)
  const geometry = new PlaneGeometry(viewSize.width, viewSize.height, 1, 1)

  return geometry

}
