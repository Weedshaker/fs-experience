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

    this.requestSilverCoinPriceByGramInChf = event => {
      this.silverCoinPriceByGramInChf.then(price => this.dispatchEvent(new CustomEvent('answer-silver-coin-price-by-gram-in-chf', {
          detail: {
            id: 'answer-silver-coin-price-by-gram-in-chf',
            grams: event.detail ? event.detail.grams : null,
            price
          },
          bubbles: true,
          cancelable: true,
          composed: true
      })))
    }

    this.requestUsdToChfExchangeRate = event => {
      this.usdToChfExchangeRate.then(rate => this.dispatchEvent(new CustomEvent('answer-usd-to-chf-exchange-rate', {
          detail: {
            id: 'answer-usd-to-chf-exchange-rate',
            rate
          },
          bubbles: true,
          cancelable: true,
          composed: true
      })))
    }

    this.requestSilverPriceByOunceInUsd = event => {
      this.silverPriceByOunceInUsd.then(price => this.dispatchEvent(new CustomEvent('answer-silver-price-by-ounce-in-usd', {
          detail: {
            id: 'answer-silver-price-by-ounce-in-usd',
            price
          },
          bubbles: true,
          cancelable: true,
          composed: true
      })))
    }

    this.requestSilverPriceByGramInChf = event => {
      this.silverPriceByGramInChf.then(price => this.dispatchEvent(new CustomEvent('answer-silver-price-by-gram-in-chf', {
          detail: {
            id: 'answer-silver-price-by-gram-in-chf',
            price
          },
          bubbles: true,
          cancelable: true,
          composed: true
      })))
    }

    this.timeLimit = 300000 // don't update within the time limit (60000ms = 1min)
    this.timeLimitUsdExchange = 6000000
  }

  connectedCallback () {
    this.addEventListener('request-silver-coin-price-by-gram-in-chf', this.requestSilverCoinPriceByGramInChf)
    this.addEventListener('request-usd-to-chf-exchange-rate', this.requestUsdToChfExchangeRate)
    this.addEventListener('request-silver-price-by-ounce-in-usd', this.requestSilverPriceByOunceInUsd)
    this.addEventListener('request-silver-price-by-gram-in-chf', this.requestSilverPriceByGramInChf)
  }

  disconnectedCallback () {
    this.removeEventListener('request-silver-coin-price-by-gram-in-chf', this.requestSilverCoinPriceByGramInChf)
    this.removeEventListener('request-usd-to-chf-exchange-rate', this.requestUsdToChfExchangeRate)
    this.removeEventListener('request-silver-price-by-ounce-in-usd', this.requestSilverPriceByOunceInUsd)
    this.removeEventListener('request-silver-price-by-gram-in-chf', this.requestSilverPriceByGramInChf)
  }

  get silverPriceByOunceInUsd () {
    return new Promise(resolve => {
      let price
      if ((price = this.getItem('silverPriceByOunceInUsd', 'sessionStorage'))) return resolve(price)
      // https://api.metals.live/
      //fetch("https://api.metals.live/v1/spot/silver").then(res => res.json()).then(json => {
      // https://www.monex.com/silver-prices/
      fetch("https://api.monex.com:444/api/v1/Metals/spot/current?metals=SBSPOT").then(res => res.json()).then(json => {
        //price = json[0].price
        price = json.data[0].last
        this.setItem('silverPriceByOunceInUsd', price)
        this.requestSilverPriceByOunceInUsd()
        this.requestSilverPriceByGramInChf()
        return resolve(price)
      }).catch(error => resolve(this.getItem('silverPriceByOunceInUsd', 'localStorage')))
    })
  }

  get silverPriceByGramInChf () {
    return Promise.all([this.silverPriceByOunceInUsd, this.usdToChfExchangeRate]).then(([silverPriceByOunceInUsd, usdToChfExchangeRate]) => {
      const silverPriceByOunceInChf = silverPriceByOunceInUsd * usdToChfExchangeRate
      const oneOunceInGram = 31.1034768 // https://www.convertunits.com/from/1+troy+ounce/to/gram
      return silverPriceByOunceInChf / oneOunceInGram
    })
  }

  get silverCoinPriceByGramInChf () {
    return this.silverPriceByGramInChf.then(silverPriceByGramInChf => {
      return silverPriceByGramInChf * 0.835
    })
  }

  get usdToChfExchangeRate () {
    return new Promise(resolve => {
      let rate
      if ((rate = this.getItem('usdToChfExchangeRate', 'sessionStorage', this.timeLimitUsdExchange))) return resolve(rate)
      fetch("https://api.exchangerate.host/convert?from=USD&to=CHF").then(res => res.json()).then(json => {
        rate = json.info.rate
        this.setItem('usdToChfExchangeRate', rate)
        this.requestUsdToChfExchangeRate()
        return resolve(rate)
      }).catch(error => resolve(this.getItem('usdToChfExchangeRate', 'localStorage')))
    })
  }

  setItem (key, value) {
    self.sessionStorage.setItem(key, value)
    self.localStorage.setItem(key, value)
    self.localStorage.setItem(key + '_time', String(Date.now()))
  }

  getItem (key, storage = 'both', timeLimit = this.timeLimit) {
    switch (storage) {
      case 'sessionStorage':
        return self.localStorage.getItem(key + '_time') && Number(self.localStorage.getItem(key + '_time')) + timeLimit > Date.now()
          ? self.sessionStorage.getItem(key)
          : null
      case 'localStorage':
        return self.localStorage.getItem(key)
      default:
        return self.sessionStorage.getItem(key) || self.localStorage.getItem(key)
    }
  }
}
