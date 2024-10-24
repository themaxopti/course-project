import { Header } from "../components/Header.ts";
import { Footer } from "../components/Footer.ts";

export class PageBaseClass {
  page: HTMLElement;

  constructor(
    pageContent: HTMLElement[] | DocumentFragment[]
  ) {
    this.page = document.createElement("main");
    this.page.append(...pageContent);
  }

  appendHeaderAndFooter() {
    const header = new Header();
    const footer = new Footer();
    this.page.prepend(header.render());
    this.page.append(footer.render());
  }

  render() {
    this.appendHeaderAndFooter();
    return this.page;
  }
}
