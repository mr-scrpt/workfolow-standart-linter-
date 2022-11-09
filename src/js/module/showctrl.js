import $ from 'jquery'
export class ShowCtrl {
  constructor({
    parentClass,
    controllerClass,
    boxClass,
    relativeBoxClass,
    bp,
  }) {
    this.#parent = $(`.${parentClass}`)
    this.#relativeBox = $(`.${relativeBoxClass}`)
    this.#controller = this.#parent.find(`.${controllerClass}`)
    this.#box = this.#parent.find(`.${boxClass}`)
    this.#bp = bp
    // INIT
    this.init()
  }
  #status
  #parent
  #relativeBox
  #controller
  #box
  #bp

  #libClass = {
    page: 'showCtrl',
    relativeBox: 'showCtrl-relative',
    box: {
      base: 'showCtrl__box',
      open: 'showCtrl__box_open',
      close: 'showCtrl__box_close',
      init: 'showCtrl__box_init',
    },
    controller: {
      base: 'showCtrl__controller',
      open: 'showCtrl__controller_open',
      close: 'showCtrl__controller_close',
      show: 'showCtrl__controller_show',
    },
  }
  init() {
    $('body').addClass(this.#libClass.page)
    this.#relativeBox.addClass(this.#libClass.relativeBox)
    this.#box.addClass(this.#libClass.box.base)
    this.#controller.addClass(this.#libClass.controller.base)
    // this.#box.addClass(this.#libClass.box.init)

    this.#status = 'init'
    if (this.isMobile()) {
      this.controllerShow()
      this.#box.addClass(this.#libClass.box.init)
    }
    // EVENTS
    this.#controller.on('click', (e) => {
      e.stopPropagation()
      if (!this.isMobile()) return
      if (this.#status === 'close' || this.#status === 'init') {
        this.open()
      } else {
        this.close()
      }
    })
    $(window).on('resize', () => {
      const isMobile = this.isMobile()
      if (!isMobile) {
        this.clearClass()
      } else {
        this.#controller.addClass(this.#libClass.controller.show)
        this.#box.addClass(this.#libClass.box.init)
      }
    })
    $(this.#box).on('click', (e) => {
      e.stopPropagation()
    })
    $(window).on('click', () => {
      if (this.isMobile() && this.#status === 'open') {
        this.close()
      }
    })

    // $(`.${this.#libClass.controller.base}`).on('click', (e) => {
    //   const $target = $(e.target).closest(`.${this.#libClass.controller.base}`)
    //   const $controllers = $(`.${this.#libClass.controller.base}`)
    //   $controllers.each((_, item) => {
    //     const $item = $(item)
    //     if (
    //       $target[0] !== $item[0] &&
    //       $item.hasClass(`${this.#libClass.controller.open}`)
    //     ) {
    //       console.log('open')
    //       $item.trigger('click')
    //     }
    //   })
    // })
  }
  isMobile() {
    const size = $(window).width()

    if (size < this.#bp) {
      return true
    }
    return false
  }

  open() {
    this.boxOpen()
    this.controllerOpen()
    this.#status = 'open'
  }
  close() {
    this.boxClose()
    this.controllerClose()
    this.#status = 'close'
  }
  clearClass() {
    this.#box.removeClass(this.#libClass.box.open)
    this.#box.removeClass(this.#libClass.box.close)

    this.#box.removeClass(this.#libClass.box.init)
    this.#controller.removeClass(this.#libClass.controller.open)
    this.#controller.removeClass(this.#libClass.controller.close)
    this.controllerHide()
    this.#status = 'init'
  }

  controllerClose() {
    this.#controller.addClass(this.#libClass.controller.close)
    this.#controller.removeClass(this.#libClass.controller.open)
  }

  controllerOpen() {
    this.#controller.addClass(this.#libClass.controller.open)
    this.#controller.removeClass(this.#libClass.controller.close)
  }

  controllerShow() {
    this.#controller.addClass(this.#libClass.controller.show)
  }
  controllerHide() {
    this.#controller.removeClass(this.#libClass.controller.show)
  }
  boxClose() {
    this.#box.addClass(this.#libClass.box.close)
    this.#box.removeClass(this.#libClass.box.open)
    this.#box.removeClass(this.#libClass.box.init)

    // this.#box.removeClass(this.#libClass.box.init)
  }

  boxOpen() {
    this.#box.addClass(this.#libClass.box.open)
    this.#box.removeClass(this.#libClass.box.close)
    this.#box.removeClass(this.#libClass.box.init)
    // this.#box.removeClass(this.#libClass.box.init)
  }
}

const options = {
  parentClass: 'menu-simple',
  controllerClass: 'menu-simple__controller',
  boxClass: 'menu-simple__box',
  relativeBoxClass: 'menu-simple',
  bp: 994,
}
new ShowCtrl(options)

const optionsTest = {
  parentClass: 'menu-test',
  controllerClass: 'menu-test__controller',
  boxClass: 'menu-test__box',
  relativeBoxClass: 'menu-test',
  bp: 994,
}
new ShowCtrl(optionsTest)
