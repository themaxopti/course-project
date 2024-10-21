import { BrandsLine } from "../components/brands-line/brands-line";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MainBanner } from "../components/main-banner/main-banner";
import { MainCategories } from "../components/main-categories/main-categories";
import { createHTMLElement } from "../utils/create-html-element";

export class MainPage {
  private readonly page: HTMLElement;

  element: HTMLElement | null = null;

  constructor() {
    this.page = createHTMLElement('main', ['main-page']);
    this.page.append(new Header().render());
    this.page.append(new MainBanner().render());
    this.page.append(new BrandsLine().render());
    this.page.append(new MainCategories().render());
    this.page.append(new Footer().render());
  }

  render() {
    return this.page; 
  }
}