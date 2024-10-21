import { createHTMLElement } from "../../utils/create-html-element";
import ImgBannerDesktop from '../../assets/banner-desktop1.png';
import { CtaBanner } from "./cta-banner/cta-banner";

export class MainBanner {
  private readonly node: HTMLElement;

  constructor() {
    this.node = createHTMLElement('div', ['div-banner-all']);
    const bannerContainer = createHTMLElement('div', ['div-banner-container']);

    bannerContainer.append(new CtaBanner().render());

    const imgBanner = createHTMLElement('img', ['img-banner']);
    imgBanner.setAttribute('src', `${ImgBannerDesktop}`);
    bannerContainer.append(imgBanner);

    this.node.append(bannerContainer);
  }

  render() {
    return this.node;
  }
}