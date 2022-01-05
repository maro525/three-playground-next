class EventBus {

  bus: HTMLElement


  constructor() {
    this.bus = document.createElement('fake')
  }

  // add event listener
  on(event, callback) {
    this.bus.addEventListener(event, callback)
  }

  once(event, callback) {
    let bus = this.bus
    this.bus.addEventListener(event, function fn() {
      bus.removeEventListener(event, fn)
      callback.apply(this, arguments)
    })
  }

  off(event, callback) {
    this.bus.removeEventListener(event, callback)
  }

  emit(event, detail) {
    let customEvent = new CustomEvent(event, detail)
    this.bus.dispatchEvent(customEvent)
  }
}

export default new EventBus()
