import { createDiv } from "../helpers/createHtmlTags";
import { router } from "../router/router.ts";
import {
  isDiscountHeaderExist,
  setIsDiscountHeaderExist,
} from "../state/reducers/componentsProperties/componentsProperties.ts";
import { store } from "../state/store.ts";

export class Header {
  element: HTMLDivElement | null = null;

  render() {
    const header = createDiv(
      `
       ${
         isDiscountHeaderExist()
           ? `
          <div class="wrapper discount-header">
            <div class="container">
              <div class="discount-header__text">Sign up and get 20% off to your first order. <span class="discount-header__signUp"> Sign Up Now </span>
              </div>
              <div class="discount-header__cross"><img src="/src/assets/Vector.svg" alt=""></div>
            </div>
          </div>
        `
           : ""
       }
        <header class="wrapper header">
          <div class="container">
            <div class="header__logo">
              <img class="header__burger" src="/src/assets/header/burger.svg" alt="">
              <div class="logo-text">SHOP.CO</div>
            </div>
            <div class="header__icons">
              <img class="header__icons__cart" src="/src/assets/header/basket.svg" alt="">
              <img class="header__icons__profile" src="/src/assets/header/profile.svg" alt="">
            </div>
          </div>
        </header>
    `,
      "app-header"
    );
    header.querySelector(".logo-text").addEventListener("click", () => {
      router.navigate("/");
    });
    header
      .querySelector(".header__icons__cart")
      .addEventListener("click", () => {
        router.navigate("/cart/1");
      });
    header
      .querySelector(".header__icons__profile")
      .addEventListener("click", () => {
        router.navigate("/sign-in");
      });

    if (header.querySelector(".discount-header__cross")) {
      header
        .querySelector(".discount-header__signUp")
        .addEventListener("click", () => {
          router.navigate("/sign-in");
        });
      header
        .querySelector(".discount-header__cross")
        .addEventListener("click", () => {
          store.dispatch(setIsDiscountHeaderExist(false));
          const discountHeader: HTMLDivElement =
            document.querySelector(".discount-header");
          discountHeader.style.display = "none";
        });
    }

    return header;
  }
}
