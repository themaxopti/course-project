import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { OrderConfirmation } from "../../components/order-confirmation/order-confirmation";
import { ProductDetail } from "../../components/product-detail/ProductDetail";
import {
  getProduct,
} from "../../state/reducers/productReducer/productReducer";
import { store } from "../../state/store";

export class ProductDetailPage {
  element: HTMLDivElement | null = null;
  children: [Header, Navigation, OrderConfirmation, Footer];
  productDetail: ProductDetail;

  constructor(productId: string) {
    this.children = [
      new Header(),
      new ProductDetail(),
      new Footer(),
    ] as any;

    store.dispatch(getProduct(productId));
  }

  destroy() {
    this.children.forEach(child => {
      if (child.hasOwnProperty('unsubscribe')){
        // @ts-ignore
        child.unsubscribe()
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
