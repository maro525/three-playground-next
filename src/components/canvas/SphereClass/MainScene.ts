import {
  Color,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  WebGLRenderTarget,
} from 'three'
import { OrbitControls } from 'three-stdlib'
import anime from 'animejs'

import CanvasBase from '@/components/canvas/base'
import sphere_vert from './glsl/sphere.vert'
import sphere_frag from './glsl/sphere.frag'
import assets from './Assets'

export default class MainScene {
  bgColor: Color
  scene: Scene
  camera: PerspectiveCamera
  fbo: WebGLRenderTarget
  controls: OrbitControls
  material: ShaderMaterial

  constructor(bgColor: string) {
    this.bgColor = new Color(bgColor)

    this.scene = new Scene()
    this.camera = new PerspectiveCamera(
      45,
      CanvasBase.dimensions.x / CanvasBase.dimensions.y,
      1,
      10000
    )
    this.camera.position.set(0, 0, 100)
    this.camera.lookAt(this.scene.position)
    this.fbo = new WebGLRenderTarget(
      CanvasBase.fbo_dimensions.x,
      CanvasBase.fbo_dimensions.y
    )

    this.controls = new OrbitControls(
      this.camera,
      CanvasBase.renderer.domElement
    )
  }

  init() {
    const colors = [
      new Color(0x340c45),
      new Color(0xa865a5),
      new Color(0x346b9e),
    ]

    const geometry = new SphereGeometry(10, 32, 32)

    for (let i = 0; i < 1000; i++) {
      let color = new Color().copy(colors[0])
      color.lerp(colors[1], Math.random())
      color.lerp(colors[2], Math.random())

      this.material = new ShaderMaterial({
        vertexShader: sphere_vert,
        fragmentShader: sphere_frag,
        uniforms: {
          uLightPos: {
            value: new Vector3(100, 100, 100),
          },
          uColor: {
            value: color,
          },
          uShadowColor: {
            value: colors[0],
          },
          uMatCap: {
            value: assets.textures.matcap.value,
          },
          uEnvMap: {
            value: assets.envs.main.value,
          },
          uCameraPos: {
            value: this.camera.position,
          },
          uFocus: {
            value: 10,
          },
          uFocusRange: {
            value: 100,
          },
          uFogNear: {
            value: 25,
          },
          uFogFar: {
            value: 500,
          },
          uBgColor: {
            value: this.bgColor,
          },
        },
      })

      const mesh = new Mesh(geometry, this.material)
      mesh.position.set(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 500,
      )

      const scale = Math.random() * 0.8 + 0.01

      mesh.scale.set(scale, scale, scale)
      this.scene.add(mesh)
    }

    anime({
      targets: [this.camera.position],
      x: [-30, 30],
      z: [30, -30],
      duration: 10000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    })

    anime({
      targets: [this.camera.rotation],
      y: [0, Math.PI * 2],
      duration: 60000,
      loop: true,
      easing: 'easeInOutSine',
    })

  }

  resize() {
    this.camera.aspect = CanvasBase.dimensions.x / CanvasBase.dimensions.y
    this.camera.updateProjectionMatrix()

    this.fbo.setSize(CanvasBase.fbo_dimensions.x, CanvasBase.fbo_dimensions.y)
  }

  update() {
    CanvasBase.renderer.setRenderTarget(this.fbo)
    CanvasBase.renderer.render(this.scene, this.camera)
  }

  setFocus(v) { this.material.uniforms.uFocus.value = v }
  setFocusRange(v) { this.material.uniforms.uFocus.value = v }
  setFogNear(v) { this.material.uniforms.uFogNear.value = v }
  setFogFar(v) { this.material.uniforms.uFogFar.value = v }
}
