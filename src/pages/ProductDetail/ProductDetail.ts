import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { OrderConfirmation } from "../../components/order-confirmation/order-confirmation";
import { ProductDetail } from "../../components/product-detail/ProductDetail";
import { createDiv } from "../../helpers/createHtmlTags";
import { router } from "../../router/router";
import {
  getProduct,
  isProductLoadingSelector,
} from "../../state/reducers/productReducer/productReducer";
import { store } from "../../state/store";
import { createHTMLElement } from "../../utils/create-html-element";

export class ProductDetailPage {
  element: DocumentFragment | null = null;
  children: [Header, Navigation, OrderConfirmation, Footer];

  constructor(productId: string) {
    this.children = [
      new Header(),
      // new Navigation(['hi','hi']),
      new ProductDetail(),
      new Footer(),
    ] as any;

    store.dispatch(getProduct(productId));
    // store.subscribe(() => {
    //   if (isProductLoadingSelector() === false) {

    //   }
    // });
  }

  render() {
    this.element = document.createDocumentFragment();

    this.children.forEach((child) => {
      this.element.appendChild(child.render());
    });

    return this.element;
  }
}
