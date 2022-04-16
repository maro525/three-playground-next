import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import {PerspectiveCamera} from 'three'
import Artwork from './Artwork'

const PixelDistortion = () => {

  const { scene, camera, gl } = useThree()

  const artworkRef = useRef<Artwork>(null)

  useEffect(() => init(), [])
  useFrame(() => update())

  const init = () => {

    const container = gl.domElement

    const artwork = new Artwork(camera as PerspectiveCamera, scene, container)
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
