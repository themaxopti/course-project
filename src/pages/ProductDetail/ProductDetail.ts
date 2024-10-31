import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { ProductDetail } from "../../components/product-detail/ProductDetail";
import {
  getProduct,
} from "../../state/reducers/productReducer/productReducer";
import { store } from "../../state/store";

export class ProductDetailPage {
  element: HTMLDivElement | null = null;
  children: [Header, ProductDetail, Footer];

  constructor(productId: string) {
    this.children = [
      new Header(),
      new ProductDetail(),
      new Footer(),
    ];

    store.dispatch(getProduct(productId));
  }

  destroy() {
    this.children.forEach(child => {
      if (child instanceof ProductDetail) {
        child.unsubscribe();
      }
    })
    if (this.element) {
      this.element.remove()
      this.element = null;
    }
  }

  render() {
    this.element = document.createElement('div');

    this.children.forEach((child) => {
      this.element.appendChild(child.render());
    });

    return this.element;
  }
}
