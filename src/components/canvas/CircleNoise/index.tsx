import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import Common from "../common"
import Artwork from './artwork'


const ShaderView = () => {

  const { scene, camera } = useThree()

  const artworkRef = useRef<Artwork>(null)

  useEffect(() => init(), [])
  useFrame(() => update())

  const init = () => {

    Common.setCamera(camera as PerspectiveCamera)
    Common.setScene(scene)

    camera.position.set(0, 0, 1.2)
    camera.lookAt(scene.position)

    const artwork = new Artwork()
    artworkRef.current = artwork

  }

  const update = () => {
    if (artworkRef.current) {
      const t = performance.now()
      artworkRef.current.update(t)
    }

  }

  return (
    <>
      <color attach='background' args={['#fffff']} />
    </>
  )
}

export default ShaderView
