import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils as math } from '@/utils/math'
import { Icosahedron } from '@react-three/drei'
import { Vector3, Material } from 'three'

const MainSphere: React.FC<{ material: Material }> = ({ material }) => {
  const main = useRef<any>(null)

  useFrame(({ clock, mouse }) => {
    main.current.rotation.z = clock.getElapsedTime()
    main.current.rotation.y = math.lerp(
      main.current?.rotation.y,
      mouse.x * Math.PI,
      0.1
    )
  })

  return (
    <Icosahedron
      args={[1, 4]}
      ref={main}
      material={material}
      position={[0, 0, 0]}
    />
  )
}

export const Instances: React.FC<{ material: Material }> = ({ material }) => {
  const [sphereRefs] = useState(() => [])

  const initialPositions = [
    [-4, 20, -12],
    [-10, 12, -4],
    [-11, -12, -23],
    [-16, -6, -10],
    [12, -2, -3],
    [13, 4, -12],
    [14, -2, -23],
    [8, 10, -20],
  ]

  useFrame(() => {
    sphereRefs.forEach((el: any) => {
      const pos: Vector3 = el.position
      const rot: Vector3 = el.rotation
      pos.y += 0.02
      if (pos.y > 19) pos.y = -18
      rot.x += 0.06
      rot.y += 0.06
      rot.z += 0.06
    })
  })

  return (
    <>
      <MainSphere material={material} />
      {initialPositions.map((pos, i) => (
        <Icosahedron
          args={[1, 4]}
          position={[pos[0], pos[1], pos[2]]}
          material={material}
          key={i}
          ref={(ref) => (sphereRefs[i] = ref)}
        />
      ))}
    </>
  )
}
