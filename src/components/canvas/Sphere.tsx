import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { Color } from 'three'

const Sphere: React.FC = () => {
  return (
    <>
      <div>hello</div>
    </>
  )
}

const SphereView: React.FC = () => {
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

export { SphereView }
