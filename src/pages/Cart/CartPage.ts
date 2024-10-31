import { Cart } from "../../components/cart/cart";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Navigation } from "../../components/Navigation/Navigation";

export class CartPage {
  element: DocumentFragment | null = null;
  children: [Header, Navigation, Cart, Footer];

  constructor() {
    this.children = [
      new Header(),
      new Navigation(["cart"]),
      new Cart(),
      new Footer(),
    ];
  }

  render() {
    this.element = document.createDocumentFragment();

    this.children.forEach((child) => {
      this.element.appendChild(child.render());
    });

    return this.element;
  }
}
