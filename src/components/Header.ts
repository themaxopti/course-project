import { createDiv } from "../helpers/createHtmlTags";

const styledHeader = `
    <div class="wrapper discount-header">
      <div class="container">
        <div class="discount-header__text">Sign up and get 20% off to your first order. <span> Sign Up Now </span>
        </div>
        <div class="discount-header__cross"><img src="./src/assets/Vector.svg" alt=""></div>
      </div>
    </div>
    <header class="wrapper header">
      <div class="container">
        <div class="header__logo">
          <img class="header__burger" src="./src/assets/header/burger.svg" alt="">
          <div class="logo-text">SHOP.CO</div>
        </div>
        <div class="header__icons">
          <img src="./src/assets/header/basket.svg" alt="">
          <img src="./src/assets/header/profile.svg" alt="">
        </div>
      </div>
    </header>
`;

export class Header {
  element: HTMLDivElement | null = null;

  render() {
    return createDiv(styledHeader);
  }
}
