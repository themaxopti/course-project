import { store } from "../../state/store.ts";
// @ts-ignore
import ButtonArrow from "../../assets/payment/button-arrow.svg";
import { discountPercentSelector, discountValueSelector, subTotalSelector, totalSelector } from "../../state/reducers/cartReducer/cartReducer.ts";

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
    this.generateOrderSummary(button);
  }

  render() {
    return this.container;
  }

  generateOrderSummary(button: SummaryButton) {
    this.container.innerHTML = `
      <h2>Order Summary</h2>
      <div class="order-summary__line">
        <span class="text--grey">Subtotal</span><span class="text--bold">$${subTotalSelector()}</span>
      </div>
      <div class="order-summary__line divider">
        <span class="text--grey">Discount (-${discountPercentSelector()}%)</span><span class="text--bold text--red">-$${discountValueSelector()}</span>
      </div>
      <div class="order-summary__line">
        <span>Total</span><span class="text--bold text--big">$${totalSelector()}</span>
      </div>
      <button class="order-summary__checkout-button" id="summary-button">
        ${button.buttonText}
        <img src=${ButtonArrow} alt="Arrow"/>
      </button>
    `;
    this.container.querySelector("#summary-button")?.addEventListener("click", button.buttonAction);
  }
}
