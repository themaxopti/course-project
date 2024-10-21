import { BrandsLine } from "../components/brands-line/brands-line";
import { MainBanner } from "../components/main-banner/main-banner";
import { createHTMLElement } from "../utils/create-html-element";



export class MainPage {
  private readonly page: HTMLElement;

  constructor() {
    this.page = createHTMLElement('main', ['main-page']);
    this.page.append(new MainBanner().render());
    this.page.append(new BrandsLine().render());
  }

  render() {
    return this.page; 
  }
}
