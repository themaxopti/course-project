import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { createContainer } from "../../helpers/createHtmlTags";

export class OrderConfirmation {
  element: HTMLDivElement | null = null;
  children: [Header,Navigation,Footer];

  constructor() {
  }

  render() {
    this.element = createContainer(`
            <div class="order-confirmation__title">Order Confirmation</div>
            <div class="confirm-message">Success! Your order has been confirmed. Please check out your email address to track delivery progress</div>
        `,['order-confirmation']);

    return this.element;
  }
}
