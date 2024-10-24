import { createHTMLElement } from "../../../utils/create-html-element";
import { BANNERINFO, InfoNumbers } from "../banner-info.const";

export class CtaBanner {
  private readonly node: HTMLElement;

  constructor() {
    this.node = createHTMLElement('div', ['div-cta-banner']);

    const titleBanner = createHTMLElement('h1', ['h1-title-banner']);
    titleBanner.innerHTML = BANNERINFO.title;
    this.node.append(titleBanner);

    const descriptionBanner = createHTMLElement('span', ['span-description-banner']);
    descriptionBanner.textContent = BANNERINFO.description;
    this.node.append(descriptionBanner);

    const btnBanner = createHTMLElement('button', ['btn-banner']);
    const linkBtn = createHTMLElement('a', ['a-link-anchor']);
    linkBtn.setAttribute('href', '#targetBlock');
    linkBtn.textContent = BANNERINFO.button;
    this.node.append(btnBanner);
    btnBanner.append(linkBtn);

    const infoNumbersBlock = createHTMLElement('div', ['div-info-numbers-block']);
    this.node.append(infoNumbersBlock);

    const divider = createHTMLElement('div', ['div-info-divider']);
    const divider2 = createHTMLElement('div', ['div-info-divider', 'div-info-divider-2']);

    BANNERINFO.infoNumbers.forEach((infoNumber: InfoNumbers, index: number) => {
      if (index % 2 !== 0) infoNumbersBlock.append(divider);

      const infoElement = createHTMLElement('div', ['div-info-element']);
      infoNumbersBlock.append(infoElement);

      const numTitle = createHTMLElement('span', ['div-info-num']);
      numTitle.textContent = infoNumber.number;
      infoElement.append(numTitle);

      const numDescription = createHTMLElement('span', ['div-info-description']);
      numDescription.textContent = infoNumber.description;
      infoElement.append(numDescription);

      if (index % 2 !== 0) infoNumbersBlock.append(divider2);
    })
  }

  render() {
    return this.node;
  }
}
