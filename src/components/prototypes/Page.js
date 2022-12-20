// @ts-check

/* global self */
/* global localStorage */

import { Shadow } from '../event-driven-web-components-prototypes/src/Shadow.js'

export default class Page extends Shadow() {
  constructor () {
    super()

    this.scrollY = 0
    this.routeListener = event => (this.scrollY = self.scrollY)
    this.playListener = event => this.videos.forEach(video => {
      if (video === event.target) {
        video.classList.add('playing')
        video.scrollIntoView()
        video.requestFullscreen()
      } else {
        video.classList.remove('playing')
        video.pause()
      }
    })
    this.endedListener = event => {
      if (document.fullscreenElement) document.exitFullscreen()
      let nextVideo = null
      if ((nextVideo = this.videos[this.videos.indexOf(event.target) + 1])) nextVideo.play()
    }
    this.timeupdateListener = event => {
      if (this.timeupdateTimeout) return
      const target = event.target
      this.timeupdateTimeout = setTimeout(() => {
        this.timeupdateTimeout = null
        let src
        if ((src = target.src || target.querySelector('source').src)) localStorage.setItem(src, target.currentTime)
      }, 1000)
    }
    this.loadedmetadataListener = event => {
      let src, currentTime
      if ((src = event.target.src || event.target.querySelector('source').src) && (currentTime = localStorage.getItem(src))) event.target.currentTime = currentTime
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    document.body.addEventListener('route', this.routeListener)
    this.root.addEventListener('play', this.playListener, { capture: true })
    this.root.addEventListener('ended', this.endedListener, { capture: true })
    this.root.addEventListener('loadedmetadata', this.loadedmetadataListener, { capture: true, once: true })
    this.root.addEventListener('timeupdate', this.timeupdateListener, { capture: true })
    self.scrollTo(0, this.scrollY)
  }

  disconnectedCallback () {
    document.body.removeEventListener('route', this.routeListener)
    this.root.removeEventListener('play', this.playListener)
    this.root.removeEventListener('ended', this.endedListener)
    this.root.removeEventListener('loadedmetadata', this.loadedmetadataListener)
    this.root.removeEventListener('timeupdate', this.timeupdateListener)
  }

  /**
   * checks if render is needed
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.h2
  }

  /**
   * checks if render is needed
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector('style[_css]')
  }

  renderCSS () {
    this.css = /* CSS */`
      :host {
        display: block;
        color: var(--color);
        width: 60vw;
        padding: 1em;
        box-sizing: border-box;
      }
      .playing {
        border: var(--border);
      }
      :host a {
        color: var(--a-color);
        word-break: break-all;
      }
      :host a:hover {
        color: var(--a-color-hover);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          width: 100%;
          padding: 1em;
        }
      }
    `
  }

  get h2 () {
    return this.root.querySelector('h2')
  }

  get videos () {
    return Array.from(this.root.querySelectorAll('video'))
  }
}
