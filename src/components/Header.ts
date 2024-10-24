import { createDiv } from "../helpers/createHtmlTags";
import { store } from "../state/store.ts";
import basketImg from './src/assets/header/basket.svg'


const styledHeader = `
    <div class="wrapper discount-header">
      <div class="container">
        <div class="discount-header__text">Sign up and get 20% off to your first order. <span> Sign Up Now </span>
        </div>
        <div class="discount-header__cross"><img src="/src/assets/Vector.svg" alt=""></div>
      </div>
    </div>
    <header class="wrapper header">
      <div class="container">
        <div class="header__logo">
          <img class="header__burger" src="/src/assets/header/burger.svg" alt="">
          <div class="logo-text">SHOP.CO</div>
        </div>
        <div class="header__icons">
          <img src="/src/assets/header/basket.svg" alt="">
          <img src="/src/assets/header/profile.svg" alt="">
        </div>
      </div>
    </header>
`;

export class Header {
  element: HTMLDivElement | null = null;

  constructor() {
    this.userChanged();
    store.subscribe(() => {
      this.userChanged();
    });
  }

  userChanged() {
    const state = store.getState().user;
    console.log("user:", state || "no user");
  }

  render() {
    return createDiv(styledHeader);
  }
}
