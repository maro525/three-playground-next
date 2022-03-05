import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import Common from "../common"
import Artwork from './Artwork'

const PixelDistortion = () => {

  const { scene, camera } = useThree()

  const artworkRef = useRef<Artwork>(null)

  useEffect(() => init(), [])
  useFrame(() => update())

  const init = () => {

    Common.setCamera(camera)
    Common.setScene(scene)

    const artwork = new Artwork()
    artworkRef.current = artwork

  }

  const update = () => {
    if (artworkRef.current) {
      const t = performance.now()
      artworkRef.current.update(t)
    }

  }

  return null
}

export default PixelDistortion
