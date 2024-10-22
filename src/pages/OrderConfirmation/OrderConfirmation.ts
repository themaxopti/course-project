import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { OrderConfirmation } from "../../components/order-confirmation/order-confirmation";
import { createDiv } from "../../helpers/createHtmlTags";
import { router } from "../../router/router";
import { createHTMLElement } from "../../utils/create-html-element";

export class OrderConfirmationPage {
  element: DocumentFragment | null = null;
  children: [Header, Navigation, OrderConfirmation, Footer];

  constructor() {
    this.children = [
      new Header(),
      new Navigation(),
      new OrderConfirmation(),
      new Footer(),
    ] as any;

    setTimeout(() => {
      router.navigate('/')
    },5000)
  }

  render() {
    this.element = document.createDocumentFragment();

    this.children.forEach((child) => {
      this.element.appendChild(child.render());
    });

    return this.element;
  }
}
