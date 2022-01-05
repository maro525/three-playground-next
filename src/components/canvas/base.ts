import { Clock, Vector2, WebGLRenderer }from "three"

class CanvasBase {

  $wrapper: HTMLDivElement
  dimensions: Vector2;
  dimensions_old: Vector2
  aspect: number
  isMobile: boolean
  pixelRatio: number
  fbo_dimensions: Vector2
  time: number
  delta: number = 0

  renderer: WebGLRenderer
  $canvas: HTMLCanvasElement
  clock: Clock

  constructor() {
    this.dimensions = new Vector2()
    this.dimensions_old = new Vector2()
    this.aspect = null
    this.isMobile = false
    this.pixelRatio = null

    this.fbo_dimensions = new Vector2()
    this.time = 0
    this.delta = 0
  }

  init($wrapper: HTMLDivElement, bgColor: string) {
    this.$wrapper = $wrapper
    this.pixelRatio = Math.min(2, window.devicePixelRatio)

    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true
    })

    this.$canvas = this.renderer.domElement
    $wrapper.appendChild(this.$canvas)

    this.renderer.setClearColor(bgColor)

    this.renderer.setPixelRatio(this.pixelRatio)

    this.clock = new Clock()
    this.clock.start()
    this.resize()
  }

  resize() {
    const width = this.$wrapper.clientWidth
    const height = this.$wrapper.clientHeight

    this.dimensions_old.copy(this.dimensions)
    this.dimensions.set(width, height)

    this.fbo_dimensions.set(
      width * this.pixelRatio,
      height * this.pixelRatio
    )

    this.aspect = width / height

    this.renderer.setSize(this.dimensions.x, this.dimensions.y)
  }

  update() {
    const delta = this.clock.getDelta()
    this.delta = delta
    this.time += this.delta
  }
}

export default new CanvasBase()
