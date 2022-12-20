// @ts-check

import CoinCalcGram from './CoinCalcGram.js'

export default class CoinCalcHalfer extends CoinCalcGram {
  constructor () {
    super()

    this.changeListenerPieces = event => {
      const input = event.composedPath()[0]
      if (input.getAttribute('id') === 'request-silver-coin-price-by-pieces') this.root.querySelector('#request-silver-coin-price-by-gram-in-chf').value = input.value * 2.5
    }
  }

  connectedCallback () {
    this.root.addEventListener('change', this.changeListenerPieces)
    super.connectedCallback()
  }

  disconnectedCallback () {
    this.root.removeEventListener('change', this.changeListenerPieces)
    super.disconnectedCallback()
  }

  renderCSS () {
    super.renderCSS()
    this.css = /* CSS */`
      :host {
        padding: 1em 1em 1em 2em;
      }
    `
  }
  
  renderHTML () {
    super.renderHTML()

    this.root.querySelector('h2').textContent = '1/2-Fr. Stückzahl'
    this.root.querySelector('#request-silver-coin-price-by-gram-in-chf').setAttribute('placeholder', '...')
    this.root.querySelector('#request-silver-coin-price-by-gram-in-chf').setAttribute('disabled', 'true')
    const div = document.createElement('div')
    div.innerHTML = /* HTML */`
      <div class="input">
        <input type="number" id="request-silver-coin-price-by-pieces" name="request-silver-coin-price-by-pieces" min="1" placeholder="Wieviel 1/2-Fr. Stücke?"><span>&nbsp;Stücke</span>
      </div>
      <div class=equal>=</div>
    `
    this.root.querySelector('hr').after(...div.childNodes)
  }
}
