// @ts-check

/* global self */
/* global location */

import Navigation from './Navigation.js'

export default class NavigationCoin extends Navigation {
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
      details {
        cursor: pointer;
        border: 1px solid var(--color);
        border-radius: 4px;
        padding: .5em .5em 0;
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
    `
  }

  renderHTML () {
    this.html = /* HTML */`
      <nav>
        <ul>
          <li><a href="#/calc-gram" alt-href="#/">Gramm -> Fiat-CHF</a></li>
          <li>Diese Seite ist im Aufbau...</li>
        </ul>
        <div>
          <div class="source no-bg">
            <details>
              <summary>* Unterstützte Silbermünzen</summary>
              <p>Die unten aufgeführten Silbermünzen sind die mit dem grössten Vorkommen, einem gleich prozentualen Silbergehalt und Jahrgänge bis und mit 1967.</p>
              <div class=table>
                <table border="1">
                  <thead>
                    <tr>
                      <th colspan="2">5-Fr.-Stück von 1931 - 1967</th>
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
                      <th colspan="2">2-Fr.-Stück von 1874 - 1967</th>
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
                      <th colspan="2">1-Fr.-Stück von 1875 - 1967</th>
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
              </div>
            </details>
          </div>
          <br>
          <details>
            <summary>Rettet die Schweizerfranken Silbermünzen</summary>
            Jede gerettete Münze zählt und ist ein Schritt in die Unabhängigkeit von den digitalen Währungen (CBDC)!
          </details>
          <br>
          <details>
            <summary>Quellen - Externe Links</summary>
            <ol>
              <li><a href="https://de.wikipedia.org/wiki/Fiatgeld" target=_blank>Fiatgeld</a></li>
              <li><a href="https://www.swissmint.ch/swissmint/de/home/dokumentation/muenzkunde/160-jahre-ch-muenzwesen.html" target=_blank>160 Jahre Schweizerisches Münzwesen - Ein kurzer historischer Abriss</a></li>
              <li><a href="https://www.swissmint.ch/dam/swissmint/de/dokumente/dokumentation/numis-berichte/5liber-burkhard.pdf.download.pdf/5liber-burkhard.pdf" target=_blank>PAUL BURKHARD UND DER FÜNFLIBER - PRÄGEVARIANTEN BEI DEN 5-FR.-STÜCKEN</a></li>
              <li><a href="https://www.macrotrends.net/1470/historical-silver-prices-100-year-chart" target=_blank>Historischer Silberpreis in Unzen (1 Unze === 28.35 Gramm) - Höchststand von 1980 4'813$/kg - Tiefststand 1931 von 191$/kg</a></li>
            </ol>
          </details>
        <div>
      </nav>
    `
  }
}
