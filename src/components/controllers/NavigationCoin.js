// @ts-check

/* global self */
/* global location */

import Navigation from './Navigation.js'

export default class NavigationCoin extends Navigation {
  constructor () {
    super()

    const updateResultTimeNode = () => {
      let resultTimeNode
      if ((resultTimeNode = this.root.querySelector('#answer-time'))) resultTimeNode.textContent = (new Date()).toLocaleString('de-CH')
    }

    this.answerUsdToChfExchangeRate = event => {
      let resultNode
      if ((resultNode = this.root.querySelector('#' + event.detail.id))) resultNode.textContent = Number(event.detail.rate).toFixed(2)
      updateResultTimeNode()
    }

    this.answerSilverPriceByOunceInUsd = event => {
      let resultNode
      if ((resultNode = this.root.querySelector('#' + event.detail.id))) resultNode.textContent = Number(event.detail.price).toFixed(2)
      updateResultTimeNode()
    }

    this.answerSilverPriceByGramInChfListener = event => {
      let resultNode
      if ((resultNode = this.root.querySelector('#' + event.detail.id))) resultNode.textContent = (event.detail.price * 1000).toFixed(2)
      updateResultTimeNode()
    }
  }

  connectedCallback () {
    super.connectedCallback()
    document.body.addEventListener('answer-usd-to-chf-exchange-rate', this.answerUsdToChfExchangeRate)
    document.body.addEventListener('answer-silver-price-by-ounce-in-usd', this.answerSilverPriceByOunceInUsd)
    document.body.addEventListener('answer-silver-price-by-gram-in-chf', this.answerSilverPriceByGramInChfListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    document.body.removeEventListener('answer-usd-to-chf-exchange-rate', this.answerUsdToChfExchangeRate)
    document.body.removeEventListener('answer-silver-price-by-ounce-in-usd', this.answerSilverPriceByOunceInUsd)
    document.body.removeEventListener('answer-silver-price-by-gram-in-chf', this.answerSilverPriceByGramInChfListener)
  }

  renderCSS () {
    super.renderCSS()
    this.css = /* CSS */`
      :host .table {
        display: flex;
        gap: 1em;
        justify-content: center;
        font-size: 0.8em;
        flex-wrap: wrap;
      }
      :host .table table {
        width: min-content;
      }
      :host .table table img {
        max-width: 100%;
      }
      details {
        cursor: pointer;
        border: 1px dotted var(--color);
        border-radius: 4px;
        padding: .5em .5em 0;
      }
      #answer-time {
        font-weight: bold;
      }
      summary {
        font-weight: bold;
        margin: -.5em -.5em 0;
        padding: .5em;
      }
      details[open] {
        padding: .5em;
      }
      details[open] summary {
        border-bottom: 1px solid var(--color);
        margin-bottom: 1em;
      }
      :host > nav > ul > li {
        margin-bottom: .5em;
      }
      :host #rates {
        font-size: 0.8em;
        padding-top: 1em;
        font-style: italic;
      }
      :host .hint {
        font-style: italic;
        color: coral;
      }
      :host .tiny {
        font-size: 0.8em;
      }
    `
  }

  renderHTML () {
    this.html = /* HTML */`
      <nav>
        <ul>
          <li><a href="#/calc-gram" alt-href="#/">Silbermünzen in Gramm => Fiat-CHF</a></li>
          <li><a href="#/calc-fiver" alt-href="#/">5-Fr. Silbermünzen Stückzahl => Fiat-CHF</a></li>
          <li><a href="#/calc-twoer" alt-href="#/">2-Fr. Silbermünzen Stückzahl => Fiat-CHF</a></li>
          <li><a href="#/calc-oner" alt-href="#/">1-Fr. Silbermünzen Stückzahl => Fiat-CHF</a></li>
          <li><a href="#/calc-halfer" alt-href="#/">1/2-Fr. Silbermünzen Stückzahl => Fiat-CHF</a></li>
        </ul>
        <div>
          <div class="source no-bg">
            <details>
              <summary>* Unterstützte Silbermünzen <span class="tiny hint">(grundsätzlich alle Jahrgänge bis und mit 1967)</span></summary>
              <p>Die unten aufgeführten Silbermünzen sind die mit dem grössten Vorkommen und einem prozentual gleichen Silbergehalt. Jahrgänge bis und mit 1967. Ältere Jahrgänge als die unten aufgeführten Silbermünzen können unter der Quelle der jeweiligen Stückelung nachgeschaut werden. Diese sind auch aus Silber, jedoch haben sie mehr Silber in Gewicht.</p>
              <div class=table>
                <table border="1">
                  <thead>
                    <tr>
                      <th>5-Fr.-Stück von 1931 - 1967 <span class="hint">+&nbsp;1969</span></th>
                      <th><img src=https://www.schweizer-geld.ch/img/shop/icons/CH-BM-5.00-1931-1969.png /></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Gewicht</td>
                      <td>15 Gramm</td>
                    </tr>
                    <tr>
                      <td>Silbergehalt in Gramm</td>
                      <td>12.525 Gramm</td>
                    </tr>
                    <tr>
                      <td>Silbergehalt in Prozent</td>
                      <td>83.5%</td>
                    </tr>
                    <tr>
                      <td colspan="2"><a href="https://www.schweizer-geld.ch/bundesmuenzen-5-franken/de/14-1" target=_blank>Quelle</a></td>
                    </tr>
                  </tbody>
                </table>
                <table border="1">
                  <thead>
                    <tr>
                      <th>2-Fr.-Stück von 1874 - 1967</th>
                      <th><img src=https://www.schweizer-geld.ch/img/shop/icons/CH-BM-2.00-1874-1967.png /></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Gewicht</td>
                      <td>10 Gramm</td>
                    </tr>
                    <tr>
                      <td>Silbergehalt in Gramm</td>
                      <td>8.35 Gramm</td>
                    </tr>
                    <tr>
                      <td>Silbergehalt in Prozent</td>
                      <td>83.5%</td>
                    </tr>
                    <tr>
                      <td colspan="2"><a href="https://www.schweizer-geld.ch/bundesmuenzen-2-franken/de/13-1" target=_blank>Quelle</a></td>
                    </tr>
                  </tbody>
                </table>
                <table border="1">
                  <thead>
                    <tr>
                      <th>1-Fr.-Stück von 1875 - 1967</th>
                      <th><img src=https://www.schweizer-geld.ch/img/shop/icons/CH-BM-1.00-1875-1967.png /></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Gewicht</td>
                      <td>5 Gramm</td>
                    </tr>
                    <tr>
                      <td>Silbergehalt in Gramm</td>
                      <td>4.175 Gramm</td>
                    </tr>
                    <tr>
                      <td>Silbergehalt in Prozent</td>
                      <td>83.5%</td>
                    </tr>
                    <tr>
                      <td colspan="2"><a href="https://www.schweizer-geld.ch/bundesmuenzen-1-franken/de/12-1" target=_blank>Quelle</a></td>
                    </tr>
                  </tbody>
                </table>
                <table border="1">
                  <thead>
                    <tr>
                      <th>1/2-Fr.-Stück von 1875 - 1967</th>
                      <th><img src=https://www.schweizer-geld.ch/img/shop/icons/CH-BM-0.50-1875-1967.png /></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Gewicht</td>
                      <td>2.5 Gramm</td>
                    </tr>
                    <tr>
                      <td>Silbergehalt in Gramm</td>
                      <td>2.0875 Gramm</td>
                    </tr>
                    <tr>
                      <td>Silbergehalt in Prozent</td>
                      <td>83.5%</td>
                    </tr>
                    <tr>
                      <td colspan="2"><a href="https://www.schweizer-geld.ch/bundesmuenzen-12-franken/de/11-1" target=_blank>Quelle</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
          </div>
          <br>
          <details>
            <summary>Rettet die CHF-Silbermünzen</summary>
            Die CHF-Silbermünzen <span class="tiny hint">(grundsätzlich alle Jahrgänge bis und mit 1967)</span> sind einzigartig mit dem aufgedruckten Nominalwert, dem Silberwert und dem Münzwert. Die EUR Länder können mit Ihren traditionellen Silbermünzen nicht mehr bezahlen, doch als Eidgenosse haben wir das Privileg mit unserem wahren Geld, zwar für einen Abschlag gegenüber dem Silberpreis, immer noch ein offiziell anerkanntes Zahlungsmittel in Form von Silber zu haben.
            Es ist enorm einfach die Echtheit der Münzen zu eruieren, da alle 0.50 bis 5.00 CHF Münzen bis und mit dem Jahrgang 1967 mindestens 83.5% Silbergehalt haben.
            Auch Silber selbst ist ein sehr stabiles Zahlungsmittel, 1920 kriegte man gleich viel Nahrungsmittel für 10g Silber wie heutzutage.
            Jede gerettete Münze zählt und ist ein Schritt in die Unabhängigkeit von den digitalen Währungen <a href="https://uncutnews.ch/digitale-waehrung-die-fed-bewegt-sich-auf-einen-monetaeren-totalitarismus-zu-iwf-plant-die-einrichtung-eines-pix-fednow-fuer-cbdcs-auf-der-ganzen-welt/" target="_blank">CBDC's!</a><br><br>
            Goldschmiede schmelzen wöchentlich kiloweise Silbermünzen ein. Frage deinen lokalen Goldschmied bezüglich Verkauf von Silbermünzen und tausche dich in unserer Community darüber aus 👇<br><br>
            <a href="https://t.me/+sN4PGJ0wlvkyNTJk" target="_blank">Telegramgruppe</a><br><br>
            <iframe class="gh-button" src="https://ghbtns.com/github-btn.html?user=Weedshaker&amp;repo=fs-experience&amp;type=star&amp;count=true&amp;size=large" scrolling="0" width="160px" height="30px" frameborder="0"></iframe>
          </details>
          <br>
          <details>
            <summary>Quellen - Externe Links</summary>
            <ol>
              <li><a href="https://www.swissmint.ch/swissmint/de/home/dokumentation/muenzkunde/160-jahre-ch-muenzwesen.html" target=_blank>160 Jahre Schweizerisches Münzwesen - Ein kurzer historischer Abriss</a></li>
              <li><a href="https://www.swissmint.ch/dam/swissmint/de/dokumente/dokumentation/numis-berichte/5liber-burkhard.pdf.download.pdf/5liber-burkhard.pdf" target=_blank>PAUL BURKHARD UND DER FÜNFLIBER - PRÄGEVARIANTEN BEI DEN 5-FR.-STÜCKEN</a></li>
              <li><a href="https://www.macrotrends.net/1470/historical-silver-prices-100-year-chart" target=_blank>Historischer Silberpreis in Troy Unzen (1 Unze === 31.10 Gramm) - Höchststand von 1980 ca. $4'800/kg - Tiefststand von 1931 ca. $190/kg</a></li>
              <li><a href="https://www.schweizer-geld.ch/" target=_blank>schweizer-geld.ch</a></li>
              <li><a href="https://www.numis.ch/schweizer-muenzen/5-franken-1931-1969/index.php" target=_blank>Auflagen in Mio.</a></li>
              <li><a href="https://de.wikipedia.org/wiki/Fiatgeld" target=_blank>Fiatgeld</a></li>
            </ol>
          </details>
          <br>
          <a href="https://t.me/+sN4PGJ0wlvkyNTJk" target="_blank" class=hint>Trete unserer Telegramgruppe bei und tausche dich mit uns aus. Zum Beispiel: Wo es Silbermünzen zu retten gibt...</a>
          <div id=rates><span id=answer-time>laden...</span> -> Kurse: 1&nbsp;USD&nbsp;=&nbsp;CHF&nbsp;<span id=answer-usd-to-chf-exchange-rate>laden...</span> (<a href="https://exchangerate.host" target="_blank">api.exchangerate.host</a>), 1&nbsp;Troy&nbsp;Unze&nbsp;Silber&nbsp;=&nbsp;USD&nbsp;<span id=answer-silver-price-by-ounce-in-usd>laden...</span> (<a href="https://www.monex.com/silver-prices/" target="_blank">monex.com</a>), 1kg&nbsp;Silber&nbsp;=&nbsp;CHF&nbsp;<span id=answer-silver-price-by-gram-in-chf>laden...</span></div>
        <div>
      </nav>
    `
    this.dispatchEvent(new CustomEvent('request-usd-to-chf-exchange-rate', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    this.dispatchEvent(new CustomEvent('request-silver-price-by-ounce-in-usd', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    this.dispatchEvent(new CustomEvent('request-silver-price-by-gram-in-chf', {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }
}
