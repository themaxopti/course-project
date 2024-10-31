import { PageBaseClass } from "../PageBaseClass.ts";
import { Form } from "../../components/login/form/Form.ts";
import { Navigation } from "../../components/Navigation/Navigation.ts";
import { OrderSummary } from "../../components/checkout/order-summary.ts";
import { requestHandlers } from "../../utils/requestHandlers.ts";
import { store } from "../../state/store.ts";
import { formOptions, summaryButton } from "./paymentPage.const.ts";

export class PaymentPage extends PageBaseClass {
  container: HTMLElement;

  constructor() {
    super([document.createElement("main")]);
    this.page.classList.add("payment-page");
    this.page.classList.add("page-content");

    const h1 = document.createElement("h1");
    h1.textContent = "Payment";
    h1.classList.add("container");

    this.container = document.createElement("div");
    this.container.append(new Navigation().render());
    this.container.append(h1);
    this.container.classList.add("payment-page__content");
    this.page.append(this.container);

    this.prepopulateForm().then(() => {
      this.generatePageContent();
    });
  }

  async prepopulateForm() {
    let user = store.getState().user;
    if (user.userType !== "full") {
      await requestHandlers.getUser();
      user = store.getState().user;
      if (!user.USER_LOGGED) {
        return;
      }
    }
    formOptions.fields.forEach((field) => {
      if (field.textContent === "Card Number") {
        field.value = user.bank.cardNumber;
      } else if (field.textContent === "Card Expire") {
        field.value = user.bank.cardExpire;
      } else if (field.textContent === "IBAN") {
        field.value = user.bank.iban;
      }
    });
    return formOptions;
  }

  generatePageContent() {
    const block = document.createElement("div");
    block.classList.add("payment-page__block");
    block.classList.add("container");

    const form = new Form(formOptions).render();
    form.id = "payment-form";
    form.classList.add("payment-form");
    block.append(form);

    const orderSummary = new OrderSummary(summaryButton).render();
    orderSummary.classList.add("payment-order-summary");
    block.append(orderSummary);

    this.container.append(block);
  }
}
