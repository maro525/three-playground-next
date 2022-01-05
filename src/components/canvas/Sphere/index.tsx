import {
  MeshDistortMaterial,
  useCubeTexture,
  useTexture,
} from '@react-three/drei'
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { useLayoutEffect, useRef, useState } from 'react'
import { Color, Mesh } from 'three'
import { Instances } from './Sphere'
import anime from 'animejs'
import { useFrame, useThree } from '@react-three/fiber'

const Sphere: React.FC = () => {
  const bumpMap = useTexture('/img/bump.jpg')
  const envMap = useCubeTexture(
    ['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'],
    { path: '/img/cube/' }
  )
  const [material, set] = useState()

  return (
    <>
      <mesh>
        <boxBufferGeometry attach='geometry' />
        <MeshDistortMaterial
          ref={set}
          envMap={envMap}
          bumpMap={bumpMap}
          color={'#010101'}
          roughness={0.1}
          metalness={1}
          bumpScale={0.005}
          clearcoat={1}
          clearcoatRoughness={1}
          radius={1}
          distort={0.4}
          attach='material'
        />
      </mesh>
      {material && <Instances material={material} />}
    </>
  )
}

const SphereView: React.FC = () => {
  const { camera } = useThree()

  useLayoutEffect(() => {
    anime({
      targets: [camera.position],
      z: [50, 5],
      duration: 800,
      direction: 'alternate',
      loop: false,
      easing: 'easeInQuad',
    })

  }, [])

  return (
    <>
      <color attach='background' args={['#050505']} />
      <fog color={new Color(0x161616)} attach='fog' near={8} far={30} />
      <Sphere />
      <EffectComposer multisampling={0} disableNormalPass={true}>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={48}
        />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
          opacity={3}
        />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  )
}

export default SphereView
