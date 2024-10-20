import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TestPage } from "./TestPage";



export class MainPage {
  element: DocumentFragment | null = null;
  children: [Header,TestPage,Footer];

  constructor() {
    this.children = [new Header(),new TestPage(),new Footer()];
  }

  render() {
    this.element = document.createDocumentFragment()

    this.children.forEach((child) => {
      this.element!.appendChild(child.render());
    });

    return this.element;
  }
}
