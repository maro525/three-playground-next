import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import {PerspectiveCamera} from 'three'
import Artwork from './artwork'


const ShaderView = () => {

  const { scene, camera, gl } = useThree()

  const artworkRef = useRef<Artwork>(null)

  useEffect(() => init(), [])
  useFrame(() => update())

  const init = () => {

    camera.position.set(0, 0, 1.2)
    camera.lookAt(scene.position)

    const dom = gl.domElement

    const artwork = new Artwork(camera as PerspectiveCamera, scene, dom)
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

export default ShaderView
