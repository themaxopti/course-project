import { Navigation } from "../../components/Navigation/Navigation";
import { OrderConfirmation } from "../../components/order-confirmation/order-confirmation";
import { router } from "../../router/router";
import { PageBaseClass } from "../PageBaseClass.ts";

export class OrderConfirmationPage extends PageBaseClass {
  children: [Navigation, OrderConfirmation];
  timeout: ReturnType<typeof setTimeout>;

  destroy() {
    clearTimeout(this.timeout);
  }

  constructor() {
    super([document.createDocumentFragment()]);
    this.children = [
      new Navigation(["order-confirmation"]),
      new OrderConfirmation(),
    ];

    this.timeout = setTimeout(() => {
      router.navigate("/");
    }, 5000);

    this.children.forEach((child) => {
      this.page.appendChild(child.render());
    });
  }
}
