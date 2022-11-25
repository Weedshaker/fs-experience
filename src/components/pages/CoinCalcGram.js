// @ts-check

import Page from '../prototypes/Page.js'

export default class TutorialOne extends Page {
  constructor () {
    super()

    this.inputId = 'gram-to-fiat-chf'
    this.changeListener = event => {
      const input = event.composedPath()[0]
      this.dispatchEvent(new CustomEvent('request-' + input.getAttribute('id'), {
        detail: {
          id: input.getAttribute('id'),
          value: input.value,
          target: input
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
    this.inputIdListener = event => {
      let resultNode
      if ((resultNode = this.root.querySelector('#result-buy-' + event.detail.id))) resultNode.value = event.detail.value.toFixed(2)
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.root.addEventListener('change', this.changeListener)
    document.body.addEventListener('answer-' + this.inputId, this.inputIdListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.root.removeEventListener('change', this.changeListener)
    document.body.removeEventListener('answer-' + this.inputId, this.inputIdListener)
  }

  renderCSS () {
    super.renderCSS()
    this.css = /* CSS */`
      .input {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .input > input {
        flex-grow: 1;
        font-size: 2em;
        max-width: 100%;
        height: 2em;
        text-align: center;
      }
      .input > span {
        padding: .5em;
      }
      .info {
        font-style: italic;
      }
      .equal {
        font-size: 6em;
        text-align: center;
      }
    `
  }

  renderHTML () {
    this.html = /* HTML */`
      <h1>Silberrechner<h1>
      <h2>Silbermünzen in Gramm zu Fiat-CHF</h2>
      <hr>
      <p class=info>Gewicht in Gramm der unterstützten Silbermünzen *</p>
      <div class="input">
        <input type="number" id="${this.inputId}" name="${this.inputId}" min="1" placeholder="Wieviel Gramm?"><span>&nbsp;Gramm</span>
      </div>
      <div class=equal>=</div>
      <p class=info>Bei 83.5% Silbergehalt, siehe "* Unterstützte Silbermünzen"</p>
      <div class="input">
        <input disabled type="number" id="result-buy-${this.inputId}" name="result-buy-${this.inputId}" placeholder="..."><span>&nbsp;CHF</span>
      </div>
      <p class=info>Keine Garantie bezüglich Richtigkeit der Umrechnung.</p>
    `
  }
}
