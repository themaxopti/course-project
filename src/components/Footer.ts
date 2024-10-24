import { createDiv } from "../helpers/createHtmlTags";

const styledFooter = `
      <div class="container">
          <div class="footer__black-box">
              <div class="footer__black-box__title">STAY UPTO DATE ABOUT <br> OUR LATEST OFFERS</div>
              <div class="footer__black-box__form">
                <div>
                  <img src="/src/assets/footer/cover.svg" alt="">
                  <input placeholder="Enter your email address" type="text">
                </div>
                <div>Subscribe to Newsletter</div>
              </div>
          </div>
          <div class="footer__content">
            <div class="footer__content__main">
              <div class="logo-text">SHOP.CO</div>
              <p>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
              <div class="footer__socials">
                <img src="/src/assets/footer/twitter.svg" alt="">
                <img src="/src/assets/footer/facebook.svg" alt="">
                <img src="/src/assets/footer/instagram.svg" alt="">
                <img src="/src/assets/footer/github.svg" alt="">
              </div>
            </div>
            <div class="footer__content__block">
              <div class="title">Company</div>
              <div class="links">
                <p>About</p>
                <p>Features</p>
                <p>Works</p>
                <p>Career</p>
              </div>
            </div>
            <div class="footer__content__block">
              <div class="title">Help</div>
              <div class="links">
                <p>Customer Support</p>
                <p>Delivery Details</p>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
              </div>
            </div>
            <div class="footer__content__block">
              <div class="title">FAQ</div>
              <div class="links">
                <p>Account</p>
                <p>Manage Deliveries</p>
                <p>Orders</p>
                <p>Payments</p>
              </div>
            </div>
            <div class="footer__content__block">
              <div class="title">Resources</div>
              <div class="links">
                <p>Free eBooks</p>
                <p>Development Tutorial</p>
                <p>How to - Blog</p>
                <p>Youtube Playlist</p>
              </div>
            </div>
          </div>
          <div class="footer__pay">
            <div class="footer__pay__desc">Shop.co © 2000-2023, All Rights Reserved</div>
            <div>
              <img src="/src/assets/footer/visa.svg" alt="">
              <img src="/src/assets/footer/mastercard.svg" alt="">
              <img src="/src/assets/footer/paypal.svg" alt="">
              <img src="/src/assets/footer/applepay.svg" alt="">
              <img src="/src/assets/footer/googlepay.svg" alt="">
            </div>
          </div>
      </div>
`;

export class Footer {
  element: DocumentFragment | null = null;

  constructor() {}

  render() {
    this.element = document.createDocumentFragment();
    const footer = createDiv(styledFooter, "wrapper footer");
    
    this.element.appendChild(footer);
    return this.element;
  }
}
