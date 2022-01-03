import React, {useEffect, useRef} from "react"
import { useFrame , useThree } from "@react-three/fiber"

import { EffectComposer, RenderPass, GlitchPass } from "three-stdlib"
import { Object3D, Fog, SphereGeometry, Mesh, MeshPhongMaterial } from "three"

interface PramasAnimate { object: Object3D
    composer: EffectComposer
}

const Glitch: React.FC = () => {

  const { scene, gl, camera, size } = useThree()

  const objectRef = useRef(null)
  const composerRef = useRef(null)

  useEffect(() => init())
  useFrame(() => update())

  const init = () => {

          const w = size.width
          const h = size.height

          camera.position.z = 240

          gl.setClearColor('#1d1d1d')

          const object = new Object3D()
          scene.add(object)
          objectRef.current = object

          const geometry = new SphereGeometry(2, 3, 4)
          for (let i=0; i<100; i++) {
            const material = new MeshPhongMaterial({
              color: 0x000000,
              flatShading: true
            })
            const mesh = new Mesh(geometry, material)
            mesh.position.set(Math.random()-0.5, Math.random()-0.5, Math.random()-0.1).normalize()
            mesh.position.multiplyScalar(Math.random() * 400)
            mesh.rotation.set(Math.random()* 2, Math.random()*2, Math.random()*2)
            mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50
            object.add(mesh)
          }

          const composer = new EffectComposer(gl)
          composerRef.current = composer
          const renderPass = new RenderPass(scene, camera)
          composer.addPass(renderPass)

          const effectGlitch = new GlitchPass(64)
          effectGlitch.goWild = false
          effectGlitch.renderToScreen = true
          composer.addPass(effectGlitch)
  }

  const update = () => {
        objectRef.current.rotation.x += 0.01
        objectRef.current.rotation.z += 0.01
        composerRef.current.render()
  }

  return(
    <>
      <directionalLight position={[1, 1, 1]} />
      <ambientLight color="0x222222" />
      <fog args={['white', 1, 1000]} />
    </>
  )
}

export default Glitch
