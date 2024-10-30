import { PageBaseClass } from "../PageBaseClass.ts";
import { Form } from "../../components/login/form/Form.ts";
import { OrderSummary } from "../../components/checkout/order-summary.ts";
import { Navigation } from "../../components/Navigation/Navigation.ts";
import { store } from "../../state/store.ts";
import { requestHandlers } from "../../utils/requestHandlers.ts";
import { formOptions, summaryButton } from "./checkoutPage.const.ts";

export class CheckoutPage extends PageBaseClass {
  container: HTMLElement;

  constructor() {
    super([document.createElement("main")]);
    this.page.classList.add("checkout-page");
    this.page.classList.add("page-content");

    const h1 = document.createElement("h1");
    h1.textContent = "Checkout";
    h1.classList.add("container")

    this.container = document.createElement("div");
    this.container.append(new Navigation(['checkout']).render())
    this.container.append(h1);
    this.container.classList.add("checkout-page__content");
    this.page.append(this.container);

    this.prepopulateForm().then(() => {
      this.generatePageContent();
    });
  }

  async prepopulateForm() {
    let user = store.getState().user;
    if (user.userType !== 'full') {
      await requestHandlers.getUser();
      user = store.getState().user;
      if (!user.USER_LOGGED) {
        return;
      }
    }
    formOptions.fields.forEach((field) => {
      if (field.textContent === "First Name" && user.firstName) {
        field.value = user.firstName;
      } else if (field.textContent === "Last Name" && user.lastName) {
        field.value = user.lastName;
      } else if (field.textContent === "Maiden Name" && user.maidenName) {
        field.value = user.maidenName;
      } else if (field.textContent === "Email" && user.email) {
        field.value = user.email;
      } else if (field.textContent === "Phone" && user.phone) {
        field.value = user.phone;
      } else if (field.textContent === "Address" && user.address.address) {
        field.value = user.address.address;
      } else if (field.textContent === "City" && user.address.city) {
        field.value = user.address.city;
      } else if (field.textContent === "Postal Code" && user.address.postalCode) {
        field.value = user.address.postalCode;
      }
    });
    return formOptions;
  }

  generatePageContent() {
    const block = document.createElement("div");
    block.classList.add("checkout-page__block");
    block.classList.add("container");

    const form = new Form(formOptions).render()
    form.id = "checkout-form";
    form.classList.add("checkout-form");
    block.append(form);

    const orderSummary = new OrderSummary(summaryButton).render();
    orderSummary.classList.add("checkout-order-summary");
    block.append(orderSummary);

    this.container.append(block);
  }
}
