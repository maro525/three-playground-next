import {
  Camera,
  Mesh,
  PlaneBufferGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderTarget,
} from 'three'
import { GUI } from 'dat.gui'
import Stats from 'stats.js'

import MainScene from './MainScene'
import CanvasBase from '@/components/canvas/base'
import EventBus from '@/utils/EventBus'
import assets from './Assets'

import bokeh_vert from './glsl/bokeh.vert'
import bokeh_frag from './glsl/bokeh.frag'

export default class Artwork {
  $wrapper: HTMLDivElement
  bgColor: string
  mainScene: MainScene
  fbos: WebGLRenderTarget[]
  plane: Mesh
  material: ShaderMaterial
  scene: Scene
  camera: Camera
  gui: GUI
  guiParams: any
  stats: Stats

  constructor(dom: HTMLDivElement, bgColor: string) {
    this.$wrapper = dom
    this.bgColor = bgColor
  }

  init() {
    CanvasBase.init(this.$wrapper, this.bgColor)

    this.mainScene = new MainScene(this.bgColor)

    this.scene = new Scene()
    this.camera = new Camera()

    this.fbos = [
      new WebGLRenderTarget(
        CanvasBase.fbo_dimensions.x,
        CanvasBase.fbo_dimensions.y
      ),
      new WebGLRenderTarget(
        CanvasBase.fbo_dimensions.x,
        CanvasBase.fbo_dimensions.y
      ),
      new WebGLRenderTarget(
        CanvasBase.fbo_dimensions.x,
        CanvasBase.fbo_dimensions.y
      ),
      new WebGLRenderTarget(
        CanvasBase.fbo_dimensions.x,
        CanvasBase.fbo_dimensions.y
      ),
      new WebGLRenderTarget(
        CanvasBase.fbo_dimensions.x,
        CanvasBase.fbo_dimensions.y
      ),
      new WebGLRenderTarget(
        CanvasBase.fbo_dimensions.x,
        CanvasBase.fbo_dimensions.y
      ),
      new WebGLRenderTarget(
        CanvasBase.fbo_dimensions.x,
        CanvasBase.fbo_dimensions.y
      ),
    ]

    const geo = new PlaneBufferGeometry(2, 2)
    this.material = new ShaderMaterial({
      vertexShader: bokeh_vert,
      fragmentShader: bokeh_frag,
      uniforms: {
        uDiffuse: {
          value: this.mainScene.fbo.texture,
        },
        uResolution: {
          value: CanvasBase.fbo_dimensions,
        },
        uOutput: {
          value: false,
        },
        uDirection: {
          value: 1,
        },
        uBlur: {
          value: true,
        },
      },
    })

    this.plane = new Mesh(geo, this.material)

    this.scene.add(this.plane)

    EventBus.on('FINISH_LOADING', () => {
      this.mainScene.init()
    })

    assets.load()

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.guiParams = {
      blur_iteration: 1,
      isBlur: true,
    }

    this.gui = new GUI()
    document.body.appendChild(this.gui.domElement)

    this.gui.add(this.guiParams, 'blur_iteration', 1, 8, 1)
    this.gui.add(this.guiParams, 'isBlur')

    this.loop()
  }

  resize() {
    CanvasBase.resize()
    this.mainScene.resize()
    for (let i = 0; i < this.fbos.length; i++) {
      this.fbos[i].setSize(
        CanvasBase.fbo_dimensions.x,
        CanvasBase.fbo_dimensions.y
      )
    }
  }

  update() {
    this.stats.begin()
    CanvasBase.update()
    this.mainScene.update()

    const uniforms = this.material.uniforms

    if (this.guiParams.isBlur) {
      uniforms.uOutput.value = false
      uniforms.uBlur.value = true

      for (let i = 0; i <= this.guiParams.blur_iteration - 1; i++) {
        if (i == 0) {
          uniforms.uDiffuse.value = this.mainScene.fbo.texture
        } else {
          uniforms.uDiffuse.value = this.fbos[i - 1].texture
        }

        uniforms.uDirection.value = i % 2 == 0 ? 1 : -1

        if (i < this.guiParams.blur_iteration - 1) {
          CanvasBase.renderer.setRenderTarget(this.fbos[i])
          CanvasBase.renderer.render(this.scene, this.camera)
        } else {
          uniforms.uOutput.value = true

          CanvasBase.renderer.setRenderTarget(null)
          CanvasBase.renderer.render(this.scene, this.camera)
        }
      }
    } else {
      uniforms.uDiffuse.value = this.mainScene.fbo.texture
      uniforms.uOutput.value = true
      uniforms.uBlur.value = false

      CanvasBase.renderer.setRenderTarget(null)
      CanvasBase.renderer.render(this.scene, this.camera)
    }

    this.stats.end()
  }

  loop() {
    this.update()

    window.requestAnimationFrame(this.loop.bind(this))
  }
}
