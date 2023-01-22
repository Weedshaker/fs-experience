// @ts-check

import Page from '../prototypes/Page.js'

export default class ParlamentVideo extends Page {
  constructor () {
    super()

    this.playListener = event => {}
  }

  renderCSS () {
    super.renderCSS()
    this.css = /* CSS */`
      :host {
        text-align: center;
      }
      :host video {
        aspect-ratio: 464/848;
        width: 50%;
        height: auto;
      }
      :host a {
        color: red;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host video {
          width: 100%;
        }
      }
    `
  }

  renderHTML () {
    this.html = /* HTML */`
      <h1>Lukas Reimann Rede zur Goldinitative:</h1>
      <h2>"Ungedecktes Geld ist der grosse Betrug unserer Zeit"</h2>
      <p><a href="https://www.efd.admin.ch/efd/de/home/das-efd/abstimmungen/initiative--rettet-unser-schweizer-gold--gold-initiative----30-1.html" target=_blank>Das Volk ist den Empfehlungen des Bundesrates gefolgt und hat die Initiative mit 77.3 Prozent Nein-Stimmen abgelehnt.</a><br><br>Jedoch können und dürfen wir uns selbst retten mit Silbermünzen...</p>
      <video loading="lazy" controls autoplay loop>
        <source src="./vid/IMG_5904.MOV" type="video/mp4">
      </video>
    `
  }
}
