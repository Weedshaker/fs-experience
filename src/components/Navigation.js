// @ts-check

/* global self */
/* global location */

import { Shadow } from './event-driven-web-components-prototypes/src/Shadow.js'

export default class Navigation extends Shadow() {
  constructor () {
    super()

    this.hashchangeListener = event => this.as.forEach(a => a.classList[location.hash === a.getAttribute('href') || location.hash === a.getAttribute('alt-href') ? 'add' : 'remove']('active'))
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    self.addEventListener('hashchange', this.hashchangeListener)
    this.hashchangeListener()
  }

  disconnectedCallback () {
    self.removeEventListener('hashchange', this.hashchangeListener)
  }

  /**
   * checks if render is needed
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector('style[_css]')
  }

  /**
   * checks if render is needed
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.nav
  }

  renderCSS () {
    this.css = /* CSS */`
      nav {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: fixed;
        height: 100%;
        padding: 1em;
        box-sizing: border-box;
        border-right: 1px solid var(--color);
        width: 40vw;
        overflow: auto;
      }
      :host ul {
        padding: 0;
        list-style: none;
      }
      :host a {
        color: var(--a-color);
      }
      :host a.active {
        color: var(--a-color-active);
      }
      :host a:hover {
        color: var(--a-color-hover);
      }
      :host .source {
        background: url('./img/fs-experience.png') no-repeat;
        min-height: 320px;
        background-size: contain;
      }
      :host .source ul {
        display: flex;
        gap: 1em;
        list-style: none;
      }
      :host .source ul img {
        height: 1.5em;
        width: 1.5em;
      }
      :host .source p {
        text-shadow: 0.15em 0.15em 0.3em var(--a-color);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        nav {
          position: inherit;
          width: 100vw;
          border-bottom: 1px solid var(--color);
          border-right: 0;
        }
        :host .source {
          min-height: 0;
        }
      }
    `
  }

  renderHTML () {
    this.html = /* HTML */`
      <nav>
        <ul>
          <li><a href="#/one" alt-href="#/">Episode One - Hermann von der freien KMU</a></li>
        </ul>
        <div class="source">
          <p>fs-experience.ch</p>
          <ul>
            <li><a href="../feed.rss"><img src="./img/rss.png"></a></li>
            <li><a href="https://t.me/fsexperience" target="_blank"><img src="./img/telegram.png"></li>
          </ul>
        <div>
      </nav>
    `
  }

  get nav () {
    return this.root.querySelector('nav')
  }

  get as () {
    return Array.from(this.root.querySelectorAll('a'))
  }
}
