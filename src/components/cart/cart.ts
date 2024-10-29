import { createContainer } from "../../helpers/createHtmlTags";
import { router } from "../../router/router";
import {
  cartProductsSelector,
  deleteProductAction,
  discountProcentSelector,
  discountValueSelector,
  subTotalSelector,
  totalSelector,
} from "../../state/reducers/cartReducer/cartReducer";
import { store } from "../../state/store";
import { OrderSummary } from "../checkout/order-summary";

const checkoutButton = {
  buttonText: "Go to checkout",
  buttonAction: (e) => {
    e.preventDefault();
    const form = document.querySelector("#payment-form") as HTMLFormElement;
    router.navigate("/checkout");
    form.requestSubmit();
  },
};

export class Cart {
  element: HTMLDivElement | null = null;

  constructor() {
    store.subscribe(() => {
      this.render();
    });
  }

  render() {
    const cart = createContainer(
      `
      <h1>Your cart</h1>
      <div class="cart__container">
            <div class="cart__products">
            ${cartProductsSelector()
              .map((product) => {
                return `
               <div class="cart__product">
                    <div class="cart__product__image">
                        <img src="${product.images[0]}" />
                    </div>
                    <div class="cart__product__info">
                        <div>${product.title}</div>
                        <div class="cart__product__price">
                            <div>$${product.price}</div>
                            ${product.discountPercentage !== 0 && `<span class="span-product-discount">-${product.discountPercentage.toFixed(0)}%</span>`} 
                            <span data-id="${product.id}" class="span-product-discount delete">delete</span>
                        </div>
                    </div>
                </div>
              `;
              })
              .join(" ")}
            </div>
        </div>
          `,
      ["cart"]
    );

    cart
      .querySelectorAll("[data-id]")
      .forEach((deleteButton: HTMLSpanElement) => {
        deleteButton.addEventListener("click", () => {
          store.dispatch(deleteProductAction({ id: deleteButton.dataset.id }));
        });
      });

    const orderSummary = new OrderSummary(checkoutButton).render();
    const div = document.createElement("div");
    div.append(orderSummary);

    cart.querySelector(".cart__container").appendChild(div);

    if (this.element) {
      this.element.replaceWith(cart);
    }
    this.element = cart;

    return this.element;
  }
}