import { createDiv } from "../helpers/createHtmlTags";
import { router } from "../router/router.ts";
import {
  isDiscountHeaderExist,
  setIsDiscountHeaderExist,
} from "../state/reducers/componentsProperties/componentsProperties.ts";
import { store } from "../state/store.ts";
import basketSvg from '../assets/header/basket.svg'
import burgerSvg from '../assets/header/basket.svg'
import profileSvg from '../assets/header/profile.svg'
import crossSvg from '../assets/Vector.svg'


export class Header {
  element: HTMLDivElement | null = null;

  constructor() {
    store.subscribe(() => {
      if (!isDiscountHeaderExist()) {
        const discountHeader: HTMLDivElement =
          document.querySelector(".discount-header");
        if (discountHeader) {
          discountHeader.style.display = "none";
        }
      }
    })
  }

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
              <div class="discount-header__cross"><img src="${crossSvg}" alt=""></div>
            </div>
          </div>
        `
           : ""
       }
        <header class="wrapper header">
          <div class="container">
            <div class="header__logo">
              <img class="header__burger" src="${burgerSvg}" alt="">
              <div class="logo-text">SHOP.CO</div>
            </div>
            <div class="header__icons">
              <img class="header__icons__cart" src="${basketSvg}" alt="">
              <img class="header__icons__profile" src="${profileSvg}" alt="">
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
