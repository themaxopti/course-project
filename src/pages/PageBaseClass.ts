import { Header } from "../components/Header.ts";
import { Footer } from "../components/Footer.ts";

export class PageBaseClass {
  page: HTMLElement;

  constructor(
    page: HTMLElement
  ) {
    this.page = page;
  }

  appendHeaderAndFooter() {
    const header = new Header();
    const footer = new Footer();
    this.page.prepend(header.render());
    this.page.append(footer.render());
  }
}
