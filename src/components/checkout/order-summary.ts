import { store } from "../../state/store.ts";
// @ts-ignore
import ButtonArrow from "../../assets/payment/button-arrow.svg";

interface SummaryButton {
  buttonText: string;
  buttonAction: (e?: Event) => void;
}

export class OrderSummary {
  readonly container: HTMLElement;

  constructor(button: SummaryButton) {
    this.container = document.createElement("div");
    this.container.classList.add("order-summary__container");

    this.orderSummaryChanged(button);
    store.subscribe(() => {
      this.orderSummaryChanged(button);
    });
  }

  orderSummaryChanged(button: SummaryButton) {
    const state = store.getState().orderSummary;
    this.generateOrderSummary(state.subtotal, state.isDiscount, button);
  }

  render() {
    return this.container;
  }

  generateOrderSummary(subtotal: number, discount: boolean, button: SummaryButton) {
    const d = +discount;
    this.container.innerHTML = `
      <h2>Order Summary</h2>
      <div class="order-summary__line">
        <span class="text--grey">Subtotal</span><span class="text--bold">$${subtotal}</span>
      </div>
      <div class="order-summary__line divider">
        <span class="text--grey">Discount (-20%)</span><span class="text--bold text--red">-$${subtotal * 0.2}</span>
      </div>
      <div class="order-summary__line">
        <span>Total</span><span class="text--bold text--big">$${subtotal - subtotal * d * 0.2}</span>
      </div>
      <button class="order-summary__checkout-button" id="summary-button">
        ${button.buttonText}
        <img src=${ButtonArrow} alt="Arrow"/>
      </button>
    `;
    this.container.querySelector("#summary-button")?.addEventListener("click", button.buttonAction);
  }
}
