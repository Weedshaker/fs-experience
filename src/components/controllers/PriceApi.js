// @ts-check

/* global self */
/* global HTMLElement */
/* global location */
/* global customElements */
/* global CustomEvent */

/**
 * As a controller, this component fetches the desired prices
 *
 * @export
 */
export default class PriceApi extends HTMLElement {
  /**
   * Creates an instance of PriceApi
   *
   */
  constructor () {
    super()

    this.inputId = 'gram-to-fiat-chf'
    this.requestGramToFiatChf = event => {
      this.silverCoinPriceByGramInCHF.then(price => this.dispatchEvent(new CustomEvent('answer-' + this.inputId, {
          detail: {
            id: this.inputId,
            value: price * event.detail.value
          },
          bubbles: true,
          cancelable: true,
          composed: true
      })))
    }
  }

  connectedCallback () {
    this.addEventListener(`request-${this.inputId}`, this.requestGramToFiatChf)
  }

  disconnectedCallback () {
    this.removeEventListener(`request-${this.inputId}`, this.requestGramToFiatChf)
  }

  get silverPriceByOunceInUsd () {
    return new Promise(resolve => {
      let price
      if ((price = self.sessionStorage.getItem('silverPriceByOunceInUsd'))) return resolve(price)
      fetch("https://api.metals.live/v1/spot/silver").then(res => res.json()).then(json => {
        price = json[0].price
        self.sessionStorage.setItem('silverPriceByOunceInUsd', price)
        self.localStorage.setItem('silverPriceByOunceInUsd', price)
        return resolve(price)
      }).catch(error => resolve(self.localStorage.getItem('silverPriceByOunceInUsd')))
    })
  }

  get silverPriceByGramInCHF () {
    return Promise.all([this.silverPriceByOunceInUsd, this.usdToChfExchangeRate]).then(([silverPriceByOunceInUsd, usdToChfExchangeRate]) => {
      const oneOunceInGram = 28.34952
      const silverPriceByOunceInCHF = silverPriceByOunceInUsd * usdToChfExchangeRate
      return silverPriceByOunceInCHF / oneOunceInGram
    })
  }

  get silverCoinPriceByGramInCHF () {
    return this.silverPriceByGramInCHF.then(silverPriceByGramInCHF => {
      return silverPriceByGramInCHF * 0.835
    })
  }

  get usdToChfExchangeRate () {
    return new Promise(resolve => {
      let price
      if ((price = self.sessionStorage.getItem('usdToChfExchangeRate'))) return resolve(price)
      fetch("https://api.exchangerate.host/convert?from=USD&to=CHF").then(res => res.json()).then(json => {
        price = json.info.rate
        self.sessionStorage.setItem('usdToChfExchangeRate', price)
        self.localStorage.setItem('usdToChfExchangeRate', price)
        return resolve(price)
      }).catch(error => resolve(self.localStorage.getItem('usdToChfExchangeRate')))
    })
  }
}
