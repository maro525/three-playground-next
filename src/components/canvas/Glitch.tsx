import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'

import { Group, SphereGeometry, Color, Mesh, MeshPhongMaterial } from 'three'
import { EffectComposer, Glitch } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'

const GlitchView: React.FC = () => {
  const { scene, camera } = useThree()

  const objectRef = useRef(null)

  useEffect(() => init(), [])
  useFrame(() => update())

  const init = () => {
    camera.position.z = 240

    const object = new Group()
    objectRef.current = object
    scene.add(object)

    const geometry = new SphereGeometry(2, 3, 4)
    for (let i = 0; i < 100; i++) {
      const material = new MeshPhongMaterial({
        color: 0x000000,
        flatShading: true,
      })
      const mesh = new Mesh(geometry, material)
      mesh.position
        .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.1)
        .normalize()
      mesh.position.multiplyScalar(Math.random() * 450)
      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
      mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 40
      object.add(mesh)
    }
  }

  const update = () => {
    objectRef.current.rotation.x += 0.01
    objectRef.current.rotation.z += 0.01
  }

  return (
    <>
      {/* light */}
      <directionalLight position={[1, 1, 1]} />
      <ambientLight color='#222222' />
      {/* canvas color */}
      <color attach='background' args={['#1d1d1d']} />
      {/* effect */}
      <fog color={new Color(1)} attach='fog' near={1} far={1000} />
      <EffectComposer>
        <Glitch mode={GlitchMode.SPORADIC} />
      </EffectComposer>
    </>
  )
}

export default GlitchView
