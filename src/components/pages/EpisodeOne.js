// @ts-check

import Page from '../prototypes/Page.js'

export default class TutorialOne extends Page {
  renderHTML () {
    this.html = /* HTML */`
      <h2>Episode One - Hermann von der freien KMU</h2>
      <video controls="" width="100%" height="auto" poster="./img/2022-02-17_Hermann-Rohner_Freie-KMU.png">
        <source src="http://starsystems.ch/fs-experience/2022-02-17_Hermann-Rohner_Freie-KMU.mp4" type="video/mp4">
        <p>Your browser doesn't support HTML5 video. Here is a <a href="http://starsystems.ch/fs-experience/2022-02-17_Hermann-Rohner_Freie-KMU.mp4">link to the video</a> instead.</p>
      </video>
      <a href="http://starsystems.ch/fs-experience/2022-02-17_Hermann-Rohner_Freie-KMU.mp4" download target="_blank">Download</a>
      <br>
      <br>
      show notes:
      <ul>
      <li><a href="https://freiekmu.ch/" target="_blank">https://freiekmu.ch/</a>
        <li><a href="https://aletheia-scimed.ch/" target="_blank">https://aletheia-scimed.ch/</a>
        <li><a href="https://www.gghk.ch/" target="_blank">https://www.gghk.ch/</a>
        <li><a href="https://duckduckgo.com/?q=graphene+oxide+radio+frequency&t=h_&iax=videos&ia=videos" target="_blank">https://duckduckgo.com/?q=graphene+oxide+radio+frequency&t=h_&iax=videos&ia=videos</a>
        <li><a href="https://www.google.com/maps/search/wuhan,+labratory/@30.5293382,114.3849336,10.71z" target="_blank">https://www.google.com/maps/search/wuhan,+labratory/@30.5293382,114.3849336,10.71z</a>
      </ul>
    `
  }
}
