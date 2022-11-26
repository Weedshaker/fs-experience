// @ts-check

import Page from '../prototypes/Page.js'

export default class TutorialOne extends Page {
  constructor () {
    super()

    this.changeListener = event => {
      const input = event.composedPath()[0]
      if (input.getAttribute('id') === 'request-silver-coin-price-by-gram-in-chf') {
        this.root.querySelector('.loader.answer-silver-coin-price-by-gram-in-chf').classList.add('show')
        this.dispatchEvent(new CustomEvent(input.getAttribute('id'), {
          detail: {
            grams: input.value
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }
    }
    this.answerSilverCoinPriceByGramInChfListener = event => {
      let resultNode
      if ((resultNode = this.root.querySelector('#' + event.detail.id))) {
        resultNode.value = (event.detail.grams * event.detail.price).toFixed(2)
        this.root.querySelector('.loader.answer-silver-coin-price-by-gram-in-chf').classList.remove('show')
      }
    }
  }

  connectedCallback () {
    super.connectedCallback()
    this.root.addEventListener('change', this.changeListener)
    document.body.addEventListener('answer-silver-coin-price-by-gram-in-chf', this.answerSilverCoinPriceByGramInChfListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.root.removeEventListener('change', this.changeListener)
    document.body.removeEventListener('answer-silver-coin-price-by-gram-in-chf', this.answerSilverCoinPriceByGramInChfListener)
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
      .result {
        position: relative;
      }
      .loader.show {
        display: block;
      }
      /* https://projects.lukehaas.me/css-loaders/ */
      .loader,
      .loader:before,
      .loader:after {
        background: var(--color);
        -webkit-animation: load1 1s infinite ease-in-out;
        animation: load1 1s infinite ease-in-out;
        width: 1em;
        height: 4em;
      }
      .loader {
        display: none;
        color: var(--color);
        text-indent: -9999em;
        margin: 88px auto;
        position: absolute;
        left: 50%;
        font-size: 11px;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
      }
      .loader:before,
      .loader:after {
        position: absolute;
        top: 0;
        content: '';
      }
      .loader:before {
        left: -1.5em;
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
      }
      .loader:after {
        left: 1.5em;
      }
      @-webkit-keyframes load1 {
        0%,
        80%,
        100% {
          box-shadow: 0 0;
          height: 4em;
        }
        40% {
          box-shadow: 0 -2em;
          height: 5em;
        }
      }
      @keyframes load1 {
        0%,
        80%,
        100% {
          box-shadow: 0 0;
          height: 4em;
        }
        40% {
          box-shadow: 0 -2em;
          height: 5em;
        }
      }
    `
  }

  renderHTML () {
    this.html = /* HTML */`
      <h1>Silbermünzen</h1>
      <h2>in Gramm zu Fiat-CHF</h2>
      <hr>
      <p class=info>Gewicht in Gramm der unterstützten Silbermünzen *</p>
      <div class="input">
        <input type="number" id="request-silver-coin-price-by-gram-in-chf" name="request-silver-coin-price-by-gram-in-chf" min="1" placeholder="Wieviel Gramm?"><span>&nbsp;Gramm</span>
      </div>
      <div class=equal>=</div>
      <p class=info>Silberwert bei 83.5% Silbergehalt:</p>
      <div class="input result">
        <div class="loader answer-silver-coin-price-by-gram-in-chf">Loading...</div>
        <input disabled type="number" id="answer-silver-coin-price-by-gram-in-chf" name="answer-silver-coin-price-by-gram-in-chf" placeholder="..."><span>&nbsp;CHF</span>
      </div>
      <p class=info>Keine Garantie bezüglich Richtigkeit der Umrechnung.</p>
    `
  }
}
